var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://stevenisbell@localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({
    connectionString: connString
  },
  function(err, localdb) {
    db = localdb;
    app.set('db', db);

    app.get('/api/users', function(req, res, next) {
      db.get_all_users(function(err, resp) {
        if (err) {
          res.json(err);
        }
        res.json(resp);
      });
    });

    app.get('/api/vehicles', function(req, res, next) {
      db.get_all_vehicles(function(err, resp) {
        if (err) {
          res.json(err);
        }
        res.json(resp);
      });
    });
    app.post('/api/users', function(req, res, next) {
      db.create_user([req.body.first_name, req.body.last_name, req.body.email], function(err, resp) {
        if (err) {
          res.json(err);
        }
        res.status(200).json('Success!');
      });
    });

    app.post('/api/vehicles', function(req, res, next) {
      db.create_vehicle([req.body.make, req.body.model, req.body.year, req.body.owner_id],
        function(err, resp) {
          if (err) {
            res.json(err);
          }
          res.status(200).json('Success!');
        });
    });

    app.get('/api/user/:userId/vehiclecount', function(req, res, next) {
      db.vehicle_count(Number(req.params.userId), function(err, resp) {
        if (err) {
          res.json(err);
        }
        res.status(200).json(resp);
      });
    });

    app.get('/api/user/:userId/vehicle', function(req, res, next) {
      db.get_all_user_vehicles(Number(req.params.userId), function(err, resp) {
        if (err) {
          res.json(err);
        }
        res.status(200).json(resp);
      });
    });

    app.get('/api/vehicle', function(req, res, next) {
      if (req.query.email) {
        db.get_all_user_vehicles_by_email(req.query.email, function(err, resp) {
          if (err) {
            res.json(err);
          }
          res.status(200).json(resp);
        });
      } else if (req.query.userFirstStart) {
        db.get_all_vehicles_by_user_letters(req.query.userFirstStart, function(err, resp) {
          if (err) {
            res.json(err);
          }
          res.status(200).json(resp);
        });
      }
    });

    app.get('/api/newervehiclesbyyear', function(req, res, next) {
      db.get_newer_vehicles(function(err, resp) {
        if (err) {
          res.json(err);
        }
        res.status(200).json(resp);
      });
    });

    app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res, next) {
      db.update_ownership([Number(req.params.vehicleId), Number(req.params.userId)], function(err, resp) {
        if (err) {
          res.json(err);
        }
        res.status(200).json('Success!');
      });
    });

    app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res, next) {
      db.destroy_ownership([Number(req.params.userId), Number(req.params.vehicleId)], function(err, resp) {
        if (err) {
          res.json(err);
        }
        res.status(200).json('Success!');
      });
    });

    app.delete('/api/vehicle/:vehicleId', function(req, res, next) {
      db.destroy_vehicle(Number(req.params.vehicleId), function(error, response) {
        if (error) {
          res.json(err);
        }
        res.status(200).json('Success!');
      });
    });

  });

app.listen('3000', function() {
  console.log("Successfully listening on : 3000");
});

module.exports = app;
