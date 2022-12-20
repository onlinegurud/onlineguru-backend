const { update } = require("../service/update");

exports.UpdateStudent = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  const updateQuery = {
    table: "students",
    setfield: [],
    condition: [`Email='${req.body.tokenEmail}'`],
  };

  //    if(req.body.Password ){

  if (req.body.FirstName != undefined) {
    updateQuery.setfield.push(`FirstName='${req.body.FirstName}'`);
  }
  if (req.body.LastName != undefined) {
    updateQuery.setfield.push(`LastName='${req.body.LastName}'`);
  }
  if (req.body.Standard != undefined) {
    updateQuery.setfield.push(`Standard='${req.body.Standard}'`);
  }
  if (req.body.Board != undefined) {
    updateQuery.setfield.push(`Board='${req.body.Board}'`);
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
        statusMessage: "students successfully updated",
        status: true,
      });
      res.send({
        statusMessage: "students successfully updated",
        status: true,
      });
    }
  });
};
