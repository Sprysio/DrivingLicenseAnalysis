require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const sequelize = require('./db');
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const dataRoutes = require("./routes/data")
const tokenVerification = require('./middleware/tokenVerification')
const client = require('prom-client');
const register = new client.Registry()

const httpRequestDurationMilliseconds = new client.Histogram({
  name: 'http_request_duration_milliseconds',
  help: 'Duration of HTTP requests in milliseconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000] // Define buckets for latency
});
register.registerMetric(httpRequestDurationMilliseconds);

//middleware
app.use(express.json())
app.use(cors())

app.get("/api/data/",tokenVerification)
app.get("/api/data/download-json",tokenVerification)

app.use((req, res, next) => {
  const start = Date.now();
  const route = req.originalUrl.split('?')[0];
  res.on('finish', () => {
    const duration = Date.now() - start;
    httpRequestDurationMilliseconds
      .labels(req.method, route, res.statusCode)
      .observe(duration);
  });
  next();
});

app.get('/metrics', (req,res) => {
  res.setHeader('Content-Type',register.contentType)
  register.metrics().then(data => res.send(data));
})
app.get('/api/health', ((req, res) => {
  res.status(200).json({ "status": "ok" })
}));


app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/data", dataRoutes)

const port = process.env.PORT || 8888

sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });