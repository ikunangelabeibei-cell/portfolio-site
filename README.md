# Portfolio Site

Rebecca Xu's personal portfolio. Static HTML/CSS, with a layout adapted from [aleksdrobik.com](https://www.aleksdrobik.com/). Hosted on GitHub Pages.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: hero, selected work grid, experience carousel, CTA band |
| `about.html` | Long-form about page |
| `resume.html` | Education, experience, and skills |
| `contact.html` | Two-column contact page with form |

Shared styling lives in `css/style.css`; the carousel and mobile nav are in `js/main.js`.

## Run locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## To do

- Add a portrait at `assets/portrait.jpg` (the home and About pages pick it up automatically).
