import React, {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender, staticFile} from 'remotion';

// Load bundled Noto Sans before the first frame so Vietnamese diacritics are measured
// with the exact font used by FitText; never render with a fallback font.
export const HemChuyenLaFontLoader: React.FC = () => {
  const [handle] = useState(() => delayRender('Loading Noto Sans for Vietnamese captions'));

  useEffect(() => {
    let active = true;
    const regular = new FontFace(
      'Noto Sans',
      `url("${staticFile('fonts/NotoSans-Regular.ttf')}")`,
      {weight: '400'},
    );
    const bold = new FontFace(
      'Noto Sans',
      `url("${staticFile('fonts/NotoSans-Bold.ttf')}")`,
      {weight: '700'},
    );

    Promise.all([regular.load(), bold.load()])
      .then(async ([regularFace, boldFace]) => {
        if (!active) return;
        document.fonts.add(regularFace);
        document.fonts.add(boldFace);
        await document.fonts.ready;
        if (active) continueRender(handle);
      })
      .catch((error: unknown) => {
        if (active) cancelRender(error instanceof Error ? error : new Error(String(error)));
      });

    return () => {
      active = false;
    };
  }, [handle]);

  return null;
};
