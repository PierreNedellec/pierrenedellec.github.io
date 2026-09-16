# Your website — how it works and how to change it

Nine real HTML pages, Bootstrap 5 for layout, one CSS file for the look.
No build step, no npm, no framework. Double-click `index.html` and it works.

```
site/
├── index.html                      the homepage (the directory)
├── writing.html                    list of essays
├── writing-bad-on-purpose.html     one essay — your template for all essays
├── projects.html                   grid of 4 project cards
├── project-bus-scraper.html        one case study — your template for all projects
├── side-quests.html                grid of small things
├── cv.html                         your CV (prints to a clean PDF)
├── about.html                      longer bio + portrait
├── contact.html                    email + socials
└── assets/
    └── site.css                    ← all of your styling lives here
```

## Start here (20 minutes)

1. Open the whole `site` folder in your editor (VS Code is fine and free).
2. Find-and-replace `your-name` with your actual name across all files.
   In VS Code: `Cmd/Ctrl + Shift + F`, type `your-name`, replace all.
3. Replace `hello@yourdomain.com` in `contact.html` the same way.
4. Rewrite the copy. Every sentence in these files is a placeholder — it's
   written in a voice, so match it or break it, but don't leave it.
5. Open `index.html` in your browser. Refresh after each save. That's the loop.

## The two halves of the styling

**Bootstrap** does the layout. You'll see its classes everywhere:

| class | what it does |
|---|---|
| `container` | centres the content and adds side padding |
| `d-flex`, `flex-column` | lays children in a row / column |
| `gap-3`, `py-4`, `mb-2` | spacing — `gap/p/m` + side + step 0–5 |
| `row` + `col` | the 12-column grid |
| `row-cols-1 row-cols-md-2` | 1 card per row on phones, 2 on desktop |
| `border-top`, `border-bottom` | hairlines using your theme colour |
| `justify-content-between` | pushes children to opposite ends |

Anything you want to change about *arrangement*, look up in the Bootstrap
docs: https://getbootstrap.com/docs/5.3/utilities/spacing/

**`assets/site.css`** does the look. The top of that file is six colour
variables. Change `--accent` from `#c9f24b` to anything and the whole site
follows — links, buttons, headings, the blinking cursor.

```css
--bg:     #14150f;   /* page background */
--accent: #c9f24b;   /* the acid green  */
```

Below that are the small custom classes the pages use: `.label` (the tiny
uppercase mono text), `.prose` (the serif essay body), `.dir-row` (homepage
directory rows), `.list-row`, `.tile`, `.shot` (striped image placeholders),
`.btn-accent`.

## How to add a new essay

1. Duplicate `writing-bad-on-purpose.html` and rename it, e.g.
   `writing-reading-lists.html`. Keep the `writing-` prefix so the files sort.
2. In the new file change the `<title>`, the date line, the `<h1>`, and the
   `<p>` tags inside `.prose`. Nothing else.
3. Open `writing.html` and copy one of the `<a class="list-row">` blocks,
   paste it at the top of the list, and point its `href` at your new file.
4. Optional: add a line to the `recent` list in `index.html`.

Projects work identically — duplicate `project-bus-scraper.html`, then add a
`<div class="col">` card to `projects.html`.

## Adding real images

The striped grey boxes are `<div class="shot">`. Replace each one with:

```html
<img src="assets/portrait.jpg" alt="Portrait of me" class="w-100">
```

Put the file in `assets/`. Resize photos to about 1600px wide before
uploading — a 6MB phone photo makes the page slow. Always write the `alt`
text; it's what screen readers and Google read.

## The CV prints properly

`cv.html` has a "download pdf" button that calls `window.print()`. The
`@media print` block at the bottom of `site.css` switches the page to black
ink on white paper and hides the nav, so you get a clean one-page PDF —
Print → *Save as PDF*. Keep both CV versions in sync by only editing the HTML.

## The one annoyance of plain HTML

The header and footer are copy-pasted into all nine pages. If you add a new
nav link, you have to add it nine times (find-and-replace handles it). That's
the honest tradeoff for having no build step. If it starts hurting, the next
step up is **Astro** or **Eleventy** — same HTML, but the header lives in one
file. Don't do that until it actually annoys you.

## Publishing it for free

**GitHub Pages** (best if you want the URL on your CV):

1. Make a free GitHub account.
2. Create a repository named exactly `yourusername.github.io`.
3. Upload the *contents* of this `site` folder (so `index.html` is at the top
   level, not inside a `site/` folder).
4. Settings → Pages → Source: `main` branch, `/root`. Wait two minutes.
5. It's live at `https://yourusername.github.io`.

**Netlify** is even faster: sign up, drag the `site` folder onto the dashboard,
done. Both let you point a custom domain (~£10/year from Namecheap or
Cloudflare) at the site later.

## Small things that make it look professional

- Add a `favicon.ico` to the folder — otherwise browsers show a blank page icon.
- Write a real `<title>` per page; it's what shows in search results and tabs.
- Add `<meta name="description" content="...">` to `index.html`.
- Check it on your phone. Bootstrap handles the reflow, but read it once on a
  small screen before you send the link to anyone.
