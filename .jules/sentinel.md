# Sentinel Journal

## 2024-07-03 - [Missing Content Security Policy in HTML UI]

**Vulnerability:** The HTML application (`studio/index.html`) lacked a Content
Security Policy (CSP), leaving it potentially vulnerable to Cross-Site
Scripting (XSS) attacks. Without a CSP, the browser doesn't restrict the
sources from which resources like scripts, styles, and images can be loaded,
potentially allowing malicious scripts to execute.

**Learning:** Static HTML pages that don't seem to take user input might still
benefit from a CSP to establish defense-in-depth, especially when they might be
deployed as parts of a larger platform or where unexpected data processing
might occur. The application only needs local scripts, CDNJS for font awesome,
and fonts.googleapis.com, making a restrictive CSP easy to define and
implement.

**Prevention:** Implement a Content Security Policy by default for all HTML web
interfaces, specifying exactly which external domains are authorized to serve
scripts, styles, fonts, and images. Always restrict `default-src` to `'self'`
where possible.
