# Bitácora — Sesión 7 (2026-06-13)

### Contexto

Salto a la **etapa 2** del proyecto: JavaScript vanilla. La decisión la tomó el usuario
cuando el menú creció a 7 enlaces (más el CV) y dejó de caber en móvil. Primer trabajo con
JS: un menú hamburguesa accesible y un scrollspy que resalta la sección visible.

---

### Etapa 31 — Estructura de JavaScript y menú hamburguesa

Se creó `assets/js/main.js`, enlazado desde `index.html` con `<script defer>` (el atributo
`defer` ejecuta el script cuando el DOM ya está parseado, sin bloquear el render).

**Menú hamburguesa.** Se añadió un `<button class="nav-toggle">` con tres `<span>` (las barras)
y atributos de accesibilidad: `aria-controls` apunta al `id` del menú y `aria-expanded` refleja
si está abierto. El JS:

- Alterna la clase `is-open` en el menú y actualiza `aria-expanded` y `aria-label`.
- Cierra el menú al hacer clic en cualquier enlace (para que al navegar a una sección se repliegue).

En CSS, el botón está oculto en escritorio (`display: none`) y aparece solo en el breakpoint
móvil. Allí el menú pasa a `position: absolute` y se despliega/oculta con `display`, en lugar
del scroll horizontal que teníamos antes (etapa 1). Las barras se animan a una "X" cuando
`aria-expanded="true"`.

> **Principio aprendido:** un menú accesible no es solo el efecto visual. Los atributos ARIA
> (`aria-expanded`, `aria-controls`, `aria-label`) comunican el estado a lectores de pantalla;
> el JS debe mantenerlos sincronizados con la clase que controla el CSS.

---

### Etapa 32 — Scrollspy con IntersectionObserver

El nav ahora resalta el enlace de la sección que se está viendo. Se usó la API
`IntersectionObserver` en vez de escuchar el evento `scroll` (más eficiente: el navegador
avisa solo cuando una sección entra o sale de una franja, sin ejecutar código en cada píxel
de scroll).

```js
{ rootMargin: '-40% 0px -55% 0px' }
```

Ese `rootMargin` reduce la zona de detección a una franja estrecha en el tercio superior del
viewport, de modo que solo una sección cuenta como "activa" a la vez. El enlace activo recibe
la clase `active`, que lo pinta con el color de acento.

> **Principio aprendido:** para reaccionar a la posición de scroll, `IntersectionObserver` es
> preferible a `addEventListener('scroll')`: evita trabajo en cada cuadro y el navegador
> optimiza las notificaciones.

---

### Etapa 33 — Acceso al CV en el menú

El enlace a la hoja de vida (`cv.html`) estaba solo en el botón del hero, que desaparece al
hacer scroll. Se añadió un enlace **CV** al nav (sticky), siempre accesible; en móvil lo
gestiona el propio menú hamburguesa. El scrollspy lo ignora (no es un ancla interna).

---

### Nota de verificación

Para validar el layout se usó Chrome headless (`--screenshot`). Lección práctica: a anchos
estrechos (≈390 px) la captura **recorta el lado derecho**, donde queda el botón hamburguesa,
dando la falsa impresión de que no se renderiza. A 600 px (aún dentro del breakpoint) el botón
aparece sin problema. La verificación responsive fiable es el navegador real o sus DevTools.

---

### Estado al cierre de sesión 7

- [x] Estructura `assets/js/` con `main.js` (etapa 2 iniciada)
- [x] Menú hamburguesa accesible (reemplaza el scroll horizontal en móvil)
- [x] Scrollspy con IntersectionObserver (enlace activo resaltado)
- [x] Enlace al CV en el menú de navegación

### Próximas etapas (ideas)

- [ ] Cerrar el menú móvil al pulsar fuera de él o con la tecla Escape
- [ ] Modo claro / oscuro con persistencia
- [ ] Filtros en la sección de proyectos o media
