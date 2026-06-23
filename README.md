# 805 Bookkeeping — website

A single-page, no-build static site for a Central Coast bookkeeping business.
Built with plain HTML, CSS, and a touch of vanilla JavaScript so it runs great
on GitHub Pages with zero dependencies.

```
index.html     # all the page content
styles.css     # coastal theme (ocean blues → seafoam greens over warm sand)
script.js      # mobile menu, scroll-reveal, footer year
favicon.svg    # little sun-over-waves mark
CNAME          # custom domain for GitHub Pages (805bookkeeping.biz)
```

## ✏️ Before you go live — fill in the real details

Search `index.html` for `TODO` and replace the placeholders:

- **Email** — `hello@805bookkeeping.biz` (appears in the contact section and form note)
- **Phone** — `(805) 555-0100` (the `tel:` link and visible number)
- **Service area / city** — currently "Serving Ventura, Santa Barbara & the 805"

The four services, brand name, and tagline are already set. Tweak any of the
copy in `index.html` to sound like Mom.

## 💬 Making the contact form actually send

GitHub Pages serves static files only — it can't process a form on its own.
Right now the form is styled but inert. Easiest options:

1. **Just use email (simplest).** Delete the `<form>` block and lean on the
   email/phone links that are already there.
2. **[Formspree](https://formspree.io)** (free tier). Create a form, then set:
   ```html
   <form class="contact-form" action="https://formspree.io/f/XXXXXXX" method="post">
   ```
   and remove the `onsubmit="return false"` attribute.
3. **mailto fallback** — point the form at `action="mailto:hello@805bookkeeping.biz"`.

## 🚀 Deploy on GitHub Pages

1. Create a repo (e.g. `805bookkeeping`) and push these files to the default branch.
   ```bash
   git add .
   git commit -m "805 Bookkeeping website"
   git push
   ```
2. On GitHub: **Settings → Pages → Build and deployment**.
   Set **Source** to *Deploy from a branch*, branch `main`, folder `/ (root)`. Save.
3. **Custom domain:** the included `CNAME` file already requests
   `805bookkeeping.biz`. At your domain registrar, add DNS records:
   - Four **A** records for the apex `@` pointing to:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (optional) a **CNAME** for `www` → `<your-username>.github.io`
4. Back in **Settings → Pages**, confirm the custom domain and tick
   **Enforce HTTPS** once the certificate is issued (can take a little while).

## 🔍 Preview locally

Any static server works, e.g.:
```bash
python -m http.server 8000
# then open http://localhost:8000
```

## 🏝️ The hero photo

The hero uses **`hero-alt.jpg`** — a lone coconut palm at sunset by
**Belu Carrillo Asis** via [Pexels](https://www.pexels.com/photo/palm-tree-on-the-beach-during-golden-hour-10874220/),
free to use commercially with no attribution required (credit kept here as a
courtesy). A second option, **`hero.jpg`** (a Santa Barbara sunset by Umay Isik,
also Pexels), is included — to switch, change the `url("hero-alt.jpg")` in
`.hero-scene` to `url("hero.jpg")`.

To use your own photo, replace the file (or point the `url(...)` at it) with any
image you own or that's licensed for commercial use. Fine-tune framing and
softness on `.hero-scene` in `styles.css`:

- `background-position` — `center 52%` controls which slice shows (raise/lower
  the % to reveal more sky or more beach).
- `filter: blur(3px)` — the "slightly blurred" amount. Set to `blur(0)` for a
  crisp photo.

The dark `.hero-scrim` gradient keeps the white headline readable; lighten it
if you use a brighter photo.

## 🎨 Customizing the look

All colors live as CSS variables at the top of `styles.css` under `:root`
(`--ocean-800`, `--seafoam`, `--sun`, `--coral`, `--sand-50`, …). Change those
to shift the whole palette at once. Headings use **Fraunces**, body uses
**Nunito Sans** (loaded from Google Fonts in `index.html`). The animated palm
logo lives inline in `index.html` (the nav `.brand-mark`), and its unfold
animation is in `styles.css` under "Animated palm logo".
