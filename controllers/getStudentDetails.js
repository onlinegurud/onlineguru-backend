const { select } = require("../service/select");

exports.GetStudentDetails = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  let condition = {
    subject:
      "`student_id`,`user_id`, `FirstName`, `Email`, `LastName`, `Standard`, `Board`,  `phno`,`demo`, `Address`, `district`, `city`, `country`,`state`,`postal_code`",
    table: "students",
    condition: [`Email="${req.body.tokenEmail}"`],
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
      if (result.length != 0) {
        console.log(`[+]  `, {
          result: result[0],
          status: true,
        });
        res.send({
          result: result[0],
          status: true,
        });
      } else {
        console.log(`[-]  `, {
          statusMessage: "invalid details",
          status: false,
        });
        res.send({
          statusMessage: "invalid details",
          status: false,
        });
      }
    }
  });
};
