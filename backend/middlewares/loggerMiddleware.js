const loggerMiddleware = (app)=>{
    app.use(function(req, res, next) {
        console.log('Bir istek alındı:', req.method, req.url);
        next(); // Sonraki middleware'e devret
    });
}
module.exports = loggerMiddleware;