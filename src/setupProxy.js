const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      // target: "https://slack-clone-0.herokuapp.com",
      target: "http://3da28f0b857e.ngrok.io/",
      changeOrigin: true,
    })
  );
};
