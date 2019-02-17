const Router = require('koa-router');
const repoCtrl = require('./repo.ctrl');

const router = new Router();

router.get('/', repoCtrl.repoList);

module.exports = router;