# Portfolio Site

A clean, static rebuild of the layout and design of [aleksdrobik.com](https://www.aleksdrobik.com/) (a Squarespace site), intended as the starting template for Rebecca Xu's personal portfolio.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Portfolio home: hero, case study grid, testimonial carousel, CTA band |
| `about.html` | Long-form about page with photo gallery |
| `resources.html` | Embedded video resources |
| `contact.html` | Two-column contact page with form |

Shared styling lives in `css/style.css`; the carousel and mobile nav are in `js/main.js`.

## Run locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Status

Images and copy are currently placeholders pulled from the original site so the clone can be compared side by side. Next step: swap in Rebecca's own content, photos, and brand colors.
