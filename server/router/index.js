const Router = require('koa-router');
const auth = require('./auth');
const user = require('./user');
const repo = require('./repo');
const search = require('./search');

const router = new Router();

router.use('/auth', auth.routes());
router.use('/user', user.routes());
router.use('/repo', repo.routes());
router.use('/search', search.routes());

module.exports = router;
