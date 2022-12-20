const {
  InsertInPropertyTableQuery,
} = require("../../database/model/insertTable");
const { insert } = require("../../service/insert");
const { refreshValues, getPropertyValue } = require("../getPriceAndProperty");

exports.updateProperties = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  if (
    req.body.demo_time == undefined ||
    req.body.session_time == undefined ||
    req.body.creditsperrupee == undefined
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
      InsertInPropertyTableQuery(),
      "properties",
      [
        req.body.demo_time,
        req.body.tokenId,
        req.body.session_time,
        req.body.creditsperrupee,
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
