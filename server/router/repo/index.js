const Router = require('koa-router');
const repoCtrl = require('./repo.ctrl');

const router = new Router();

router.get('/:username', repoCtrl.repoList);
router.get('/:username/:reponame', repoCtrl.repo);

module.exports = router;
