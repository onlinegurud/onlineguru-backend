const { update } = require("../service/update");

exports.UpdateTeacher = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  const updateQuery = {
    table: "teachers",
    setfield: [],
    condition: [`Email='${req.body.tokenEmail}'`],
  };

  //    if(req.body.Password ){

  if (req.body.Name != undefined) {
    updateQuery.setfield.push(`Name='${req.body.Name}'`);
  }
  if (req.body.prefer_start_Time != undefined) {
    updateQuery.setfield.push(
      `prefer_start_Time='${req.body.prefer_start_Time}'`
    );
  }
  if (req.body.prefer_end_Time != undefined) {
    updateQuery.setfield.push(`prefer_end_Time='${req.body.prefer_end_Time}'`);
  }
  if (req.body.gender != undefined) {
    updateQuery.setfield.push(`gender='${req.body.gender}'`);
  }
  if (req.body.image != undefined) {
    updateQuery.setfield.push(`image='${req.body.image}'`);
  }
  if (req.body.yearsofexperience != undefined) {
    updateQuery.setfield.push(
      `yearsofexperience='${req.body.yearsofexperience}'`
    );
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
        statusMessage: "Teacher successfully updated",
        status: true,
      });
      res.send({
        statusMessage: "Teacher successfully updated",
        status: true,
      });
    }
  });
};
