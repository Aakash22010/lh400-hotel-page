# LAVNA LH400 - Hotel Smart Lock page

Shopify sections for the LH400 hotel smart lock landing page, built from the Figma design
"hotel page for dev" (desktop + mobile).

Store: webdesign-pkoydjgt.myshopify.com (Horizon base theme). Only the LH400 files are in this repo,
the rest of the theme is stock Horizon.

## Files

- `sections/lh400-*.liquid` - one section per page block (header, hero, features, pricing, FAQ, footer, ...)
- `snippets/lh400-assets.liquid` - loads fonts, `lh400-base.css` and `lh400.js`; rendered at the top of every section
- `snippets/lh400-buy-button.liquid` - Buy now / Add to cart button linked to a product
- `snippets/lh400-image.liquid`, `snippets/lh400-stars.liquid` - small helpers
- `assets/lh400-*` - section CSS, JS and images
- `layout/lh400.liquid` - standalone layout for the page
- `templates/index.json`, `templates/page.lh400.json` - the page (home page and `/pages/<handle>` with the lh400 template)
- `sections/header-group.json`, `sections/footer-group.json` - LH400 header / footer on every page

## Notes

- Sizes use `calc(N * var(--lh-u))`, where N x 10 = Figma px, so the sections don't depend on the theme's root font size.
- All CSS is scoped to the section class, so the sections can be dropped into another theme (e.g. Dawn).
- Buy now adds the product to the cart and goes to Shopify checkout. Add to cart uses the theme's cart
  notification if it has one, otherwise the LH400 toast, and updates the header cart count.

## Install in another theme

Copy the `lh400` files from `sections/`, `snippets/` and `assets/` into the theme, then add the sections
from the theme editor (or use `templates/page.lh400.json`) and pick the products in the hero and pricing sections.
