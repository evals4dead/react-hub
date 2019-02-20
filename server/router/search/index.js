const Router = require('koa-router');
const searchCtrl = require('./search.ctrl');

const router = new Router();
router.get(`/users`, searchCtrl.searchUser);

module.exports = router;
