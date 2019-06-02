var express = require('express');
var router = express.Router();

const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyBIl1HvOZG1Fat6oIRNj8lRpQb2CdrKAww",
  Promise: Promise
});

router.get('/autocomplete', async function(req, res, next) {
  if (!req.query.input) {
    next(new Error("The query 'input' is not specified!"));
    return;
  }
  let query = {
    input: req.query.input,
    sessiontoken: "1f894b28-f3d3-4b1f-bc7d-a3230eb1545b",
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

module.exports = router;
