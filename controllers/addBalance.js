const { InsertInBalanceTableQuery } = require("../database/model/insertTable");
const { insert } = require("../service/insert");
const { select } = require("../service/select");

exports.AddBalance = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  if (
    req.body.user_id == undefined ||
    req.body.balance == undefined 
    
  ) {
    console.log(`[-]  `, {
      statusMessage: "All fields are required",
      status: false,
    });
    res.send({
      statusMessage: "All feilds are required",
      status: false,
    });
  } else {
    
        insert(
          InsertInBalanceTableQuery(),
          "balance",
          [
            req.body.user_id,
            req.body.balance,
           
          ],
          (err, result) => {
            if (!err) {
              console.log(`[+]  `, {
                statusMessage: "balance inserted succeded",
                status: true,
              });
              res.send({
                statusMessage: "balance inserted succeded",
                status: true,
              });
            } else {
              console.log(`[+]  `, {
                error: err,
                statusMessage: "Rating Registration failed",
                status: false,
              });
              res.send({
                error: err,
                statusMessage: "Rating Registration failed",
                status: false,
              });
            }
          }
        );
      
    
  }
};
