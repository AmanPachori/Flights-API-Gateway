const express = require("express");
const { rateLimit } = require("express-rate-limit");
const { createProxyMiddleware } = require("http-proxy-middleware");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const serverConfig = require("./config/server-config");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: "draft-7",
});

const app = express();
app.use(limiter);
app.use(
  "/flightsService",
  createProxyMiddleware({
    target: serverConfig.FLIGHT_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/flightsService": "/" },
  })
);
app.use(
  "/bookingService",
  createProxyMiddleware({
    target: serverConfig.BOOKING_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/bookingService": "/" },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
