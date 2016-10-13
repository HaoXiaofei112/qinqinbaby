/**
 * Created by HZJS04-01 on 2016/8/17.
 */


/********************load-modules***********************/
var fs = require('fs');
var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');

var USER_FILE = path.join(__dirname, 'data/user.json');
var PRODUCT_FILE = path.join(__dirname, 'data/product.json');
var CART_FILE = path.join(__dirname, 'data/cart.json');

/********************server-init*******************/

var app = express();
app.set('port', 9999);
app.use('/', express.static(path.join(__dirname, 'www')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post('/api/login', function (req, res) {
    console.log(req.body);
    var user = req.body.user;
    var pw = req.body.password;
    fs.readFile(USER_FILE, function (err, data) {

        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(req.body);
        var counters = JSON.parse(data);
        for (var i = 0; i < counters.length; i++) {
            if (counters[i].name === user && counters[i].password === pw) {
                res.json({
                    ret: true
                });
                return;
            }
        }

        res.json({
            ret: false
        });
    });
});


//checkuser 
app.get('/api/checkuser', function (req, res) {
    var user = req.query.user;
    console.log(user);
    fs.readFile(USER_FILE, function (err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        var registerUsers = JSON.parse(data);
        console.log(registerUsers);

        for (var i = 0; i < registerUsers.length; i++) {
            if (registerUsers[i].name === user) {
                res.json({
                    ret: false
                });
                return;
            }
        }

        res.json({
            ret: true
        });

    })
})

app.post('/api/register', function (req, res) {
    var user = req.body.user;
    var pw = req.body.password;

    fs.readFile(USER_FILE, function (err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        var registerUsers = JSON.parse(data);

        for (var i = 0; i < registerUsers.length; i++) {
            if (registerUsers[i].name === user) {
                res.json({
                    ret: 'false'
                });
                return;
            }
        }

        registerUsers.push({
            name: user,
            password: pw
        });

        fs.writeFile(USER_FILE, JSON.stringify(registerUsers, null, 4), function (err) {
            if (err) {
                console.log(err);
                process.exit(1);
            }

            //res.json({
            //    ret: 'true'
            //});
        })

    });


    fs.readFile(CART_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var cartdata = JSON.parse(data);
        var newDataItem = {
            user: user,
            goods: []
        };
        cartdata.push(newDataItem);
        fs.writeFile(CART_FILE, JSON.stringify(cartdata, null, 4), function (err) {
            // console.log(JSON.stringify(comments));
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json({
                ret: true
            });
        });
    });



})


//get products
app.get("/api/getproduct", function (req, res) {
    //var userName=req.query.name;
    fs.readFile(PRODUCT_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var counters = JSON.parse(data);
        res.json({
            products: counters
        })
    })
})


app.post("/api/addcart", function (req, res) {
    var user = req.body.user;
    var products = req.body.products;
    fs.readFile(CART_FILE, function (err, data) {

        if (err) {
            console.error(err);
            process.exit(1);
        }

        //var counters = JSON.parse(data);
        //for (var i = 0; i < counters.length; i++) {
        //    if (counters[i].user === user) {
        //        counters[i].goods.push(products);
        //        break;
        //    }
        //}

        var counters = JSON.parse(data);
        var isExisted=false;
        for(var i=0;i<counters.length;i++)
        {
            if(counters[i].user===user){
                for(var j=0;j<counters[i].goods.length;j++)
                {
                    if(counters[i].goods[j].type===products.type)
                    {
                        //console.log(counters[i].goods[j].type);
                        //console.log(products.type);
                        counters[i].goods[j].num=parseInt(counters[i].goods[j].num)+parseInt(products.num);
                        isExisted=true;
                        break;
                    }
                }
                if(!isExisted) {
                    counters[i].goods.push(products);
                }
                break;
            }
        }



        fs.writeFile(CART_FILE, JSON.stringify(counters, null, 4), function (err) {
            // console.log(JSON.stringify(comments));
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json({ret: true});
        });
    });

})


app.get("/api/getcart",function(req,res){
    var userName=req.query.user;
    fs.readFile(CART_FILE,function(err,data){
        if(err){
            console.error(err);
            process.exit(1);
        }
        var counters = JSON.parse(data);
        for(var i=0;i<counters.length;i++)
        {
            if(counters[i].user===userName){
                res.json({
                    goods:counters[i].goods
                })
            }
        }
    })
})


app.post("/api/removegoodsfromcart",function(req,res){
    var user=req.body.user;
    var goodsIndex=req.body.goodsIndex;
    fs.readFile(CART_FILE, function (err, data) {

        if (err) {
            console.error(err);
            process.exit(1);
        }

        var counters = JSON.parse(data);
        console.log(counters);
        for(var i=0;i<counters.length;i++)
        {
            if(counters[i].user===user){
                console.log(counters[i].user);
                counters[i].goods.splice(goodsIndex,1);
                console.log(counters[i].goods);
                console.log(JSON.stringify(counters));
                break;
            }
        }
        fs.writeFile(CART_FILE, JSON.stringify(counters, null, 4), function (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json({ret: true});
        });
    });

})

app.listen(app.get('port'), function () {
    console.log('http server:http://localhost:' + app.get('port') + '/');
})





















