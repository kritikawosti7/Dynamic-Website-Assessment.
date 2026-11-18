# Australasian International Academy website

A responsive five-page website built with semantic HTML, CSS and vanilla JavaScript. No framework or package installation is required.

## Run in VS Code

1. Open the `aia-website` folder in Visual Studio Code.
2. Open `index.html` in a browser. You can also use the VS Code **Live Preview** or **Live Server** extension if installed, then navigate to the local site URL.
3. Keep the HTML, CSS, JavaScript and `images` folder together so relative paths continue to work.

The site uses locally stored SVG illustrations and system-font fallbacks; it does not depend on third-party assets or font services.

## Test all five pages

Use the shared navigation and footer links to visit:

- `index.html` — home, local-time greeting and featured course
- `about.html` — academy introduction, mission, vision and values
- `course.html` — course overview and searchable sample unit placeholders
- `enquiry.html` — client-side validation demonstration
- `contact.html` — clearly labelled contact placeholders and a placeholder Google Maps search

Check each page at desktop and mobile widths. Verify the page title, skip link, active navigation state, image loading and footer year. The contact and course details shown as unconfirmed placeholders must be replaced with information supplied and approved by the academy.

## Test JavaScript

- On the home page, check the welcome greeting against your device's local time and check the automatically updated footer year.
- At a narrow window width, open and close the hamburger menu with mouse and keyboard; Escape closes it.
- On the course page, search for words such as `digital`, clear the search, expand/collapse individual sample units and use **Expand all** / **Collapse all**.
- On the enquiry page, submit the empty form to see required-field errors. Try an invalid email, an invalid Australian phone number, and an empty consent checkbox. Enter a message and check the 500-character counter. A valid submission displays an accessible demonstration confirmation; it does not transmit or store information.
- For a front-end-only honeypot check, use browser developer tools to set a value in the off-screen `website` field before submitting a valid form. No submission is processed.

## Suggested assessment screenshots

Capture screenshots at a desktop width and a mobile width:

1. Home hero, greeting and primary calls to action.
2. Home highlights and featured course.
3. About page story and mission/vision cards.
4. Course overview with course facts and sample unit accordion.
5. Course page showing search results or expanded units.
6. Enquiry page showing required-field errors.
7. Enquiry page showing the character counter and successful demonstration confirmation.
8. Contact information cards and map placeholder.
9. Mobile navigation open, plus one mobile page view demonstrating responsive layout.

Avoid entering real personal details in screenshots because the form is a browser-only demonstration.

## Publish online

1. Replace all marked placeholders with academy-approved content. Confirm course details, address, phone, email, business hours, map destination and privacy wording before publishing.
2. Upload the complete folder to a static web host (for example, GitHub Pages, Netlify or Cloudflare Pages) or to an HTTPS-enabled web server.
3. Use a valid host-supplied HTTPS URL and test every page, image and navigation link on desktop and mobile.
4. Configure the Content Security Policy and other security headers at the hosting layer where possible. The page-level policy is a useful baseline; a hosting response header is needed for directives such as `frame-ancestors`.
5. Before enabling real enquiries, connect a secure backend, establish an appropriate privacy notice and retention policy, and implement server-side validation and spam controls. The current form intentionally does not send or retain information.

## Project files

```text
aia-website/
├── index.html
├── about.html
├── course.html
├── enquiry.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── aia-mark.svg
│   ├── campus.svg
│   └── learning-space.svg
└── README.md
```
