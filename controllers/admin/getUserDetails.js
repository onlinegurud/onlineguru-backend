const { select } = require("../../service/select");

exports.GetUserDetails = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  if (req.body.position == undefined) {
    console.log(`[-]  `, {
      statusMessage: "position is required",
      status: false,
    });
    res.send({
      statusMessage: "position is required",
      status: false,
    });
  } else {
    let condition = {
      subject:
        req.body.position == 1
          ? "`teacher_id`,`user_id`,`Name`,`subject`,`prefer_start_Time`,`prefer_end_Time`,`gender`,`image`,`yearsofexperience`,`phno`,`Email`,`Address`,`district`,`City`, `state`,`Country`,`postal_code`"
          : "`student_id`,`user_id`, `FirstName`, `Email`, `LastName`, `Standard`, `Board`,  `phno`,`demo`, `Address`, `district`, `city`, `country`,`state`,`postal_code`",
      table: req.body.position == 1 ? "teachers" : "students",
      condition:
        req.body.position == 1
          ? [
              req.body.user_id != undefined
                ? `user_id=${req.body.user_id}`
                : true,
              req.body.teacher_id != undefined
                ? `teacher_id=${req.body.teacher_id}`
                : true,
              req.body.Name != undefined ? `Name=${req.body.Name}` : true,
              req.body.subject != undefined
                ? `subject=${req.body.subject}`
                : true,
              req.body.prefer_start_Time != undefined
                ? `prefer_start_Time >= CAST('${req.body.prefer_start_Time}' AS time)`
                : true,
              req.body.prefer_end_Time != undefined
                ? `prefer_end_Time <= CAST('${req.body.prefer_end_Time}' AS time)`
                : true,
              req.body.gender != undefined ? `gender=${req.body.gender}` : true,
              req.body.image != undefined ? `image=${req.body.image}` : true,
              req.body.yearsofexperience != undefined
                ? `yearsofexperience=${req.body.yearsofexperience}`
                : true,
              req.body.phno != undefined ? `phno=${req.body.phno}` : true,
              req.body.Email != undefined ? `Email=${req.body.Email}` : true,
              req.body.Address != undefined
                ? `Address=${req.body.Address}`
                : true,
              req.body.district != undefined
                ? `district=${req.body.district}`
                : true,
              req.body.City != undefined ? `City=${req.body.City}` : true,
              req.body.state != undefined ? `state=${req.body.state}` : true,
              req.body.country != undefined
                ? `country=${req.body.country}`
                : true,
              req.body.postal_code != undefined
                ? `postal_code=${req.body.postal_code}`
                : true,
            ]
          : [
              req.body.user_id != undefined
                ? `user_id=${req.body.user_id}`
                : true,
              req.body.student_id != undefined
                ? `teacher_id=${req.body.student_id}`
                : true,
              req.body.FirstName != undefined
                ? `FirstName='${req.body.FirstName}'`
                : true,
              req.body.LastName != undefined
                ? `LastName='${req.body.LastName}'`
                : true,
              req.body.Standard != undefined
                ? `Standard ='${req.body.Standard}' `
                : true,
              req.body.Board != undefined
                ? `Board = '${req.body.Board}'`
                : true,
              req.body.demo != undefined ? `demo=${req.body.demo}` : true,
              req.body.phno != undefined ? `phno=${req.body.phno}` : true,
              req.body.Email != undefined ? `Email=${req.body.Email}` : true,
              req.body.Address != undefined
                ? `Address=${req.body.Address}`
                : true,
              req.body.district != undefined
                ? `district=${req.body.district}`
                : true,
              req.body.City != undefined ? `City=${req.body.City}` : true,
              req.body.state != undefined ? `state=${req.body.state}` : true,
              req.body.country != undefined
                ? `country=${req.body.country}`
                : true,
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
  }
};
