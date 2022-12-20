const { update } = require("../service/update");

exports.UpdatePrice = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  const updateQuery = {
    table: "classrooms",
    setfield: [],
    condition: [`classroom_id='${req.body.classroom_id}'`],
  };

  //    if(req.body.Password ){

  if (req.body.credit != undefined) {
    updateQuery.setfield.push(`credit='${req.body.credit}'`);
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
        statusMessage: "credit successfully updated",
        status: true,
      });
      res.send({
        statusMessage: "credit successfully updated",
        status: true,
      });
    }
  });
};
