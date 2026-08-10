/* Hotel Chibchacum — interacciones del sitio */
(function () {
  'use strict';

  /* =========================================================
     CONFIGURACIÓN DEL FORMULARIO
     ---------------------------------------------------------
     Las solicitudes se envían con FormSubmit (formsubmit.co).
     No hay clave ni cuenta: el destino es el propio correo.

     Para cambiar la dirección que recibe las solicitudes, basta
     con cambiar CORREO_HOTEL aquí abajo. La primera vez que se
     use una dirección nueva, FormSubmit le manda a ese buzón un
     correo de activación que hay que confirmar una sola vez.
     ========================================================= */
  var CORREO_HOTEL = 'admin@hotelchibchacum.co';
  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + CORREO_HOTEL;

  /* ---------- año del footer ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- nav: estado al hacer scroll ---------- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    nav.classList.toggle('is-stuck', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- nav: menú móvil ---------- */
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');

  var closeMenu = function () {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menú');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.style.overflow = open ? 'hidden' : '';
  });

  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) closeMenu();
  });

  /* ---------- reveal on scroll ---------- */
  var revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- parallax suave en la constelación del hero ---------- */
  var constellation = document.querySelector('.constellation');
  if (constellation && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, 900);
        constellation.style.transform = 'translateY(' + (y * 0.18) + 'px)';
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- lightbox del mosaico ---------- */
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightboxImg');
  var lbCap = document.getElementById('lightboxCap');
  var lbClose = document.getElementById('lightboxClose');
  var lastFocused = null;

  var openLightbox = function (fig) {
    var img = fig.querySelector('img');
    if (!img) return;
    lastFocused = document.activeElement;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || '';
    lbCap.textContent = fig.getAttribute('data-caption') || img.alt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  };

  var closeLightbox = function () {
    lightbox.hidden = true;
    lbImg.removeAttribute('src');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll('.mosaic__item').forEach(function (fig) {
    fig.setAttribute('tabindex', '0');
    fig.setAttribute('role', 'button');
    fig.addEventListener('click', function () { openLightbox(fig); });
    fig.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(fig); }
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });

  /* ---------- formulario de reserva ---------- */
  var form = document.getElementById('reservaForm');
  var status = document.getElementById('formStatus');

  var setError = function (input, msg) {
    var field = input.closest('.field');
    field.classList.toggle('is-invalid', Boolean(msg));
    var err = field.querySelector('[data-err]');
    if (err) err.textContent = msg || '';
  };

  var validate = function () {
    var ok = true;
    var nombre = form.nombre, tel = form.tel, email = form.email;
    var llegada = form.llegada, salida = form.salida;

    if (nombre.value.trim().length < 3) { setError(nombre, 'Escriba su nombre completo.'); ok = false; }
    else setError(nombre, '');

    if (tel.value.replace(/\D/g, '').length < 7) { setError(tel, 'Ingrese un número de contacto válido.'); ok = false; }
    else setError(tel, '');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { setError(email, 'Ingrese un correo válido.'); ok = false; }
    else setError(email, '');

    if (!llegada.value) { setError(llegada, 'Indique la fecha de llegada.'); ok = false; }
    else setError(llegada, '');

    if (!salida.value) { setError(salida, 'Indique la fecha de salida.'); ok = false; }
    else if (llegada.value && salida.value <= llegada.value) {
      setError(salida, 'La salida debe ser posterior a la llegada.'); ok = false;
    } else setError(salida, '');

    return ok;
  };

  // fecha mínima = hoy
  var today = new Date().toISOString().slice(0, 10);
  form.llegada.min = today;
  form.salida.min = today;
  form.llegada.addEventListener('change', function () {
    form.salida.min = form.llegada.value || today;
  });

  // "2026-09-13" -> "13/09/2026"
  var fechaLegible = function (iso) {
    if (!iso) return '—';
    var p = iso.split('-');
    return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : iso;
  };

  // FormSubmit exige activar cada dirección de destino una sola vez. Si el
  // formulario deja de funcionar tras cambiar CORREO_HOTEL, este aviso en la
  // consola del navegador (F12) explica exactamente qué pasó.
  var avisarSiFaltaActivacion = function (err) {
    if (err && /activat/i.test(String(err.message || err))) {
      console.warn(
        '[Hotel Chibchacum] El formulario está sin activar.\n' +
        'FormSubmit envió un correo de activación a ' + CORREO_HOTEL + '.\n' +
        'Abra ese buzón y haga clic en el enlace "Activate Form". Es una sola vez.'
      );
    }
  };

  var setStatus = function (el, html, tipo) {
    el.innerHTML = html;
    el.classList.toggle('is-error', tipo === 'error');
    el.classList.toggle('is-ok', tipo === 'ok');
  };

  var enlaceCorreo = function () {
    var cuerpo = [
      'Nombre: ' + form.nombre.value.trim(),
      'Teléfono/WhatsApp: ' + form.tel.value.trim(),
      'Correo: ' + form.email.value.trim(),
      'Llegada: ' + fechaLegible(form.llegada.value),
      'Salida: ' + fechaLegible(form.salida.value),
      'Huéspedes: ' + form.huespedes.value,
      '',
      'Mensaje: ' + (form.mensaje.value.trim() || '—')
    ].join('\n');

    return 'mailto:' + CORREO_HOTEL
      + '?subject=' + encodeURIComponent('Solicitud de reserva · ' + form.nombre.value.trim())
      + '&body=' + encodeURIComponent(cuerpo);
  };

  var submitBtn = form.querySelector('button[type="submit"]');
  var submitLabel = submitBtn.textContent;
  var enviando = false;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (enviando) return;

    if (!validate()) {
      setStatus(status, 'Revise los campos marcados.', 'error');
      form.querySelector('.is-invalid input, .is-invalid select').focus();
      return;
    }

    enviando = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';
    setStatus(status, 'Enviando su solicitud…', '');

    var datos = {
      _subject: 'Solicitud de reserva · ' + form.nombre.value.trim(),
      _template: 'table',
      _captcha: 'false',
      _replyto: form.email.value.trim(),
      'Nombre': form.nombre.value.trim(),
      'Teléfono / WhatsApp': form.tel.value.trim(),
      'Correo': form.email.value.trim(),
      'Fecha de llegada': fechaLegible(form.llegada.value),
      'Fecha de salida': fechaLegible(form.salida.value),
      'Huéspedes': form.huespedes.value,
      'Mensaje': form.mensaje.value.trim() || '—',
      _honey: form._honey ? form._honey.value : ''
    };

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(datos)
    })
      .then(function (res) { return res.json().catch(function () { return {}; }); })
      .then(function (data) {
        // FormSubmit devuelve success como cadena "true" en unas rutas y booleano en otras
        if (data && (data.success === true || data.success === 'true')) {
          setStatus(status,
            '¡Gracias! Recibimos su solicitud y le respondemos hoy mismo por WhatsApp o correo.', 'ok');
          form.reset();
          form.llegada.min = today;
          form.salida.min = today;
        } else {
          throw new Error((data && data.message) || 'respuesta no válida');
        }
      })
      .catch(function (err) {
        avisarSiFaltaActivacion(err);
        setStatus(status,
          'No pudimos enviar la solicitud. '
          + '<a class="link-gold" href="' + enlaceCorreo() + '">Envíela por correo</a> '
          + 'o escríbanos por WhatsApp al 310 816 9518.', 'error');
      })
      .then(function () {
        enviando = false;
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
      });
  });

  /* ---------- boletín ---------- */
  var newsForm = document.getElementById('newsForm');
  var newsStatus = document.getElementById('newsStatus');
  var newsBtn = newsForm.querySelector('button');
  var newsEnviando = false;

  newsForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (newsEnviando) return;

    var value = document.getElementById('newsEmail').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setStatus(newsStatus, 'Ingrese un correo válido.', 'error');
      return;
    }

    newsEnviando = true;
    newsBtn.disabled = true;
    setStatus(newsStatus, 'Enviando…', '');

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: 'Nueva suscripción al boletín',
        _template: 'table',
        _captcha: 'false',
        _replyto: value,
        'Correo suscrito': value
      })
    })
      .then(function (res) { return res.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (data && (data.success === true || data.success === 'true')) {
          setStatus(newsStatus, '¡Gracias! Le escribiremos con los planes de temporada.', 'ok');
          newsForm.reset();
        } else {
          throw new Error('error');
        }
      })
      .catch(function (err) {
        avisarSiFaltaActivacion(err);
        setStatus(newsStatus, 'No pudimos registrarlo. Escríbanos a ' + CORREO_HOTEL + '.', 'error');
      })
      .then(function () {
        newsEnviando = false;
        newsBtn.disabled = false;
      });
  });
})();
