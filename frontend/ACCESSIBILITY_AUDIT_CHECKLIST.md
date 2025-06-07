# Accessibility (a11y) Audit Checklist

## Tools Required
1. axe DevTools Browser Extension
2. Lighthouse Accessibility Audit
3. Manual Testing Tools

## Current Status
- Radix UI Components: Built-in accessibility ✅
- Semantic HTML: Proper heading structure ✅
- Alt Text: Images have descriptive alt attributes ✅
- Focus Indicators: Visible focus states ✅

## WCAG 2.1 A/AA Checklist

### Color Contrast (1.4.3)
- [ ] Body text: 4.5:1 ratio
- [ ] Button text: 4.5:1 ratio
- [ ] Link text: 4.5:1 ratio
- [ ] Muted text: Check if meets minimum

### Keyboard Navigation (2.1.1)
- [ ] All interactive elements accessible via keyboard
- [ ] Tab order is logical
- [ ] No keyboard traps
- [ ] Escape closes modals

### Images (1.1.1)
- [ ] All images have alt text
- [ ] Decorative images use alt=""
- [ ] Complex images have descriptions

### Forms (3.3.2)
- [ ] Labels associated with inputs
- [ ] Required fields marked
- [ ] Error messages descriptive
- [ ] Instructions provided

### Headings (1.3.1)
- [ ] Proper heading hierarchy
- [ ] No skipped heading levels
- [ ] Headings describe content

## Pages to Test
1. Homepage (/)
2. Search Results (/search)
3. Document View (/documents/[id])
4. About Page (/about)
5. Dashboard Pages (/dashboard/*)

## Testing Commands
```bash
npm run lighthouse
npm run dev
``` 