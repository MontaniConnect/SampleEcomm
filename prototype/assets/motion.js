/* Scroll reveals for public pages. Skipped for reduced motion, admin pages, and browsers without IntersectionObserver. */
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (document.querySelector('.admin')) return;

  var sel = 'main .card, main .tile, main .quicklink, main .t-card, main .steps li, main .trust li, ' +
    'main .feature, main .split, main .video, main .summary, main .section__head, main h2.center, ' +
    'main .faq-wrap, main .cta-band .wrap';
  var vh = window.innerHeight;
  var all = [].slice.call(document.querySelectorAll(sel));
  var els = all.filter(function (el) {
    if (el.closest('.hero')) return false;
    if (el.getBoundingClientRect().top < vh * 0.95) return false;
    return !all.some(function (o) { return o !== el && o.contains(el); });
  });

  function done(el) {
    el.classList.remove('reveal', 'is-in');
    el.style.removeProperty('--d');
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      io.unobserve(el);
      el.classList.add('is-in');
      el.addEventListener('transitionend', function h(ev) {
        if (ev.propertyName !== 'opacity') return;
        el.removeEventListener('transitionend', h);
        done(el);
      });
      setTimeout(function () { done(el); }, 600);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

  els.forEach(function (el) {
    var i = [].indexOf.call(el.parentNode.children, el);
    el.style.setProperty('--d', (i % 4) * 20 + 'ms');
    el.classList.add('reveal');
    io.observe(el);
  });
})();
