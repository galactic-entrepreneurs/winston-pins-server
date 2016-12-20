var express = require('express');
var router = express.Router();
var pool = require('../pool').pool;

/* GET home page. */
router.get('/streets', function (req, res, next) {
  var q = req.query;
  var sqlQuery =
    "SELECT a.address FROM" +
    " gnaf_201611.streets as g ," +
    " gnaf_201611.address_aliases as a" +
    " WHERE ST_Contains(  ST_GeomFromEWKT('POLYGON((" +
    q.turf +
    "))',ST_MakePoint(g.longitude,g.latitude))" +
    " AND " +
    " a.gid = g.gid;";

  // to run a query we can acquire a client from the pool,
  // run a query on the client, and then return the client to the pool
  pool.connect(function (err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }

    client.query(sqlQuery, function (err, result) {
      //err is the error returned from the PostgreSQL server
      //handle the error here
      console.log(sqlQuery);

      if (err) {
        return console.error('error running query', err);
      }

      console.log(result);

      if (result) {
        res.send(result);
        return;
      }
      //output: 1
    });

  });

  //res.send(sqlQuery);
});

module.exports = router;