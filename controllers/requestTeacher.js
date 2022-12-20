const { select } = require("../service/select.js");

exports.requestTeacher = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  let condition = [];
  if (req.body.gender != undefined) {
    condition.push(`gender=${req.body.gender}`);
  }
  if (req.body.yearsofexperience != undefined) {
    console.log(req.body.yearsofexperience);
    if (req.body.yearsofexperience < 5) {
      condition.push(`yearsofexperience=${req.body.yearsofexperience}`);
    } else if (req.body.yearsofexperience == 6) {
      condition.push(`yearsofexperience>5`);
    } else {
      console.log(`[-]  `, {
        statusMessage: "years of experience is wrong",
        status: false,
      });
      res.send({
        statusMessage: "years of experience is wrong",
        status: false,
      });
    }
  }
  if (req.body.subject != undefined) {
    condition.push(`subject='${req.body.subject}'`);
  }
  if (req.body.prefer_start_Time != undefined) {
    condition.push(
      `prefer_start_Time >= CAST('${req.body.prefer_start_Time}' AS time)`
    );
  }
  if (req.body.prefer_end_Time != undefined) {
    condition.push(
      `prefer_end_Time <= CAST('${req.body.prefer_end_Time}' AS time)`
    );
  }
  let query = {
    subject:
      "`teacher_id`,`Name`,`subject`,`prefer_start_Time`,`prefer_end_Time`,`gender`,`image`,`yearsofexperience`",
    table: "teachers",
    condition: [...condition],
  };

  await select(query, async (err, result) => {
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
        data: [...result],
        statusMessage: "results fetched",
        status: true,
      });
      res.send({
        data: [...result],
        statusMessage: "results fetched",
        status: true,
      });
    }
  });
};
