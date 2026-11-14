// A recording stand-in for CanvasRenderingContext2D: every method call is logged as [name, ...args].
export function mockCtx() {
  const log = [];
  const grad = { addColorStop() {} };
  const target = { log, globalAlpha: 1 };
  return new Proxy(target, {
    get(t, k) {
      if (k in t) return t[k];
      if (k === 'createLinearGradient' || k === 'createRadialGradient') return () => grad;
      if (k === 'measureText') return () => ({ width: 10 });
      return (...a) => { log.push([k, ...a]); };
    },
    set(t, k, v) { t[k] = v; if (k === 'globalAlpha') log.push(['alpha', v]); return true; },
  });
}
