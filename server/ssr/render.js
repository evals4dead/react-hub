const render = require('./index').default;
const manifest = require('../../build/asset-manifest.json');

function buildHtml({ html, state, error }) {
  const jsKeys = Object.keys(manifest)
    .filter(jsKey => jsKey.match(/.js$/))
    .map(key => {
      if (key === 'service-worker.js') return;
      return `<script src="${manifest[key]}"></script>`;
    })
    .join('\n\t\t');

  const cssKeys = Object.keys(manifest)
    .filter(cssKey => cssKey.match(/.css$/))
    .map(key => {
      return `<link href="${manifest[key]}" rel="stylesheet">`;
    })
    .join('\n\t\t');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <title>React App</title>
        ${cssKeys}
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">${html}</div>
        <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(state)}
        </script>
       ${jsKeys}
    </body>
    </html>
    `;
}

module.exports = async ctx => {
  try {
    const rendered = await render(ctx);
    ctx.body = buildHtml(rendered);
  } catch (e) {
    console.log(e);
    ctx.body = buildHtml({});
  }
};
