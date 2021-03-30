const express = require("express");
const random = require("randomstring");
const router = express.Router();
const mongodb = require("mongodb");
const Mongoclient = mongodb.MongoClient;
module.exports = {
  getKey: function () {
    return new Promise(async (resolve, reject) => {
      try {
        const string = random.generate(20);
        console.log(string);
        checkKey(string)
          .then(() => {
            resolve(string);
          })
          .catch(() => {
            reject();
          });
      } catch (e) {
        reject();
      }
    });
  },
};
function checkKey(key) {
  return new Promise(async (resolve, reject) => {
    try {
      const client = await Mongoclient.connect(
        "mongodb+srv://root:NAyxFXlSoOaliUFX@cluster0-3fupj.mongodb.net/test?retryWrites=true&w=majority"
      );
      const db = client.db("api");
      const collection = db.collection("apiKeys");
      const checkkey = await collection.findOne({ apiKey: key });
      if (checkkey == null) {
        const result = await collection.insertOne({ apiKey:key });
        if (result == null) {
          console.log("Cant insert in mongo");
          reject("error while saving in mongo ");
          client.close();
        } else {
          resolve();
          client.close();
        }
      } else {
        console.log("update random function");
        reject("error in api key generator please try later");
        client.close();
      }
    } catch (e) {
      reject("server error");
      client.close();
    }
  });
}
