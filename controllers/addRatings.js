const { InsertInRatingTableQuery } = require("../database/model/insertTable");
const { insert } = require("../service/insert");
const { select } = require("../service/select");

exports.AddRating = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  if (
    req.body.id_student == undefined ||
    req.body.id_teacher == undefined ||
    req.body.ratings == undefined ||
    req.body.comments == undefined ||
    req.body.to == undefined ||
    req.body.id_classes == undefined
  ) {
    console.log(`[-]  `, {
      statusMessage: "All fields are required",
      status: false,
    });
    res.send({
      statusMessage: "All feilds are required",
      status: false,
    });
  } else {
    let selectQuery = {
      subject: "*",
      table: "classes",
      condition: [`classes_id=${req.body.id_classes}`],
    };

    select(selectQuery, (err, result) => {
      console.log(result);
      if (err) {
        console.log(`[-]  `, {
          error: err,
          statusMessage: "Rating Registration failed",
          status: false,
        });
        res.send({
          error: err,
          statusMessage: "Rating Registration failed",
          status: false,
        });
      } else if (result.length === 0) {
        console.log(`[-]  `, {
          statusMessage: "invalid class id",
          status: true,
        });
        res.send({
          statusMessage: "invalid class id",
          status: true,
        });
      } else {
        insert(
          InsertInRatingTableQuery(),
          "ratings",
          [
            req.body.id_student,
            req.body.id_teacher,
            req.body.ratings,
            req.body.comments,
            req.body.to,
            req.body.id_classes,
          ],
          (err, result) => {
            if (!err) {
              console.log(`[+]  `, {
                statusMessage: "Rating Registration succeded",
                status: true,
              });
              res.send({
                statusMessage: "Rating Registration succeded",
                status: true,
              });
            } else {
              console.log(`[+]  `, {
                error: err,
                statusMessage: "Rating Registration failed",
                status: false,
              });
              res.send({
                error: err,
                statusMessage: "Rating Registration failed",
                status: false,
              });
            }
          }
        );
      }
    });
  }
};
