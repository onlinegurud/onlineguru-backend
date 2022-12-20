const { select } = require("../service/select");
const { update } = require("../service/update");

exports.classResponse = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  if (req.body.classid === undefined || req.body.response === undefined) {
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
          if (classresult[0].status == 0) {
            const updateQuery = {
              table: "classes",
              setfield: [req.body.response === 1 ? "status=1" : req.body.response === 2?"status=2":"status=4"],
              condition: [`classes_id='${req.body.classid}'`],
            };
            update(updateQuery, async (err, result) => {
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
              statusMessage: "already responsed",
              status: false,
            });
            res.send({
              statusMessage: "already responsed",
              status: false,
            });
          }
        }
      }
    });
  }
};
