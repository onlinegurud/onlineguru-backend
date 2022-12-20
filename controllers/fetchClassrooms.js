const { select } = require("../service/select");

exports.fetchClassroom = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  if (req.body.tokenPosition == 0) {

    let studentQuery2 = {
      subject: "*",
      table: "students",
      condition: [
        `Email="${req.body.tokenEmail}"`,
        `user_id=${req.body.tokenId}`,
      ],
    };
  
    await select(studentQuery2, async (err, studentResult) => {

      req.body.tokenId = studentResult[0].student_id;

      let Query = {
        subject:
          "x.id_student,y.teacher_id,x.classroom_id,x.subject,x.status,x.credit,y.Name,y.prefer_start_Time,y.prefer_end_Time,y.gender,y.image,y.yearsofexperience,y.Email",
        table: "classrooms x,teachers y",
        condition: [
          `x.id_student=${req.body.tokenId}`,
          `x.id_teacher=y.teacher_id`,
        ],
      };
      await select(Query, async (err, result) => {
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
            data: result,
            statusMessage: "classroom data fetched",
            status: true,
          });
          res.send({
            data: result,
            statusMessage: "classroom data fetched",
            status: true,
          });
        }
      });

    });



    
  } else if (req.body.tokenPosition == 1) {

    
    let Query = {
      subject:
        "x.subject,x.classroom_id,x.status,x.credit,y.student_id,y.FirstName,y.Email,y.LastName,y.Standard,y.Board",
      table: "classrooms x,students y",
      condition: [
        `x.id_teacher=${req.body.tokenId}`,
        `x.id_student=y.student_id`,
      ],
    };
    await select(Query, async (err, result) => {
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
          data: result,
          statusMessage: "classroom data fetched",
          status: true,
        });
        res.send({
          data: result,
          statusMessage: "classroom data fetched",
          status: true,
        });
      }
    });
  }
};
