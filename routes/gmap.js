var express = require('express');
var router = express.Router();

const googleMapsClient = require("@google/maps").createClient({
  key: process.env.GOOGLE_API_KEY,
  Promise: Promise
});

router.get('/autocomplete', async function(req, res, next) {
  if (!req.query.input) {
    next(new Error("The query 'input' is not specified!"));
    return;
  }
  let query = {
    input: req.query.input,
    sessiontoken: process.env.GOOGLE_SESSION_TOKEN,
    types: "address"
  };
  try{
    let response = await googleMapsClient.placesAutoComplete(query).asPromise();
    res.setHeader('Content-Type', 'application/json');
    res.json(response.json.predictions);
  } catch (error) {
    next(error);
  }
});

router.get('/geocode', async function(req, res, next) {
  if (!req.query.address) {
    next(new Error("The query 'address' is not specified!"));
    return;
  }
  let query = { address: req.query.address };
  try{
    let response = await googleMapsClient.geocode(query).asPromise();
    res.setHeader('Content-Type', 'application/json');
    res.json(response.json.results);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
