const { Router } = require("express");
// import all routers;
const productRouter = require("./product.js");
const userRouter = require("./users.js");
const orderRouter = require("./order.js");
const authRouter = require("./auth.js");
const userSession = require("./userSession");
const router = Router();
const mailgun = require("./mailgun");

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/", userSession);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/auth", authRouter);

router.post("/sendEmail", async (req, res, next) => {
  try {
    await mailgun.send(req.body.email, req.body.name, req.body.direccion);
    res.send("Email enviado");
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});
module.exports = router;
