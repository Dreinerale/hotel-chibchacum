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

## SEO — qué se hizo y qué falta

El objetivo es salir de primero cuando alguien busque **«hotel en Zetaquira»**. Para
«Zetaquira» a secas no es realista: esa búsqueda la dominan Wikipedia, la alcaldía y los
portales de turismo, y quien la escribe casi nunca está buscando hotel.

### Hecho en la página

- **Título y descripción** orientados a la búsqueda real: «Hotel en Zetaquira, Boyacá ·
  Hotel Chibchacum». Es lo que Google muestra como titular del resultado.
- **Enlace canónico** a `https://hotelchibchacum.co/`, para que las dos direcciones (con y
  sin `www`) no compitan entre sí como si fueran páginas distintas.
- **Datos estructurados `schema.org/Hotel`** completos: dirección, teléfono, correo,
  coordenadas, enlace al mapa, Facebook, fotos, servicios y que se admiten mascotas. Es lo
  que le permite a Google entender que esto es un hotel y no un blog.
- **Etiquetas de ubicación** (`geo.region`, `geo.position`) y **vista previa al compartir**
  en WhatsApp y Facebook con imagen y direcciones absolutas.
- **`sitemap.xml`** con la página y sus fotos principales, y **`robots.txt`** apuntando a él.

### Google Search Console — ✅ configurado

El sitio está dado de alta como **propiedad de dominio** (`sc-domain:hotelchibchacum.co`),
que cubre de una vez el dominio, el `www`, los subdominios y http y https. La verificación
es por registro TXT en el DNS de Spaceship: **ese registro no se puede borrar**, o se
pierde la verificación.

Ahí se consulta, sin costo, con qué palabras llega la gente al sitio, en qué posición
aparece y si Google encuentra algún error. Vale la pena mirarlo una vez al mes.

El `sitemap.xml` quedó enviado. Al principio aparece como «No se ha podido obtener»: es
normal, significa que Google todavía no lo ha leído, no que esté mal. Se comprobó que
responde correctamente a Googlebot (HTTP 200, `application/xml`).

La página **ya estaba indexada** antes de este trabajo, así que no hubo que esperar a que
Google la descubriera. Se pidió una reindexación para que recoja el título y la
descripción nuevos; eso suele tardar entre unos días y dos semanas en verse en los
resultados.

### ⚠️ Lo que falta, y pesa más que todo lo anterior

**El perfil de Google Business (la ficha de Google Maps).** En búsquedas locales como
«hotel en Zetaquira», Google muestra primero el mapa con las fichas, y solo debajo los
sitios web. El negocio ya está reclamado; lo que queda es mantenerlo vivo:

- Que los datos coincidan **letra por letra** con los de la web: *Hotel Chibchacum,
  Cra 2 N° 6-46, Zetaquira, 310 816 9508*. Las diferencias entre una fuente y otra le
  restan confianza a Google.
- Que el sitio web enlazado en la ficha sea `https://hotelchibchacum.co`.
- Subir fotos: las fichas con fotos reciben bastantes más visitas.
- **Pedir reseñas a los huéspedes.** Es el factor que más mueve la aguja en búsquedas
  locales, y no hay atajo que lo reemplace.

### Datos confirmados por el hotel

- **Son 25 habitaciones.** La página decía diecinueve por error; ya está corregido en el
  texto y en los datos estructurados. El sistema de reservas tiene 20 dadas de alta, así
  que ahí faltan cinco por registrar.
- **La noche cuesta 35.000 pesos**, así que el rango de precios quedó en `$`. La tarifa no
  se publica en la página: si algún día se quiere mostrar, hay que acordarse de cambiarla
  también aquí y en los datos estructurados.
- **El teléfono es el `310 816 9508`**, el que estaba en la ficha de Google. El sitio tenía
  `310 816 9518`, que era el equivocado, y ya se corrigió.

### Lo que sigue sin cuadrar

El **WhatsApp** aparece distinto en cada lado: la ficha de Google manda a
`wa.me/3108169508` (el mismo número del teléfono fijo del hotel) y el sitio usa el
`314 200 3387`. Falta decidir cuál es el bueno y dejar el mismo en los dos lados.

El **nombre de la ficha** estaba escrito «Hotel Chichacum», sin la be. Se corrigió a
«Hotel Chibchacum» y quedó pendiente de revisión por parte de Google — esas ediciones
tardan unos minutos y no exigieron volver a verificar el negocio.

---

## Dónde vive el sitio

| Dirección | Qué es |
|---|---|
| **https://hotelchibchacum.co** | El sitio. Es la dirección principal. |
| `www.hotelchibchacum.co` | Redirige a la anterior. |
| `dreinerale.github.io/hotel-chibchacum` | Dirección anterior de GitHub; ahora redirige al dominio. |
| `app.hotelchibchacum.co` | El sistema de reservas (Vercel). **No tiene relación con este sitio.** |

El sitio se publica solo: cada `git push` a la rama `main` lo actualiza en uno o dos minutos.

### Cómo está armado el DNS (en Spaceship)

El dominio usa los nameservers de Spaceship (`launch1`/`launch2.spaceship.net`) y ahí
conviven cuatro cosas distintas. **Si alguna vez hay que tocar el DNS, agregue registros;
no borre los que ya están.**

| Host | Tipo | Para qué |
|---|---|---|
| `@` | A ×4 | Las cuatro IP de GitHub Pages (`185.199.108–111.153`). Son cuatro para que el sitio siga en pie si a GitHub se le cae un servidor. |
| `www` | CNAME | `dreinerale.github.io` |
| `app` | CNAME | El sistema de reservas en Vercel |
| `@` | MX + TXT | El correo `@hotelchibchacum.co` en Spacemail, con su SPF y su DKIM |
| `send` | MX + TXT | Los correos que envía el sistema de reservas (Resend) |
| `@` | TXT | `google-site-verification=…` — es lo que mantiene verificada la propiedad en Google Search Console. Si se borra, se pierde la verificación. |

Dos cosas que confunden al configurarlo:

- En el campo **Host** hay que escribir `@` a mano. Si se deja vacío no guarda.
- Al agregar el segundo, tercer y cuarto registro A, Spaceship avisa de un «registro A en
  conflicto». **Es normal y hay que continuar:** GitHub pide justamente las cuatro.

La raíz del dominio va con registros **A** y no con CNAME a propósito: un CNAME en la raíz
no puede convivir con otros registros y tumbaría el correo, que vive en ese mismo nombre.
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
    ├── casa-campo-jardin.jpg ← la zona verde, con los juegos y la montaña
    ├── casa-campo-cocina.jpg ← cocina y comedor
    ├── casa-campo-vista.jpg  ← la vista hacia el cañón
    ├── casa-campo-lago.jpg   ← el lago, el puente y el kiosco
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

1. **Teléfono y WhatsApp** — ✅ son dos líneas distintas. El teléfono es `310 816 9508`
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
6. **Casa de campo** — ✅ sección `#casa-campo` con fotos reales. **No es alojamiento:**
   se alquila por el día para uso recreativo — eventos, celebraciones, integraciones y
   descanso —, sin límite de personas y sin pasar la noche. El grupo puede usar la cocina
   y el baño. A 10 minutos del pueblo, con zona verde, un lago grande con puente y kiosco.
   Queda por confirmar una cosa menor: si la casa tiene nombre propio.

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
| `dreinerale.github.io` (dirección anterior) | ✅ activado y probado |
| `hotelchibchacum.co` (**dominio actual**) | ✅ activado |

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
