const Router = require('koa-router');
const authCtrl = require('./auth.ctrl');

const router = new Router();

router.post('/login', authCtrl.login);
router.post('/logout', authCtrl.logout);

module.exports = router;