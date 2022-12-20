const { update } = require("../service/update");

exports.UpdateStatus = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  const updateQuery = {
    table: "classrooms",
    setfield: [],
    condition: [`classroom_id='${req.body.classroom_id}'`],
  };



  if (req.body.status != undefined) {
    updateQuery.setfield.push(`status='${req.body.status}'`);
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
        statusMessage: "status successfully updated",
        status: true,
      });
      res.send({
        statusMessage: "status successfully updated",
        status: true,
      });
    }
  });
};
