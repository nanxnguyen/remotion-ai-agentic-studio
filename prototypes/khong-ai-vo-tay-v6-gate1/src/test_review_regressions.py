import unittest
from rig_v6 import run, helping, boxing, RUN_PERIOD, dist

class VisualActingV61Tests(unittest.TestCase):
    def test_running_arm_counter_swing_alternates_with_support_foot(self):
        # At equal fractional strides, the lead arm must swap every step.
        first = run(.25*RUN_PERIOD)
        second = run(1.25*RUN_PERIOD)
        first_delta = first.hands[1][0] - first.shoulder[0]
        second_delta = second.hands[1][0] - second.shoulder[0]
        self.assertLess(first_delta * second_delta, 0, (first_delta, second_delta))

    def test_character_emotion_changes_when_child_reacts(self):
        before_adult,before_child = helping(.12)
        after_adult,after_child = helping(2.95)
        self.assertNotEqual(before_adult.expression, after_adult.expression)
        self.assertNotEqual(before_child.expression, after_child.expression)

    def test_punch_elbow_does_not_teleport_across_a_frame(self):
        coords = [boxing(i/30,origin=930).elbows[1] for i in range(118)]
        jumps = [dist(a,b) for a,b in zip(coords,coords[1:])]
        self.assertLess(max(jumps),42, f'max elbow jump={max(jumps):.1f}px / frame')

if __name__=='__main__':unittest.main()
