const { update } = require("../service/update");

exports.UpdateClass = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  const updateQuery = {
    table: "classes",
    setfield: [],
    condition: [`classes_id='${req.body.classes_id}'`],
  };

  //    if(req.body.Password ){

  if (req.body.Link != undefined) {
    updateQuery.setfield.push(`Link='${req.body.Link}'`);
  }else{

    updateQuery.setfield.push(`Link ='${'wait'}'`);
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
        statusMessage: "class link successfully updated",
        status: true,
      });
      res.send({
        statusMessage: "class link successfully updated",
        status: true,
      });
    }
  });
};
