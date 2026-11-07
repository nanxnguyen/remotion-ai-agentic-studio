import unittest, math
from rig_v6 import run,pushup,boxing,helping,dist,ik,RUN_PERIOD,bag_shift,CONTACT_AT

class MotionV6Regressions(unittest.TestCase):
 def test_pushup_arm_lengths_remain_constant(self):
  for side in (0,1):
   lengths=[]
   for k in range(121):
    p=pushup(k/30)
    anchor=(p.shoulder[0]+(-23 if side==0 else 23),p.shoulder[1]+10)
    lengths.append((dist(anchor,p.elbows[side]),dist(p.elbows[side],p.hands[side])))
   for section in (0,1):
    vals=[v[section] for v in lengths]
    self.assertLess(max(vals)-min(vals),1.2,f'P0 telescoping pushup arm side {side} section {section}: {min(vals)}..{max(vals)}')
 def test_pushup_feet_and_hands_anchored(self):
  poses=[pushup(i/30) for i in range(120)]
  self.assertTrue(all(p.feet==poses[0].feet and p.hands==poses[0].hands for p in poses))
 def test_help_child_body_must_rise(self):
  a,b=helping(.10);c,d=helping(2.85)
  self.assertGreater(b.hip[1]-d.hip[1],45,'child hip stays frozen')
  self.assertGreater(b.head[1]-d.head[1],45,'child head stays frozen')
  self.assertLess(dist(c.hands[1],d.hands[0]),2,'hands detach after grip')
 def test_help_no_long_stretched_arms(self):
  for i in range(91):
   a,c=helping(i/30)
   self.assertLess(dist((a.shoulder[0]+23,a.shoulder[1]+10),a.hands[1]),248)
   self.assertLess(dist((c.shoulder[0]-20,c.shoulder[1]+7),c.hands[0]),169)
 def test_boxing_arm_reach_ergonomic(self):
  for i in range(120):
   p=boxing(i/30,origin=930,bag_front=1175)
   self.assertLess(dist((p.shoulder[0]+23,p.shoulder[1]+9),p.hands[1]),251)
 def test_punch_contacts_stationary_bag_before_hit(self):
  self.assertEqual(bag_shift(CONTACT_AT),0)
  self.assertNotEqual(bag_shift(CONTACT_AT+.16),0)
 def test_run_swing_hand_does_not_go_above_shoulders(self):
  for i in range(120):
   p=run(i/30)
   for hand in p.hands:
    self.assertGreater(hand[1]-p.shoulder[1],50)
 def test_boxer_is_not_permanently_crouched(self):
  for t in (.1,.64,1.0,1.8):
   p=boxing(t,origin=930)
   self.assertGreater(870-p.hip[1],260,'boxer permanently crouched')
 def test_child_and_adult_finish_upright(self):
  adult,child=helping(2.95)
  self.assertGreater(866-adult.hip[1],255)
  self.assertGreater(866-child.hip[1],235)
 def test_motion_points_finite(self):
  for t in [i/60 for i in range(0,240)]:
   for p in [run(t),pushup(t),boxing(t,origin=930),*helping(t)]:
    for j in [p.head,p.hip,p.shoulder,*p.hands,*p.elbows,*p.knees,*p.feet]:
     self.assertTrue(all(map(math.isfinite,j)))
if __name__=='__main__': unittest.main(verbosity=2)
