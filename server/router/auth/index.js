const Router = require('koa-router');
const authCtrl = require('./auth.ctrl');

const router = new Router();

router.post('/login', authCtrl.login);

module.exports = router;