/** "The Frame" — Revela's brand mark: a charcoal serif R on a cream tile,
 *  framed by two terracotta crop marks (the editor's viewfinder).
 *
 *  This SVG string is the rasterization source for the static favicon,
 *  apple-touch icon, OG-image tile, and the Xcode app icon (regenerate them
 *  after editing — see the note in components/ui/Logomark.tsx, which mirrors
 *  this geometry inline so the nav R renders in real Fraunces).
 *
 *  radius — corner radius in viewBox units. 22.5 ≈ the iOS squircle; pass 0
 *  for surfaces that apply their own mask (apple-touch icon, App Store asset).
 *  px — optional intrinsic width/height attrs (rasterizers size from these).
 */
export function frameMarkSvg(radius: number, px?: number): string {
  const dims = px ? ` width="${px}" height="${px}"` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"${dims}>
  <rect width="100" height="100" rx="${radius}" fill="#F7F3EC"/>
  <text x="50" y="69" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="54" fill="#2E2A26">R</text>
  <path d="M21 35 L21 21 L35 21" fill="none" stroke="#B5654A" stroke-width="6" stroke-linecap="round"/>
  <path d="M79 65 L79 79 L65 79" fill="none" stroke="#B5654A" stroke-width="6" stroke-linecap="round"/>
</svg>`;
}
