const { update } = require("../service/update");

exports.UpdateBalance = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  const updateQuery = {
    table: "balance",
    setfield: [],
    condition: [`user_id='${req.body.user_id}'`],
  };

  //    if(req.body.Password ){

  if (req.body.user_id != undefined) {
    updateQuery.setfield.push(`user_id='${req.body.user_id}'`);
  }

  if (req.body.balance != undefined) {
    updateQuery.setfield.push(`balance='${req.body.balance}'`);
  }
  
  await update(updateQuery, async (err, result) => {
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
      console.log(`[+]  `, {
        statusMessage: "balance successfully updated",
        status: true,
      });
      res.send({
        statusMessage: "balance successfully updated",
        status: true,
      });
    }
  });
};
