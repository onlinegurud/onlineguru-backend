const { select } = require("../service/select");
const { update } = require("../service/update");
const { sendRating } = require("./sendRatingByMail");

exports.classCompleteResponse = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  if (req.body.classid === undefined) {
    console.log(`[-]  `, {
      statusMessage: "All fields are required",
      status: false,
    });
    res.send({
      statusMessage: "All fields are required",
      status: false,
    });
  } else {
    const selectQuery = {
      subject: "*",
      table: "classes",
      condition: [`classes_id=${req.body.classid}`],
    };
    select(selectQuery, async (err, classresult) => {
      console.log(classresult);
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
        if (classresult.length === 0) {
          console.log(`[-]  `, {
            statusMessage: "invalid class id",
            status: false,
          });
          res.send({
            statusMessage: "invalid class id",
            status: false,
          });
        } else {
          if (classresult[0].status === 1) {
            const updateQuery = {
              table: "classes",
              setfield: ["status=3"],
              condition: [`classes_id='${req.body.classid}'`],
            };
            update(updateQuery, async (err, updateresult) => {
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
                sendRating(classresult);
                console.log(`[+]  `, {
                  statusMessage: "response successfully updated",
                  status: true,
                });
                res.send({
                  statusMessage: "response successfully updated",
                  status: true,
                });
              }
            });
          } else {
            console.log(`[-]  `, {
              statusMessage: "already responsed (or) rejected",
              status: false,
            });
            res.send({
              statusMessage: "already responsed (or) rejected",
              status: false,
            });
          }
        }
      }
    });
  }
};
