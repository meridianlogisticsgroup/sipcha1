# HTMX-as-SPA upgrade (Dokploy-ready)

- **Links & forms** are boosted (`hx-boost`) → fetch partials into `#app`
- **History/URL**: `hx-push-url="true"` keeps browser history working
- **Fragments**: routes render only inner content when HTMX; full shell otherwise
- **Title** updates via `<title hx-swap-oob>`
- **Auth**: HTMX-safe redirects using `HX-Redirect` on 401/login

## Run
```bash
docker compose up --build
# http://localhost:8000
# login: admin@sipcha.io / admin123
```

## Add a new page
1. Create `templates/<entity>/_page.html` (fragment).
2. In Flask route: `return render_page('<entity>/_page.html', title='Your Title', **ctx)`.
3. For tables/forms, just swap into local targets; no full page refresh required.
