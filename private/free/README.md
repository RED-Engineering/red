Downloadable free CAD packages. Not public URLs.

  private/free/{handle}/package.zip

Then in src/content/free-products.ts set:
  downloadPath: "{handle}/package.zip"
  downloadName: "{handle}.zip"

If this object also has a manufactured part, create that product in Shopify with a PHYSICAL variant and the same handle.
