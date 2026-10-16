// Proto-only entry (design-agent scope). Stills via:
// npx remotion still src/chung-minh-de-lam-gi/proto/index.ts <CompId> out/qa/... --frame=N
import {registerRoot} from 'remotion';
import {ProtoEntry} from './entry';

registerRoot(ProtoEntry);
