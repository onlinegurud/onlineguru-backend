const {
  InsertInClassroomTableQuery,
} = require("../database/model/insertTable");
const { insert } = require("../service/insert");
const { select } = require("../service/select");

exports.createClassroom = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  if (req.body.teacher_id == undefined) {
    console.log(`[-]  `, {
      statusMessage: "All fields are required",
      status: false,
    });
    res.send({
      statusMessage: "All fields are required",
      status: false,
    });
  } else {
    let studentQuery = {
      subject: "*",
      table: "students",
      condition: [
        `Email="${req.body.tokenEmail}"`,
        `user_id=${req.body.tokenId}`,
      ],
    };
    await select(studentQuery, async (err, studentResult) => {
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
        req.body.tokenId = studentResult[0].student_id;

        let teacherQuery = {
          subject: "*",
          table: "teachers x,users y",
          condition: [
            `x.teacher_id=${req.body.teacher_id}`,
            `x.user_id=y.user_id`,
          ],
        };

        await select(teacherQuery, async (err, teacherResult) => {
          //checking wheather teacher is present  is not
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
            if (teacherResult.length === 0 || teacherResult[0].status == 0) {
              console.log(`[-]  `, {
                statusMessage: "Teacher Id mismatched",
                status: false,
              });
              res.send({
                statusMessage: "taecher Id mismatched",
                status: false,
              });
            } else {
              await insert(
                InsertInClassroomTableQuery(),
                "classrooms",
                [
                  req.body.tokenId,
                  // teacherResult[0].subject,
                  req.body.subject,
                  req.body.teacher_id,
                  req.body.status,
                  req.body.credit,
                ],
                async (err, result) => {
                  if (!err) {
                    // await SendMail(
                    //   teacherResult[0].Email,
                    //   "class created",
                    //   `New demo class request from ${name} of ${standard}, ${board} on the topic ${req.body.topic} at ${req.body.starttime}`
                    // );
                    console.log(`[+]  `, {
                      statusMessage: "Classroom creation succeeded",
                      status: true,
                    });
                    res.send({
                      statusMessage: "Classroom creation succeeded",
                      status: true,
                    });
                  } else {
                    console.log(`[-]  `, {
                      err: err,
                      statusMessage: "error in insert of classroom",
                      status: false,
                    });
                    res.send({
                      err: err,
                      statusMessage: "error in insert of classroom",
                      status: false,
                    });
                  }
                }
              );
            }
          }
        });
      }
    });
  }
};
