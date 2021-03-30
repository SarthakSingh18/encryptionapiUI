const express = require("express");
const mongodb = require("mongodb");
const Mongoclient = mongodb.MongoClient;
module.exports = {
  checkEmail: async function (req) {
    return new Promise(async (resolve, reject) => {
      try {
        const client = await Mongoclient.connect(
          "mongodb+srv://root:NAyxFXlSoOaliUFX@cluster0-3fupj.mongodb.net/test?retryWrites=true&w=majority"
        );
        const db = client.db("api");
        const collection = db.collection("users");
        const checkkey = await collection.findOne({ email: req.body.email });
        if (checkkey == null) {
          const result = await collection.insertOne({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
          });
          if (result == null) {
            console.log("Cant insert in mongo ");
            reject("Error while saving details to database");
            client.close();
          } else {
            resolve();
            client.close();
          }
        } else {
          console.log(`Record exist for ${req.body.email}`);
          reject(`Record exist for ${req.body.email}`);
          client.close();
        }
      } catch (e) {
        reject("Server Error Please try later");
        console.log(e);
      }
    });
  },
};
