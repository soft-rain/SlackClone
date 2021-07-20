const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      // target: "https://slack-clone-0.herokuapp.com",
      target: "http://da8f83b553c5.ngrok.io/",
      changeOrigin: true,
    })
  );
};
