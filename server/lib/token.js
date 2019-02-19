module.exports.accessTokenMiddleware = async (ctx, next) => {
  try {
    const accessToken = ctx.cookies.get('access_token');
    if (!accessToken) {
      //   console.log('hello!');
      return next();
    }
    ctx.request.access_token = accessToken;
    return next();
  } catch (e) {
    console.log(e);
  }
};
