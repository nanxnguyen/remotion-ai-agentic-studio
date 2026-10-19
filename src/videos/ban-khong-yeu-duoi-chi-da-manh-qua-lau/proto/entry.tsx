// Prototype entry (design-agent, Phase 3c). A SEPARATE Remotion entry so the style
// frames, the cover, the storyboard board and the hook motion strip render without
// touching src/Root.tsx or src/videos/registry.ts (rule C1: design owns proto/ only).
//
//   npx remotion still src/videos/ban-khong-yeu-duoi-chi-da-manh-qua-lau/proto/entry.tsx \
//     BKYD-ProtoHook out/qa/…-style-1.png --frame=84
//
// `video.ts` in this folder carries the identical manifest for the director to register
// in src/videos/registry.ts if the Studio should also see it.
import React from 'react';
import {Composition, registerRoot} from 'remotion';

import {defineVideo} from '../../../core';
import {
  BOARD_IDS,
  BoardTile,
  END_DUR,
  HOOK_DUR,
  ProtoEnd,
  ProtoHook,
  ProtoTurn,
  TURN_DUR,
} from './scenes';

export const BKYD_PROTO_W = 1080;
export const BKYD_PROTO_H = 1920;

export const ProtoRoot: React.FC = () => (
  <>
    <Composition
      id="BanKhongYeuDuoiProtoHook"
      component={ProtoHook}
      durationInFrames={HOOK_DUR}
      fps={30}
      width={BKYD_PROTO_W}
      height={BKYD_PROTO_H}
    />
    <Composition
      id="BanKhongYeuDuoiProtoTurn"
      component={ProtoTurn}
      durationInFrames={TURN_DUR}
      fps={30}
      width={BKYD_PROTO_W}
      height={BKYD_PROTO_H}
    />
    <Composition
      id="BanKhongYeuDuoiProtoEnd"
      component={ProtoEnd}
      durationInFrames={END_DUR}
      fps={30}
      width={BKYD_PROTO_W}
      height={BKYD_PROTO_H}
    />
    <Composition
      id="BanKhongYeuDuoiProtoBoard"
      component={BoardTile}
      durationInFrames={1}
      fps={30}
      width={BKYD_PROTO_W}
      height={BKYD_PROTO_H}
      defaultProps={{shot: BOARD_IDS[0]}}
    />
  </>
);

registerRoot(ProtoRoot);

/** Same component, expressed as a registry-ready manifest. See design-spec.md §9. */
export const banKhongYeuDuoiProtoVideo = defineVideo({
  id: 'BanKhongYeuDuoiProtoReel',
  // NOTE: `slug` must differ from the production video's slug — validateVideoRegistry()
  // throws on a duplicate slug. `-proto` keeps the catalog unambiguous.
  slug: 'ban-khong-yeu-duoi-chi-da-manh-qua-lau-proto',
  component: ProtoHook,
  durationInFrames: HOOK_DUR,
  fps: 30,
  width: BKYD_PROTO_W,
  height: BKYD_PROTO_H,
  testFrames: [0, Math.floor(HOOK_DUR / 2), HOOK_DUR - 1],
  tags: ['prototype', 'phase-3c'],
});
