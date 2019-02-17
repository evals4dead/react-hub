const Router = require('koa-router');
const userCtrl = require('./user.ctrl');

const router = new Router();

router.get('/me', userCtrl.getMyInfo);

module.exports = router;