/* Shared behaviour: language, header/footer, reveal, WhatsApp links */
(function () {
  var S = window.SITE, I = window.I18N, SV = window.SERVICES;
  var lang = localStorage.getItem("lang") || "fr";
  var page = document.body.dataset.page || "home";

  var ICON = {
    wa: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.300 1.200-1.800 1.200-.5.100-1 .2-3.300-.7a11.400 11.400 0 0 1-4.700-4.200c-.4-.5-1.100-1.500-1.100-2.800s.7-1.900.9-2.200c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.9 2.100c.1.200.1.400 0 .600l-.4.600-.4.500c-.1.200-.3.400-.1.700.2.300.8 1.300 1.700 2.100 1.200 1 2.100 1.300 2.400 1.500.3.100.5.100.7-.1l.9-1.100c.2-.3.400-.2.700-.1l2 .9c.3.100.5.200.6.300.1.200.1.800-.1 1.400z"/></svg>',
    ig: '<svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3.500A4.500 4.500 0 1 1 7.500 12 4.500 4.500 0 0 1 12 7.500zm0 2A2.500 2.500 0 1 0 14.500 12 2.500 2.500 0 0 0 12 9.500zM17.500 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/></svg>',
    tt: '<svg viewBox="0 0 24 24"><path d="M16.600 2h-3.200v13.300a2.800 2.800 0 1 1-2.800-2.800c.3 0 .6 0 .8.100V9.300a6 6 0 1 0 5.200 5.900V8.600a7.300 7.300 0 0 0 4.200 1.300V6.700a4.300 4.300 0 0 1-4.200-4.700z"/></svg>',
    in: '<svg viewBox="0 0 24 24"><path d="M4.500 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 9h3v12H3zm6 0h2.900v1.700h.1c.4-.8 1.400-1.900 3.100-1.900 3.300 0 3.900 2.200 3.900 5V21h-3v-6.300c0-1.500 0-3.400-2.100-3.400s-2.400 1.600-2.400 3.300V21H9z"/></svg>'
  };

  function t(k) { return (I[lang] && I[lang][k]) || I.fr[k] || k; }
  function waLink(msg) { return "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(msg || t("wa.default")); }
  window.DR = { t: t, waLink: waLink, lang: function () { return lang; }, ICON: ICON };

  function navLink(href, key, id) {
    return '<li><a href="' + href + '"' + (page === id ? ' class="active"' : "") + ' data-i18n="' + key + '"></a></li>';
  }

  function header() {
    return '<header class="site-header" id="hdr"><div class="container nav">' +
      '<a class="logo" href="index.html"><img class="logo-img" src="assets/logo.jpg" alt="" width="46" height="46"><span class="logo-txt">Dr Salima Baya<small data-i18n="footer.short"></small></span></a>' +
      '<ul class="nav-links" id="navLinks">' +
      navLink("index.html", "nav.home", "home") +
      navLink("index.html#about", "nav.about", "about") +
      navLink("index.html#services", "nav.services", "services") +
      navLink("contact.html", "nav.contact", "contact") +
      '<li><button class="lang-btn" id="langBtn" type="button" aria-label="Language"></button></li>' +
      '<li><a class="btn btn-rose" data-wa href="#" target="_blank" rel="noopener" data-i18n="nav.cta"></a></li>' +
      '</ul><button class="burger" id="burger" type="button" aria-label="Menu"><span></span><span></span><span></span></button></div></header>';
  }

  function footer() {
    var links = SV.map(function (s) { return '<li><a href="service.html?s=' + s.slug + '" data-svc="' + s.slug + '"></a></li>'; }).join("");
    return '<footer class="site-footer"><div class="container"><div class="foot-grid">' +
      '<div><h4>Dr Salima Baya</h4><p data-i18n="footer.tag"></p><div class="socials">' +
      '<a href="' + S.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICON.ig + '</a>' +
      '<a href="' + S.tiktok + '" target="_blank" rel="noopener" aria-label="TikTok">' + ICON.tt + '</a>' +
      '<a href="' + S.linkedin + '" target="_blank" rel="noopener" aria-label="LinkedIn">' + ICON.in + '</a>' +
      '<a data-wa href="#" target="_blank" rel="noopener" aria-label="WhatsApp">' + ICON.wa + '</a></div></div>' +
      '<div><h4 data-i18n="svc.eyebrow"></h4><ul>' + links + '</ul></div>' +
      '<div><h4 data-i18n="contact.title"></h4><ul>' +
      '<li><a href="tel:' + S.phone + '">' + S.phoneDisplay + '</a></li>' +
      '<li><a data-wa href="#" target="_blank" rel="noopener">WhatsApp ' + S.whatsappDisplay + '</a></li>' +
      '<li data-addr></li></ul></div></div>' +
      '<div class="foot-bottom"><span>© ' + new Date().getFullYear() + ' Dr Salima Baya. <span data-i18n="footer.rights"></span></span></div></div></footer>' +
      '<a class="fab" data-wa href="#" target="_blank" rel="noopener" aria-label="WhatsApp">' + ICON.wa + '</a>';
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = t(el.dataset.i18n);
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") el.placeholder = v; else el.innerHTML = v;
    });
    document.querySelectorAll("[data-svc]").forEach(function (el) {
      var s = SV.find(function (x) { return x.slug === el.dataset.svc; });
      if (s) el.textContent = s[lang].name;
    });
    document.querySelectorAll("[data-addr]").forEach(function (el) { el.textContent = S.address[lang]; });
    var lb = document.getElementById("langBtn");
    if (lb) lb.textContent = lang === "fr" ? "العربية" : "Français";
    document.querySelectorAll("a[data-wa]").forEach(function (a) {
      a.href = waLink(a.dataset.msg ? a.dataset.msg : "");
    });
    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  }
  window.DR.applyLang = applyLang;

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  window.DR.observe = function (el) { io.observe(el); };

  function init() {
    document.body.insertAdjacentHTML("afterbegin", header());
    document.body.insertAdjacentHTML("beforeend", footer());
    var hdr = document.getElementById("hdr");
    var onScroll = function () { hdr.classList.toggle("solid", window.scrollY > 40 || document.body.dataset.solid === "1"); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

    var burger = document.getElementById("burger"), links = document.getElementById("navLinks");
    burger.addEventListener("click", function () { burger.classList.toggle("open"); links.classList.toggle("open"); });
    links.addEventListener("click", function (e) { if (e.target.tagName === "A") { burger.classList.remove("open"); links.classList.remove("open"); } });

    document.getElementById("langBtn").addEventListener("click", function () {
      lang = lang === "fr" ? "ar" : "fr";
      localStorage.setItem("lang", lang);
      applyLang();
    });

    document.querySelectorAll(".rv").forEach(function (el) { window.DR.observe(el); });

    applyLang();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
