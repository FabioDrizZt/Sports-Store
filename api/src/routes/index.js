const { Router } = require("express");
// import all routers;
const productRouter = require("./product.js");
const userRouter = require("./users.js");
const orderRouter = require("./order.js");
const authRouter = require("./auth.js");
const userSession = require("./userSession");
const router = Router();
const mailgun = require("../mailgun");
const { User } = require("../db.js");

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
    await mailgun.sendEmail(req.body.email, req.body.name, req.body.addres);
    res.send("Email enviado");
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

router.post("/passwordReset", async (req, res, next) => {
  User.findOne({where: { email: req.body.email }})
    .then(user => {
      mailgun.passwordReset(user.id, user.email);
      res.send("Email enviado");
  }).catch((error) => { res.status(500).send(error); })
});

module.exports = router;