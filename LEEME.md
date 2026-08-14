# Hotel Chibchacum — sitio web

Landing page de una sola página para el **Hotel Chibchacum** (Cra 2 N° 6-46, Zetaquira, Boyacá).

La estructura editorial está tomada del template de Figma
[*Lovisa Malin Hotel — Landing page website*](https://www.figma.com/community/file/1282705958658997288/lovisa-malin-hotel-landing-page-website)
(Dot Creative Market): hero a pantalla completa con titular serif enorme, tarjetas escalonadas,
bloques tipográficos mezclados con fotos, bandas oscuras a sangre, mosaico de galería, mapa
ilustrado y formulario de contacto con campos subrayados.

El azul profundo del original se reemplazó por la **paleta del logo**: oro degradado, marrón y negro.

---

## Cómo verlo

Abra `index.html` con doble clic. No necesita servidor ni compilación.

Si quiere servirlo en local (recomendado para probar como en producción):

```
npx serve .
```

---

## Estructura

```
hotel-chibchacum/
├── index.html          ← todo el contenido de la página
├── css/styles.css      ← estilos y paleta
├── js/main.js          ← menú móvil, animaciones, galería, formulario
└── img/
    ├── logo.png            ← logo con fondo transparente (generado del original)
    ├── logo-original.jpg   ← logo tal como lo entregó usted
    ├── favicon.png
    ├── herencia-muisca.jpg ← logo en grande para la banda «Herencia · Muisca»,
    │                          ya compuesto sobre el fondo #14100B de la banda
    ├── fachada.jpg         ← fachada del hotel (hero y tarjeta de habitaciones)
    ├── hotel-calle.jpg     ← el hotel desde la carrera 2, con la montaña (mosaico)
    ├── cascada-termal.jpg  ← cascada de los Ocho Colores
    ├── laguna.jpg          ← embalse / paisaje de Lengupá
    ├── habitacion-sencilla.jpg ← sencilla, cama doble
    ├── habitacion-doble.jpg    ← doble, dos camas separadas
    ├── habitacion-familiar.jpg ← familiar, camarote y cama doble
    ├── habitacion-vista.jpg    ← mesa junto a la ventana con vista a la montaña
    ├── casa-campo.jpg        ← casa de campo, vista aérea (fondo de la sección)
    ├── casa-campo-2.jpg      ← la casa de campo de frente (recuadro de la sección)
    ├── casa-campo-cuarto.jpg ← la alcoba
    ├── casa-campo-cocina.jpg ← cocina y comedor
    ├── casa-campo-vista.jpg  ← la vista hacia el cañón
    ├── casa-campo-lagos.jpg  ← los lagos, el puente y la zona de BBQ
    ├── cafe.jpg            ← café de la región
    └── zetaquira-plaza.jpg ← parque principal de Zetaquira
```

> Las fotos de la casa de campo salieron de `Escritorio\Fotos Campo`. Se
> redimensionaron y recomprimieron para que la página no pese de más. Para cambiar
> cualquiera basta con **sobrescribir el archivo conservando el nombre**: no hay que
> tocar el HTML.

---

## Paleta (tomada del logo con cuentagotas)

| Variable CSS  | Color     | Uso |
|---------------|-----------|-----|
| `--negro`     | `#0B0907` | fondo del hero y del footer |
| `--tinta`     | `#14100B` | bandas oscuras |
| `--marron`    | `#5A3606` | texto principal sobre crema |
| `--marron-cl` | `#7A5324` | texto secundario |
| `--oro-osc`   | `#8A5F14` | detalles, líneas, eyebrows |
| `--oro`       | `#C09A3C` | oro medio del degradado |
| `--oro-cl`    | `#EEDB7C` | oro claro / brillos |
| `--arena`     | `#C9B48C` | bloques de acento |
| `--crema`     | `#F4EEE1` | fondo de secciones claras |
| `--crema-2`   | `#EAE0CB` | fondo alterno |

Los degradados dorados (`Herencia de la tierra`, botones, `Chibchacum`) usan los tres oros en el
mismo orden que el degradado del logo.

**Tipografías:** Cormorant Garamond (títulos) + Jost (texto), ambas de Google Fonts.

---

## ⚠️ Antes de publicar — pendientes

1. **Teléfono y WhatsApp** — ✅ son dos líneas distintas. El teléfono es `310 816 9518`
   (con enlace `tel:`), en la sección de contacto y en el footer. El WhatsApp es
   `314 200 3387` (enlace a `wa.me/573142003387`), en la sección de contacto y en el
   aviso de error del formulario (`js/main.js`).
2. **Correo** — ✅ `admin@hotelchibchacum.co`. Está en la sección de contacto, en el footer y
   en `js/main.js` (variable `href` dentro del `submit` del formulario).
3. **Formulario** — ✅ **funcionando.** Activado y probado con envíos reales: las solicitudes
   llegan a `admin@hotelchibchacum.co`. Ver «Cómo funciona el formulario» más abajo.
4. **Fotos de habitaciones** — ✅ las tres tarjetas de `#habitaciones` ya usan fotos reales de
   los cuartos. Las fotos vienen algo oscuras y con grano; si consigue tomas mejor iluminadas,
   solo hay que reemplazar los archivos `img/habitacion-*.jpg` conservando los nombres.
5. **Boletín** — ✅ el formulario del footer usa el mismo envío del punto 3; los correos
   suscritos llegan al mismo buzón con el asunto «Nueva suscripción al boletín».
6. **Casa de campo** — ✅ sección `#casa-campo` con fotos reales. Capacidad de 3 a 4
   personas, casa completa por noches, a 10 minutos del pueblo. Lo demás sale de las
   fotos: cocina equipada, comedor, baño privado con ducha, zona verde, dos lagos con
   puente y zona de BBQ. Quedan por confirmar dos cosas menores: si la casa tiene
   nombre propio y si hay mínimo de noches.

---

## Cómo funciona el formulario — ✅ ACTIVO

Las solicitudes se envían con **FormSubmit** (formsubmit.co): gratis, sin clave, sin cuenta
y sin servidor propio. Ya está activado y probado con envíos reales; no hay nada que hacer.

### Qué recibe usted

Un correo con asunto *«Solicitud de reserva · [nombre del huésped]»* y una tabla con:
nombre, teléfono/WhatsApp, correo, fecha de llegada, fecha de salida, número de huéspedes
y el mensaje. Al darle **Responder**, la respuesta va directo al huésped.

Las suscripciones al boletín llegan al mismo buzón con asunto *«Nueva suscripción al boletín»*.

### Si el envío falla

El formulario no pierde los datos: muestra un aviso con un enlace para mandar la solicitud
por correo y el número de WhatsApp. El visitante siempre tiene salida.

### ⚠️ La activación es POR DOMINIO

Esto no es obvio y conviene tenerlo claro: FormSubmit no activa «el correo», activa la
combinación **correo + dominio desde el que se envía**. Cada vez que el sitio cambie de
dirección hay que activar una vez más:

| Dominio | Estado |
|---|---|
| `localhost` (pruebas locales) | ✅ activado |
| `dreinerale.github.io` (sitio publicado) | ⬅️ pendiente de un clic |
| `hotelchibchacum.co` (cuando se conecte) | pendiente, llegará otro correo |

**Cómo se resuelve siempre:** haga un envío de prueba desde el sitio; FormSubmit le manda
un correo con el botón «Activate Form» a `admin@hotelchibchacum.co`; haga clic y ya queda
para siempre en ese dominio.

**Cómo se reconoce el problema:** el formulario muestra «No pudimos enviar la solicitud».
Abra la consola del navegador (F12) y verá un mensaje explicando exactamente qué falta.

### Cambiar la dirección que recibe las solicitudes

Edite `CORREO_HOTEL` en `js/main.js` (línea 13). Cada dirección nueva necesita su propia
activación, igual que arriba.

### Notas

- El correo del hotel va escrito en el JavaScript, pero ya aparece público en la página
  (contacto y pie), así que no es una exposición nueva.
- El formulario lleva un campo-trampa invisible (`_honey`) que filtra bots automáticos.
- Para probarlo en su computador, ábralo con un servidor local (`npx serve .`) y no con doble
  clic: algunos navegadores bloquean los envíos desde archivos `file://`.

---

## Datos del hotel usados en los textos

Tomados de la página de Facebook del hotel y de fuentes públicas:

- Cra 2 N° 6-46, Zetaquira, Boyacá · se admiten mascotas avisando con anticipación
- Habitaciones sencillas y dobles con baño privado, agua caliente, parqueadero privado, internet
  y televisión por cable · 25 habitaciones · 15 años recibiendo huéspedes
- Zetaquira: provincia de Lengupá, 1.665 m s. n. m., 69 km desde Tunja por la vía a Zetaquira
- Aguas termales del río Mueche: ~32 nacederos, no volcánicas, bajas en azufre, hasta 68,5 °C
- Cascada de los Ocho Colores: la cascada termal más alta de Colombia, 14 m

---

## Detalles técnicos

- HTML semántico con datos estructurados `schema.org/Hotel` (mejora cómo se ve en Google).
- Sin dependencias ni build: solo HTML, CSS y JavaScript plano.
- Responsive en tres cortes: 1024 px, 860 px (aparece el menú hamburguesa) y 560 px.
- Accesibilidad: enlace «saltar al contenido», foco visible, menú y galería operables con teclado
  (Enter/Espacio para abrir una foto, Esc para cerrar), textos alternativos en las imágenes.
- Respeta `prefers-reduced-motion`: si el sistema pide menos animación, se desactivan.
- Hoja de estilos de impresión básica.
