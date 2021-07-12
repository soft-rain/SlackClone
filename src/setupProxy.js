const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      // target: "https://slack-clone-0.herokuapp.com",
      target: "http://90804cc2bd5f.ngrok.io/",
      changeOrigin: true,
    })
  );
};
