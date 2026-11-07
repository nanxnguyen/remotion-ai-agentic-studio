import unittest,math
from rig_v5 import run,pushup,boxing,bag_shift,punch_reach,helping,RUN_PERIOD,dist,ik
class RigV5Tests(unittest.TestCase):
 def test_run_world_contact_anchor(self):
  for k in range(5):
   u=[run(RUN_PERIOD*(k+f)) for f in [.04,.2,.4,.65]]
   side=k%2
   xs=[p.feet[side][0] for p in u]
   self.assertLess(max(xs)-min(xs),.0001)
 def test_run_flight_and_clearance(self):
  ps=[run(RUN_PERIOD*v) for v in [.21,.49,.82]]
  self.assertLess(ps[0].feet[1][1],858)
  self.assertLess(ps[1].feet[1][1],858)
 def test_joint_coordinates_finite(self):
  for i in range(300):
   t=i/30
   for pose in (run(t),pushup(t),boxing(t)):
    for p in [pose.head,pose.shoulder,pose.hip,*pose.hands,*pose.feet,*pose.knees,*pose.elbows]:
     self.assertTrue(all(map(math.isfinite,p)))
 def test_pushup_contact_and_plank(self):
  original=pushup(0)
  for t in [0,.3,1,1.8,2.4,3.9]:
   p=pushup(t)
   self.assertEqual(p.hands,original.hands)
   self.assertEqual(p.feet,original.feet)
   self.assertLess(abs(p.knees[0][1]-(p.hip[1]+p.feet[0][1])/2),15)
 def test_boxing_front_face_impact(self):
  p=boxing(.64)
  self.assertAlmostEqual(p.hands[1][0],1175,delta=1)
  self.assertAlmostEqual(bag_shift(.64),0)
  self.assertNotEqual(bag_shift(.75),0)
 def test_boxing_no_fist_penetration(self):
  for i in range(300):
   t=i/30
   self.assertLessEqual(boxing(t).hands[1][0],1175+1)
 def test_help_target_hand_attach(self):
  a,b=helping(3)
  self.assertAlmostEqual(dist(a.hands[1],b.hands[0]),0,delta=.001)
 def test_ik_exact_segments(self):
  joint,end=ik((0,0),(85,105),90,90,-1)
  self.assertAlmostEqual(dist((0,0),joint),90,places=3)
  self.assertAlmostEqual(dist(joint,end),90,places=3)
  self.assertAlmostEqual(dist(end,(85,105)),0,places=3)
if __name__=='__main__':unittest.main(verbosity=2)
