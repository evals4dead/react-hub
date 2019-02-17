const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const apiRouter = require('./router');

const app = new Koa();
const router = new Router();

router.use('/api', apiRouter.routes());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('app is listening port', 4000);
});
