const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const userRouter = require("./users.js");
const orderRouter = require("./order.js");
const authRouter = require("./auth.js");
const router = Router();

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect('/login');
    }
}

function isAdmin(req, res, next) {
    if(req.user.role === "admin"){
      next();
    } else {
      res.send('Tiene que ser administrador para acceder a esta ruta')
      res.redirect('/login');
    }
  }
// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/admin', isAdmin, isAuthenticated);
router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/orders', orderRouter);
router.use('/auth', authRouter);




module.exports = router;
