const { select } = require("../service/select");

let propertyValue = [];
let priceValue = [];

exports.getPropertyValue = () => {
  return propertyValue;
};
exports.getPriceValue = () => {
  return priceValue;
};
exports.refreshValues = () => {
  propertyValue = [];
  priceValue = [];
  let propertyCondition = {
    subject: "*",
    table: "properties",
    condition: [],
    commands: "ORDER BY property_id DESC LIMIT 1",
  };
  select(propertyCondition, (err, result) => {
    if (err) {
      console.log(`[-]  `, {
        error: err,
        statusMessage: "something went wrong",
        status: false,
      });
      res.send({
        error: err,
        statusMessage: "something went wrong",
        status: false,
      });
    } else {
      propertyValue.push(result[0]);
    }
  });

  for (let i = 1; i < 13; i++) {
    for (let j = 1; j < 5; j++) {
      let pricingCondition = {
        subject: "*",
        table: "prices",
        condition: [`standard = ${i}`, `board = ${j}`],
        commands: "ORDER BY price_id DESC",
      };
      select(pricingCondition, (err, result) => {
        if (err) {
          console.log(`[-]  `, {
            error: err,
            statusMessage: "something went wrong",
            status: false,
          });
          res.send({
            error: err,
            statusMessage: "something went wrong",
            status: false,
          });
        } else {
          priceValue.push(result[0]);
        }
      });
    }
  }
};
