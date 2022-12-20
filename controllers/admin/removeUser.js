const { select } = require("../../service/select");
const { update } = require("../../service/update");

exports.removeUser = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  select(
    {
      subject: "Status,Position",
      table: "users",
      condition: [`Email="${req.body.Email}"`],
    },
    async (err, result) => {
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
        if (result.length == 0) {
          console.log(`[-]  `, {
            statusMessage: "wrong Email",
            status: false,
          });
          res.send({
            statusMessage: "Wrong Email",
            status: false,
          });
        } else {
          if (result[0].Status == 0) {
            console.log(`[-]  `, {
              statusMessage: "User already removed",
              status: false,
            });
            res.send({
              statusMessage: "User already removed",
              status: false,
            });
          } else {
            if (result[0].Position < 2) {
              const updateQuery = {
                table: "users",
                setfield: [],
                condition: [`Email='${req.body.Email}'`],
              };

              updateQuery.setfield.push(`Status='${0}'`);

              await update(updateQuery, async (err, result) => {
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
                  console.log(`[-]  `, {
                    statusMessage: "User successfully removed",
                    status: true,
                  });
                  res.send({
                    statusMessage: "User successfully removed",
                    status: true,
                  });
                }
              });
            } else {
              console.log(`[-]  `, {
                statusMessage: "You need access",
                status: false,
              });
              res.send({
                statusMessage: "You need access",
                status: false,
              });
            }
          }
        }
      }
    }
  );
};
