const path = require('path');
const crawler = require('../Crawler/index');
const express = require("express");
const cron = require('node-cron');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

  dotenv.config();


  const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 5000, // Limit each IP to 50 requests per `window` (here, per 15 minutes)
    message: "Too many API requests, please wait 5 minutes and try again later.",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  const PORT = process.env.PORT || 3001;


    cron.schedule("*/2 * * * *",async ()=>{
      await crawler.crawl();
    });


  const app = express();
  app.use(cors({ origin: 'http://localhost:4200' }));
  app.use(express.json());
  app.use(express.static(path.resolve(__dirname, '../Frontend-Angular/dist/frontend')));

  mongoose.connect(process.env.CONNSTRING);
  console.log("Connected to DB...");


  app.use('/api/v1', limiter);

  app.use('/api/v1/calls', require('./routes/calls'));
  // app.use('/api/v1/status', require('./routes/status'));


  // All other GET requests not handled before will return our React app
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../Frontend-Angular/dist/frontend', 'index.html'));
  });
  // Handle GET requests to /api route
  app.get("/api", (req, res) => {
    res.json({ message: "This is not the endpoint you are looking for... *Hand waves in front of face*" });
  });

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
