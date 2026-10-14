/* ==========================================================================
   LH400 - Why LAVNA scroll stack
   Desktop: the stage is sticky while the page scrolls through the section and cards 2..n slide up into
   their stacked slots one after another (Figma prototype: Default -> Variant 2 -> 3 -> 4).
   Mobile, reduced motion and no-JS fall back to the static layout from the CSS.
   ========================================================================== */
(function () {
  "use strict";
  var desktop = window.matchMedia("(min-width: 900px)");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  function setup(wrap) {
    if (wrap.__lhWhy) return;
    wrap.__lhWhy = true;
    var stage = wrap.querySelector(".lh-why__stage");
    var cards = Array.prototype.slice.call(wrap.querySelectorAll("[data-why-card]"));
    var queued = false;

    // scroll progress through the section (0..1) -> each card gets its own slice of it
    function render() {
      queued = false;
      var on = desktop.matches && !reduce.matches && cards.length > 1;
      wrap.classList.toggle("is-animated", on);
      if (!on) {
        cards.forEach(function (c) { c.style.translate = ""; });
        return;
      }
      var distance = wrap.offsetHeight - stage.offsetHeight;
      var p = distance > 0 ? Math.min(1, Math.max(0, -wrap.getBoundingClientRect().top / distance)) : 1;
      var n = cards.length - 1, h = stage.offsetHeight;
      cards.forEach(function (c, i) {
        if (i === 0) return;
        var t = Math.min(1, Math.max(0, p * n - (i - 1)));
        var eased = 1 - Math.pow(1 - t, 3);   // ease-out cubic
        c.style.translate = "0 " + ((1 - eased) * (h - c.offsetTop + 48)).toFixed(1) + "px";
      });
    }
    // one update per frame while scrolling
    function queue() { if (!queued) { queued = true; requestAnimationFrame(render); } }

    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    if (desktop.addEventListener) { desktop.addEventListener("change", queue); reduce.addEventListener("change", queue); }
    render();
  }

  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll("[data-why-stack]"), setup);
  }

  // run on load and again when the section is re-rendered in the theme editor
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { init(document); });
  else init(document);
  document.addEventListener("shopify:section:load", function (e) { init(e.target); });
})();
