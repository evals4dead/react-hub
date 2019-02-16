const req = require.context('.', true, /.+Page\.jsx$/);

req.keys().forEach(key => {
  const pageName = key.replace(/^.+\/(.+)Page\.jsx/, '$1Page');
  if (req(key) && req(key).default) {
    const Page = req(key).default;
    module.exports[pageName] = Page;
  }
});
