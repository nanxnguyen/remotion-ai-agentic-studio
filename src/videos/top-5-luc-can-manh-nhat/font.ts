import {continueRender, delayRender, staticFile} from 'remotion';

export const MONTSERRAT_FONT = '"Montserrat", system-ui, -apple-system, sans-serif';

let loaded = false;

export function ensureMontserratLoaded(): void {
  if (loaded || typeof window === 'undefined' || typeof FontFace === 'undefined') {
    return;
  }
  loaded = true;
  const handle = delayRender('Loading Montserrat variable font');
  const face = new FontFace('Montserrat', `url(${staticFile('fonts/Montserrat-Variable.ttf')})`, {
    weight: '100 900',
    style: 'normal',
  });
  face
    .load()
    .then((loadedFace) => {
      document.fonts.add(loadedFace);
      continueRender(handle);
    })
    .catch(() => {
      continueRender(handle);
    });
}
