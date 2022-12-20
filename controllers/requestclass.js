const { InsertInClassTableQuery } = require("../database/model/insertTable");
const { select } = require("../service/select");
const { insert } = require("../service/insert");
const { SendMail } = require("../service/sendMail");

exports.requestClass = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  if (req.body.tokenPosition === 0) {
    if (
      req.body.teacher_id == undefined ||
      req.body.democlass == undefined ||
      req.body.starttime == undefined ||
      req.body.topic == undefined
    ) {
      console.log(`[-]  `, {
        statusMessage: "All fields are required",
        status: false,
      });
      res.send({
        statusMessage: "All fields are required",
        status: false,
      });
    } else {
      let teacherQuery = {
        subject: "*",
        table: "teachers x,users y",
        condition: [
          `x.teacher_id=${req.body.teacher_id}`,
          `x.user_id=y.user_id`,
        ],
      };

      await select(teacherQuery, async (err, teacherResult) => {
        //checking wheather teache ris present  is not
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
                if (req.body.democlass == true) {
                  let studentQuery = {
                    subject: "*",
                    table: "students",
                    condition: [
                      `Email="${req.body.tokenEmail}"`,
                      `student_id=${req.body.tokenId}`,
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
                      let name =
                        studentResult[0].FirstName +
                        " " +
                        studentResult[0].LastName;
                      let standard = studentResult[0].Standard;
                      let board = studentResult[0].Board;
                      if (studentResult[0].demo == 0) {
                        console.log(`[-]  `, {
                          statusMessage: "Your demo sessions completed",
                          status: false,
                        });
                        res.send({
                          statusMessage: "Your demo sessions completed",
                          status: false,
                        });
                      } else {
                        await insert(
                          InsertInClassTableQuery(),
                          "classes",
                          [
                            null,
                            req.body.tokenId,
                            req.body.teacher_id,
                            req.body.starttime,
                            0,
                            req.body.topic,
                            new Date(),
                            true,
                            req.body.Link,
                          ],
                          async (err, result) => {
                            if (!err) {
                              //mail: class creation request sent to teacher with student detials(name, std, board, topic)

                              // await SendMail(
                              //   teacherResult[0].Email,
                              //   "Demo class request",
                              //   `New demo class request from ${name} of ${standard}, ${board} on the topic ${req.body.topic} at ${req.body.starttime}`
                              // );
                              console.log(`[+]  `, {
                                statusMessage: "Class creation succeeded",
                                status: true,
                              });
                              res.send({
                                statusMessage: "Class creation succeeded",
                                status: true,
                              });
                            } else {
                              console.log(`[-]  `, {
                                err: err,
                                statusMessage: "error in insert of class",
                                status: false,
                              });
                              res.send({
                                statusMessage: "error in insert of class",
                                status: false,
                              });
                            }
                          }
                        );
                      }
                    }
                  });
                } else {
                  //for normal classroom - create class with the given teacher id
                  if (req.body.classroom_id === undefined) {
                    console.log(`[-]  `, {
                      statusMessage: "All fields are required",
                      status: false,
                    });
                    res.send({
                      statusMessage: "All fields are required",
                      status: false,
                    });
                  } else {
                    let Query = {
                      subject:
                        "x.subject,y.FirstName,y.Email,y.LastName,y.Standard,y.Board",
                      table: "classrooms x,students y",
                      condition: [
                        `x.id_teacher=${req.body.teacher_id}`,
                        `x.id_student=y.student_id`,
                        `x.id_student=${req.body.tokenId}`,
                        `x.classroom_id=${req.body.classroom_id}`,
                      ],
                    };
                    await select(Query, async (err, classroomResult) => {
                      console.log(classroomResult);
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
                        if (classroomResult.length === 0) {
                          console.log(`[-]  `, {
                            statusMessage: "mismatched classroom data",
                            status: false,
                          });
                          res.send({
                            statusMessage: "mismatched classroom data",
                            status: false,
                          });
                        } else {
                          let name =
                            classroomResult[0].FirstName +
                            " " +
                            classroomResult[0].LastName;
                          let standard = classroomResult[0].Standard;
                          let board = classroomResult[0].Board;
                          await insert(
                            InsertInClassTableQuery(),
                            "classes",
                            [
                              req.body.classroom_id,
                              req.body.tokenId,
                              req.body.teacher_id,
                              req.body.starttime,
                              0,
                              req.body.topic,
                              new Date(),
                              false,
                              req.body.Link,
                              req.body.credit,
                            ],

                            async (err, result) => {
                              if (!err) {
                                await SendMail(
                                  teacherResult[0].Email,
                                  " new class request ",
                                  `New class request from ${name} of ${standard}, ${board} on the topic ${req.body.topic} at ${req.body.starttime}`
                                );
                                console.log(`[+]  `, {
                                  statusMessage: "Class creation succeeded",
                                  status: true,
                                });
                                res.send({
                                  statusMessage: "Class creation succeeded",
                                  status: true,
                                });
                              } else {
                                console.log(`[-]  `, {
                                  err: err,
                                  statusMessage: "error in insert of class",
                                  status: false,
                                });
                                res.send({
                                  statusMessage: "error in insert of class",
                                  status: false,
                                });
                              }
                            }
                          );
                        }
                      }
                    });
                  }
                }
              }
            });
          }
        }
      });
    }
  } else {
    console.log(`[-]  `, {
      statusMessage: "Teacher can't access class",
      status: false,
    });
    res.send({
      statusMessage: "Teacher can't access class",
      status: false,
    });
  }
};
