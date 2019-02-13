const req = require.context('.', true, /.+Page\.js$/);

req.keys().forEach(key => {
  const pageName = key.replace(/^.+\/(.+)Page\.js/, '$1Page');
  if (req(key) && req(key).default) {
    const Page = req(key).default;
    module.exports[pageName] = Page;
  }
});
