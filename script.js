/* ============================================================
   ESPAÃ‡O JOVEM â€” LOJA SALESIANA
   JavaScript puro â€” sem frameworks.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Menu mobile (hamburger) ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var menuMobile = document.getElementById('menuMobile');

  function abrirMenu() {
    menuMobile.hidden = false;
    // pequeno delay para permitir a transiÃ§Ã£o de max-height
    requestAnimationFrame(function () {
      menuMobile.classList.add('open');
    });
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Fechar menu');
  }

  function fecharMenu() {
    menuMobile.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    // aguarda a transiÃ§Ã£o antes de esconder de fato (acessibilidade)
    window.setTimeout(function () {
      if (!menuMobile.classList.contains('open')) {
        menuMobile.hidden = true;
      }
    }, 300);
  }

  if (menuToggle && menuMobile) {
    menuToggle.addEventListener('click', function () {
      var aberto = menuToggle.getAttribute('aria-expanded') === 'true';
      aberto ? fecharMenu() : abrirMenu();
    });

    // Fecha o menu ao clicar em um link
    menuMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', fecharMenu);
    });

    // Fecha o menu com a tecla Esc
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        fecharMenu();
        menuToggle.focus();
      }
    });
  }

  /* ---------- Aparecimento suave ao rolar a pÃ¡gina ---------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var elementosReveal = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    elementosReveal.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-visible');
          observer.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });

    elementosReveal.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Ano atual no rodapÃ© ---------- */
  var anoAtual = document.getElementById('anoAtual');
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

});
