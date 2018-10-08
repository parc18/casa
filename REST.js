var mysql = require("mysql");
var bodyParser  = require("body-parser");
var jwt = require("jsonwebtoken");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
});

    router.post("/users-login",function(req,res){
        var query = "SELECT * FROM ?? where email=? AND password=?";
        console.log(req.body);
        var table = ["casaone_users", req.body.email, req.body.password];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
            console.log(rows);
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                if(!rows.length) res.json({"Error" : true, "Message" : "email/password wrong", });
                else{
                    return res.json({token: jwt.sign({ email : req.body.email, isAdmin : rows[0].isAdmin, userid: rows[0].user_id }, 'RESTFULAPIs')});
                }
            }
        });
    });

    router.get("/all_orders/",function(req,res){
          if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
            console.log(req.headers.authorization);
            jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
              if (!err && decode.isAdmin) {
                    var query = "select * from ??";
                    var table = ["casaone_orders"];
                    query = mysql.format(query,table);
                    console.log(query);
                    connection.query(query,function(err,rows){
                    if(err) {
                        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                    } else {
                        res.json({"Error" : false, "Message" : "Success", "orders" : rows});
                    }
                });
              }else {
                res.json({"Error" : true, "Message" : "Not authorized to perform this task", });
              }

            });
        }else {
            res.json({"Error" : true, "Message" : "Please provide correct Access-token", });
        }

    });
    router.get("/user_order",function(req,res){
          if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
            console.log(req.headers.authorization);
            jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
                console.log(decode);
              if (!err) {
                    var query = "select * from ?? as a inner join ?? as b on a.order_id = b.order_id where a.user_id=? group by a.order_id";
                    var table = ["casaone_orders", "casaone_orders_details", decode.userid];

                    query = mysql.format(query,table);
                    console.log(query);
                    connection.query(query,function(err,rows){
                        console.log(err , 'max');
                    if(err) {
                        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                    } else {
                        res.json({"Error" : false, "Message" : "Success", "orders" : rows});
                    }
                });
              }else {
                res.json({"Error" : true, "Message" : "Not authorized to perform this task", });
              }

            });
        }else {
            res.json({"Error" : true, "Message" : "Please provide correct Access-token", });
        }
    });
    router.get("/order_details/:order_id",function(req,res){
          if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
            console.log(req.headers.authorization);
            jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
                console.log(decode);
              if (!err) {
                    var query = "select * from ?? as a inner join ?? as b on a.order_id = b.order_id where a.user_id=? and a.order_id = ? group by a.order_id";
                    var table = ["casaone_orders", "casaone_orders_details", decode.userid, Number(req.params.order_id)];

                    query = mysql.format(query,table);
                    console.log(query);
                    connection.query(query,function(err,rows){
                        console.log(err);
                    if(err) {
                        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                    } else {
                        res.json({"Error" : false, "Message" : "Success", "orders" : rows});
                    }
                });
              }else {
                res.json({"Error" : true, "Message" : "Not authorized to perform this task", });
              }

            });
        }else {
            res.json({"Error" : true, "Message" : "Please provide correct Access-token", });
        }
    });
}


module.exports = REST_ROUTER;