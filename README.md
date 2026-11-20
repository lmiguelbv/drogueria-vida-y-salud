# Droguería Vida y Salud SAS — Sitio Web Informativo (Trabajo de Grado)

Sitio web estático (`HTML + CSS + JS`, sin proceso de compilación ni dependencias externas en ejecución) para **Droguería Vida y Salud SAS**, farmacia de barrio ubicada en **Calle 17 Sur, barrio Restrepo, Bogotá D.C., Colombia**.

- **Sitio en vivo (GitHub Pages):** https://lmiguelbv.github.io/drogueria-vida-y-salud/
- **Repositorio público:** https://github.com/lmiguelbv/drogueria-vida-y-salud

## Estructura del proyecto

- `index.html`: página principal de 6 pantallas (`Inicio`, `Nosotros`, `Servicios`, `Inyectología`, `Calidad`, `Contacto`), idioma `es-CO`, contraste WCAG AA y metaetiquetas Open Graph / Twitter.
- `privacidad.html`: aviso y política de tratamiento de datos personales conforme a la **Ley 1581 de 2012** (Habeas Data).
- `creditos.html`: atribuciones y licencias de las fotografías temporales usadas en el sitio.
- `data/indicadores.json`: fuente JSON con los **7 indicadores de calidad del servicio** (valor actual, meta y nota).
- `js/indicadores.js`: módulo JavaScript que carga y renderiza `data/indicadores.json` mediante nodos DOM seguros (`textContent`) y activa el indicador de sección actual en la barra de navegación (`aria-current="location"`).
- `qr.svg` y `qr.png`: código QR escaneable (corrección de errores `M`, margen `4`, negro `#111111` sobre blanco `#ffffff`) que apunta directamente a https://lmiguelbv.github.io/drogueria-vida-y-salud/.
- `share.jpg`: imagen Open Graph (`1200×630`) generada desde la pantalla inicial.
- `favicon.png`, `assets/logo.png`, `assets/logo-mark.png`, `assets/logo.jpeg`: logotipo e isotipo adaptados desde el emblema original del establecimiento.
- `assets/img/`: versiones WebP optimizadas con `srcset` responsivo (`500w`, `960w`, `1280w`, `1920w` y recorte móvil `780×975`).
- `assets/*.css`, `assets/*.js`, `assets/ui/`, `assets/motion/`, `assets/layout/`, `assets/moments/`: sistema visual base intacto (`system`, `cards`, `motion`, `layout`, `picture-develops`).

## Actualización de los 7 indicadores de calidad

Edita directamente el arreglo `indicadores` en [`data/indicadores.json`](data/indicadores.json). Cada elemento admite:

- `nombre`: nombre del indicador mostrado en la lista.
- `meta`: criterio objetivo (por ejemplo `≥ 95 %`, `≤ 10 min`, `0`).
- `valor`: resultado actual medido en el punto de venta.
- `nota`: descripción o aclaración interna.

El script [`js/indicadores.js`](js/indicadores.js) inserta espacios de no separación (`\u00A0`) antes de `%` y `min` para evitar saltos huérfanos en pantallas estrechas. El HTML estático de respaldo dentro de `#indicadores-list` permite lectura inmediata incluso antes de hidratar o sin JavaScript.

## Reemplazo de material temporal por activos definitivos del cliente

Antes de pasar a uso comercial definitivo con el cliente, actualiza los siguientes elementos provisionales:

1. **Fotografía principal del establecimiento (`assets/foto-drogueria.jpg`):**
   - Actualmente el archivo `assets/foto-drogueria.jpg` no existía en el proyecto; la sección inicial utiliza la fotografía temporal de Wikimedia Commons `photo-f79966238` (CC0).
   - Para reemplazarla, guarda la foto real del establecimiento en `assets/foto-drogueria.jpg` (junto con sus variantes WebP apaisada `1920w` para escritorio y `780×975` para móvil) y actualiza el `<picture class="hero__bg">` en `index.html`, eliminando `data-source="stand-in"` y `data-subject="stand-in"`.
2. **Otras fotografías temporales (`assets/img/`):**
   - Las secciones `Nosotros` (`f113421584`), `Servicios` (`f92559627`, `f134681297`, `f10621409`, `f12038229`), `Inyectología` (`f147415189`) y `Calidad` (`f44635227`, `f129245105`) usan imágenes verificadas de Wikimedia Commons debidamente acreditadas en `creditos.html`. Pueden sustituirse por fotografías propias de la droguería conservando proporciones equivalentes.
3. **Canales de contacto y mapa de ubicación (`index.html` y `privacidad.html`):**
   - Reemplaza los enlaces provisionales `https://wa.me/573000000000` y `mailto:contacto@drogueriavidaysalud.example` por el número de WhatsApp real y el correo corporativo oficial.
   - En `#contacto`, actualiza el parámetro `query=` del enlace a Google Maps y el parámetro `q=` del `<iframe>` embebido cuando cuentes con la nomenclatura exacta del establecimiento.
4. **Identidad y horarios de atención (`index.html`):**
   - Revisa o ajusta los textos de Misión, Visión y Valores en la sección `#nosotros`.
   - El bloque `<dl class="hours" data-tz="America/Bogota" data-assumed>` contiene un horario referencial de barrio (`Lunes a sábado 8:00 a 20:00`, `Domingos y festivos 9:00 a 14:00`). Confírmalos con la droguería y retira el atributo `data-assumed` cuando queden validados.

## Regeneración de códigos QR (`qr.svg` y `qr.png`)

Si la URL final cambia, regenera ambos archivos con corrección de errores `M` y verifica su lectura programática mediante `jsqr` + `pngjs` (por ejemplo usando Node y `qrcode`):

```js
import QRCode from 'qrcode';
const url = 'https://lmiguelbv.github.io/drogueria-vida-y-salud/';
await QRCode.toFile('qr.png', url, { width: 1024, margin: 4, errorCorrectionLevel: 'M', color: { dark: '#111111', light: '#ffffff' } });
```

## Alcance normativo e informativo

- El sitio tiene carácter **estrictamente informativo y educativo**.
- No realiza venta en línea, comercio electrónico de medicamentos de prescripción ni pauta publicitaria de fármacos.
- Referencias visibles de gestión y cumplimiento en Colombia: **Decreto 780 de 2016**, **Resolución 1403 de 2007**, **INVIMA** y **Ley 1581 de 2012**.
- Aviso obligatorio visible en Inyectología: **La aplicación de inyectables requiere fórmula médica.**
