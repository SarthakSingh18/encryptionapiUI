const express = require("express");
const router = express.Router();
const getKey = require("../js/getKey");
const mailing = require("../js/mailing");
const checkEmail = require("../js/checkEmail");
const { redishPushKey } = require("../js/redisPush");
router.post("/", (req, res, next) => {
  var key;
  checkEmail
    .checkEmail(req)
    .then(() => {
      return getKey.getKey();
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    })
    .then((rand) => {
      key=rand;
      return mailing.mailing(req, rand);
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    })
    .then(() => {
      redishPushKey(key);
      res.render("data", {
        title: "Success",
        data: "Registered Check you email for api Key",
      });
     
    })
    .catch((error) => {
      return Promise.reject(error);
    })
    .catch((error) => {
      res.render("data", { title: "Error", data: error });
    });
});
module.exports = router;
