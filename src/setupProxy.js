const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
<<<<<<< HEAD
      target: "https://slack-clone-0.herokuapp.com",
=======
      target: 'https://slack-clone-0.herokuapp.com',
>>>>>>> 938f508e2b6f25febc54bd17f4e2bbed98dc1c03
      changeOrigin: true,
    })
  );
};
