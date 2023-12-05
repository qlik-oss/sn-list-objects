/**
 * Run this on small devices to reset the zoom. Required when focusing
 * an input field and the browser auto zooms the page. Browsers do not
 * expose any API for handling this currently.
 */
export default function resetZoom() {
  const viewportMetaTag = document.querySelector('meta[name="viewport"]');
  if (viewportMetaTag instanceof HTMLMetaElement) {
    viewportMetaTag.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
  }
}
