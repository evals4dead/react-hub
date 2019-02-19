const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const serve = require('koa-static');
const fs = require('fs');
const path = require('path');
const ssr = require('./ssr/render');

const apiRouter = require('./router');
const { accessTokenMiddleware } = require('./lib/token');

const app = new Koa();
const router = new Router();

const reactBuildDir = path.join(__dirname, '../build');

router.use('/api', apiRouter.routes());
// router.get('/', ssr);

app.use(bodyParser());
app.use(accessTokenMiddleware);

app.use(router.routes()).use(router.allowedMethods());
app.use(serve(reactBuildDir));
console.log('at', app.context.state);
app.use(ssr);
// app.use(ctx => {
//   ctx.body = indexHtml;
// });

app.listen(4000, () => {
  console.log('app is listening port', 4000);
});
