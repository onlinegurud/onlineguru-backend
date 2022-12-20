const {
  InsertInPricingTableQuery,
} = require("../../database/model/insertTable");
const { insert } = require("../../service/insert");
const { refreshValues } = require("../getPriceAndProperty");

exports.updatePrice = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  if (
    req.body.standard == undefined ||
    req.body.board == undefined ||
    req.body.credits == undefined ||
    req.body.discounts == undefined
  ) {
    console.log(`[-]  `, {
      statusMessage: "All field are required",
      status: false,
    });
    res.send({
      statusMessage: "All field are required",
      status: false,
    });
  } else {
    insert(
      InsertInPricingTableQuery(),
      "properties",
      [
        req.body.tokenId,
        req.body.standard,
        req.body.board,
        req.body.credits,
        req.body.discounts,
      ],
      (err, result) => {
        if (!err) {
          refreshValues();
          console.log(`[+]  `, {
            statusMessage: "Insertion succeed",
            status: true,
          });
          res.send({
            statusMessage: "Insertion succeed",
            status: true,
          });
        } else {
          console.log(`[-]  `, {
            err,
            statusMessage: "something went wrong",
            status: true,
          });
          res.send({
            err,
            statusMessage: "something went wrong",
            status: true,
          });
        }
      }
    );
  }
};
