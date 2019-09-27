module.exports = options => {
    return async function svgVerify(ctx, next) {
        if (ctx.request.query.svgurl === undefined
            || ctx.request.query.w === undefined
            || ctx.request.query.h === undefined) {
            ctx.body = "parameter error ！";
            return;
        }
        await next();
    };
};