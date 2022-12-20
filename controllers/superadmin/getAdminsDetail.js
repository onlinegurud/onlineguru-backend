const { select } = require("../../service/select");

exports.GetAdminsDetails = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  let condition = {
    subject:
      "`admin_id`,`user_id`,`Email`,`Name`,`Phno`,`Address`,`district`,`city`,`country`,`state`,`postal_code`",
    table: "admins",
    condition: [
      req.body.user_id != undefined ? `user_id=${req.body.user_id}` : true,
      req.body.admin_id != undefined
        ? `teacher_id=${req.body.teacher_id}`
        : true,
      req.body.Name != undefined ? `Name=${req.body.Name}` : true,
      req.body.phno != undefined ? `phno=${req.body.phno}` : true,
      req.body.Email != undefined ? `Email=${req.body.Email}` : true,
      req.body.Address != undefined ? `Address=${req.body.Address}` : true,
      req.body.district != undefined ? `district=${req.body.district}` : true,
      req.body.City != undefined ? `City=${req.body.City}` : true,
      req.body.state != undefined ? `state=${req.body.state}` : true,
      req.body.country != undefined ? `country=${req.body.country}` : true,
      req.body.postal_code != undefined
        ? `postal_code=${req.body.postal_code}`
        : true,
    ],
  };
  await select(condition, async (err, result) => {
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
        result,
        status: true,
      });
      res.send({
        result,
        status: true,
      });
    }
  });
};
