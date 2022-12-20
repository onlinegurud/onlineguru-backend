const { select } = require("../../service/select");

exports.checkingStatus = (email) =>
  new Promise((resolve, reject) => {
    console.log("[+] checking status for ", email);
    select(
      {
        subject: "Status",
        table: "users",
        condition: [`Email="${email}"`],
      },
      async (err, result) => {
        if (err) {
          console.log(`[-]  `, {
            error: err,
            statusMessage: "something went wrong",
            status: false,
          });
          reject(err);
        } else {
          if (result.length == 0 || result[0].status == 0) {
            console.log(`[-]  `, {
              statusMessage: "User not founded",
              status: false,
            });
            reject(err);
          } else {
            resolve();
          }
        }
      }
    );
  });
