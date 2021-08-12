const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      // target: "https://slack-clone-0.herokuapp.com",
      target: "http://172.16.101.28:8080",
      changeOrigin: true,
    })
  );
};
