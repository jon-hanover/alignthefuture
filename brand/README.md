# Align the Future brand

The watercolor logo: a blue circle and a yellow circle overlapping in green,
next to the wordmark ALIGN THE FUTURE in a blue to gold gradient.

The only source file is `logo.png`, trimmed from a 1024 by 186 pixel export
(the largest that exists). The circles in it are about 170 pixels wide, so do
not display `logo-circles.png` much larger than that. Ask Jon for a larger
original if a bigger use comes up.

## Palette

Sampled from the wordmark, left to right.

| Name | Hex | Use |
|---|---|---|
| Blue | `#2D5E93` | Headlines, links, the HUMANS side |
| Teal | `#487C89` | Labels |
| Sage | `#759E75` | The ALIGN overlap |
| Gold | `#D6B246` | Accents, the AI side; too light for text on paper |
| Deep blue | `#1B3553` | Dark bands |
| Paper | `#FBFAF6` | Page background |
| Ink | `#1F2D3D` | Body text |

For gradient text on a light background use the darker ramp
`#2D5E93, #3F7480, #5E8A55, #A8892A` so the gold end stays readable.

## Type

- **Headings**: Raleway, weights 600 to 800. Closest Google Font to the wordmark.
- **Body**: Manrope, weights 400 to 700.

## Files

| File | What it is |
|---|---|
| `logo.png` | Full logo, transparent, 939 by 137 |
| `logo-circles.png` | The circles alone, transparent, 180 by 137 |
| `favicon.ico` | 16, 32, 48 and 64 pixel favicon from the circles |
| `favicon-16.png`, `favicon-32.png` | PNG favicons |
| `png/apple-touch-icon.png` | 180 pixel home screen icon on white |
| `png/og-image.png` | 1200 by 630 social share image |
| `retired/` | The previous marine and tangerine kit, unused |

## Site head

    <link rel="icon" href="/brand/favicon-32.png" type="image/png" sizes="32x32">
    <link rel="icon" href="/brand/favicon-16.png" type="image/png" sizes="16x16">
    <link rel="icon" href="/brand/favicon.ico" sizes="any">
    <link rel="apple-touch-icon" href="/brand/png/apple-touch-icon.png">
    <meta property="og:image" content="https://alignthefuture.org/brand/png/og-image.png">
