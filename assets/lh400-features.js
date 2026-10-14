/* ==========================================================================
   LH400 - Features section script
   - Mobile card rows start centred on the middle card, like the mobile frame in Figma.
   - 3-way access cards: tapping / clicking the text pill opens its description (Figma on-click state),
     one card open at a time. Desktop hover is plain CSS (lh400-features.css).
   ========================================================================== */
(function () {
  "use strict";

  // scroll a mobile row so its middle card is centred
  function centre(track) {
    var items = track.children;
    if (!items.length || track.scrollWidth <= track.clientWidth + 2) return;
    var mid = items[Math.floor((items.length - 1) / 2)];
    var t = track.getBoundingClientRect(), m = mid.getBoundingClientRect();
    track.scrollLeft += (m.left + m.width / 2) - (t.left + t.width / 2);
  }

  function init(root) {
    Array.prototype.forEach.call(root.querySelectorAll("[data-lh-features]"), function (section) {
      if (section.__lhFeatures) return; // already set up
      section.__lhFeatures = true;
      Array.prototype.forEach.call(section.querySelectorAll("[data-lh-center] [data-lh-track]"), centre);

      // access cards - toggle on the pill only, the photo doesn't react
      var cards = section.querySelectorAll("[data-lh-access]");
      Array.prototype.forEach.call(cards, function (card) {
        if (card.tagName === "A") return;
        function toggle() {
          var on = !card.classList.contains("is-active");
          Array.prototype.forEach.call(cards, function (c) {
            c.classList.remove("is-active");
            if (c.hasAttribute("aria-expanded")) c.setAttribute("aria-expanded", "false");
          });
          card.classList.toggle("is-active", on);
          card.setAttribute("aria-expanded", on ? "true" : "false");
        }
        card.addEventListener("click", function (e) { if (e.target.closest(".lh-features__pill")) toggle(); });
        card.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
        });
      });
    });
  }

  // run on load and again when the section is re-rendered in the theme editor
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { init(document); });
  else init(document);
  document.addEventListener("shopify:section:load", function (e) { init(e.target); });
})();
