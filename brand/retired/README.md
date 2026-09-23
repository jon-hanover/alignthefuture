# Align the Future brand kit

Final identity assets, chosen from the concept rounds in `docs/logo-concepts/`.

## Palette

| Name | Hex | Use |
|---|---|---|
| Marine | `#0B3C5D` | Letters of the mark, headlines, dark tiles |
| Tangerine | `#FF8C42` | The lower vector, one accent per layout, FUTURE in the icon |
| Paper | `#FBF8F1` | Warm light background for pages and print |
| Bone | `#F4F8FA` | Text and mark on marine or navy |
| Navy | `#0F1B2D` | Darkest surface, footers and reversed sections |

Tangerine is an accent. It appears once per composition: the lower vector, or FUTURE, or a single button. Never both letters of the mark.

## Type

- **Wordmark**: Fraunces, optical size 144, weight 600, SOFT 50. The wordmark in `lockup.svg` is already outlines, so no font is needed to display it.
- **Headlines**: Fraunces (Google Fonts), `opsz` 72 to 144, weight 500 to 600.
- **Body and UI**: Manrope (Google Fonts), weights 400 to 700. Plain, wide, legible next to a soft serif.
- **Icon text**: Archivo, width 62, weight 700, tracked 0.12em. Used only inside `icon.svg`.

Google Fonts link for the site:

    https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@72..144,500..600,50&family=Manrope:wght@400..700&display=swap

## The mark

The A's left leg sweeps up into the top vector. The A's right leg is the F's stem. The lower vector leaves the A at the crossbar and is the F's middle arm. Both vectors are arcs of one circle, so they share a curvature and differ only in aim. The top vector ends 20° above horizontal, the lower one 4° above.

## Files

| File | What it is |
|---|---|
| `mark.svg` | The mark alone, marine and tangerine, transparent |
| `mark-reversed.svg` | Bone letters for dark backgrounds, transparent |
| `lockup.svg` | Mark plus the Fraunces wordmark, transparent, outlined type |
| `lockup-reversed.svg` | Same, bone, for dark backgrounds |
| `icon.svg` | Rounded marine tile with mark and stacked name |
| `icon-square.svg` | Same tile with square corners, for platforms that apply their own mask |
| `favicon.svg` | Marine tile with the mark alone, for small sizes |
| `favicon.ico` | 16, 32, 48 and 64 pixel favicon |
| `og-image.svg` | 1200 by 630 social share image on paper |
| `png/mark-2048.png`, `-1024`, `-512`, `-256` | Mark, transparent |
| `png/mark-reversed-2048.png`, `-1024` | Reversed mark, transparent |
| `png/lockup-3000.png`, `-1500`, `-800` | Lockup, transparent |
| `png/lockup-reversed-3000.png`, `-1500` | Reversed lockup, transparent |
| `png/icon-1024.png`, `-512`, `-192` | Square tile for app stores and web manifests |
| `png/apple-touch-icon.png` | 180 pixel square tile for iOS home screens |
| `png/icon-rounded-1024.png`, `-512` | Rounded tile for places that do not mask |
| `png/favicon-64.png`, `-48`, `-32`, `-16` | Favicon sizes |
| `png/og-image.png` | 1200 by 630 social share image |

## Rules

- **Clear space**: keep a margin around the mark equal to the height of the A's right leg on all sides.
- **Minimum size**: the mark at 24 pixels tall, the lockup at 140 pixels wide. Below that use `favicon.svg`.
- **Backgrounds**: marine and tangerine on paper or white; bone and tangerine on marine or navy. Never place the marine mark on navy.
- **Do not** recolor the vectors, add a gradient, rotate the mark, or set the wordmark in a different face.

## Site head

    <link rel="icon" href="/brand/favicon.svg" type="image/svg+xml">
    <link rel="icon" href="/brand/favicon.ico" sizes="any">
    <link rel="apple-touch-icon" href="/brand/png/apple-touch-icon.png">
    <meta property="og:image" content="https://alignthefuture.org/brand/png/og-image.png">
