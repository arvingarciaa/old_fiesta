module.exports = {
  mongodb: {
    url: 'mongodb://127.0.0.1:27017/technology_db'
  },
  secretKey: 'd0stpc44rrdf13$t4',
  cors: function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods","POST, GET, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
  }
};
