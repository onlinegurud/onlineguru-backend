const { update } = require("../../service/update");

exports.UpdateAdmin = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  const updateQuery = {
    table: "admins",
    setfield: [],
    condition: [`Email='${req.body.tokenEmail}'`],
  };

  //    if(req.body.Password ){

  if (req.body.Name != undefined) {
    updateQuery.setfield.push(`Name='${req.body.Name}'`);
  }
  if (req.body.phno != undefined) {
    updateQuery.setfield.push(`Phno='${req.body.phno}'`);
  }
  if (req.body.Address != undefined) {
    updateQuery.setfield.push(`Address='${req.body.Address}'`);
  }
  if (req.body.district != undefined) {
    updateQuery.setfield.push(`district='${req.body.district}'`);
  }
  if (req.body.city != undefined) {
    updateQuery.setfield.push(`city='${req.body.city}'`);
  }
  if (req.body.country != undefined) {
    updateQuery.setfield.push(`country='${req.body.country}'`);
  }
  if (req.body.state != undefined) {
    updateQuery.setfield.push(`state='${req.body.state}'`);
  }
  if (req.body.postal_code != undefined) {
    updateQuery.setfield.push(`postal_code=${req.body.postal_code}`);
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
        statusMessage: "Admin successfully updated",
        status: true,
      });
      res.send({
        statusMessage: "Admin successfully updated",
        status: true,
      });
    }
  });
};
