# Vídeo del hero (`hero.mp4`)

El hero reproduce `public/hero.mp4` **avanzado por el scroll** (scrubbing). Para que
sea **fluido**, el vídeo debe estar codificado con **un keyframe en cada frame**
(GOP = 1); si no, el navegador hace seeks caros entre keyframes y se ve a tirones.

## Codifica tu vídeo así (frame-accurate, fluido)

Con ffmpeg:

```bash
ffmpeg -y -i tu-video.mov -an \
  -vf "scale=960:-2,fps=24" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -g 1 -keyint_min 1 -x264-params "keyint=1:scenecut=0" \
  -crf 27 -movflags +faststart \
  public/hero.mp4
```

- `-g 1 -keyint_min 1 -x264-params keyint=1` → **todos los frames son keyframe** (clave para el scrubbing).
- `-an` → sin audio (no hace falta).
- `scale=960` / `fps=24` / `crf 27` → equilibrio nitidez ↔ peso. Sube a `scale=1280`
  o baja el `crf` (p. ej. 23) si quieres más calidad (pesará más).
- `+faststart` → empieza a cargar antes.

## Recomendaciones de contenido
- Clip corto (**~6–10 s**), **movimiento continuo** (queda mejor scrubbeado).
- Horizontal, que la acción no quede solo en el lado izquierdo (ahí va el texto).
- Ideal: València / costa / turismo, para reforzar la marca.

## Poster
`public/hero-poster.jpg` se muestra antes de que cargue el vídeo y como respaldo.
Si quieres, exporta el **primer frame** de tu vídeo como `hero-poster.jpg` para que
la transición poster → vídeo sea invisible.
