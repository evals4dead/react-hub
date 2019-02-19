module.exports.accessTokenMiddleware = async (ctx, next) => {
  try {
    const accessToken = ctx.cookies.get('accessToken');
    if (!accessToken) {
      //   console.log('hello!');
      return next();
    }
    ctx.request.accessToken = accessToken;
    return next();
  } catch (e) {
    console.log(e);
  }
};
