const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://b454-222-107-16-12.ngrok.io/",
      changeOrigin: true,
    })
  );
};
