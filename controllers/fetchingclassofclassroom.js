const { select } = require("../service/select");
exports.fetchClassOfClassroom= async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  let selectQuery = {
    subject: "*",
    table: "classes",
    condition: [
      `id_classroom=${req.body.classroom_id}`
        
    ],
    commands: " ORDER BY `req_time` DESC",
  };

  await select(selectQuery, async (err, result) => {
    if (err) {
      console.log("[-] ", {
        err: err,
        status: false,
        statusMessage: "something went wrong",
      });
      res.send({
        err: err,
        status: false,
        statusMessage: "something went wrong",
      });
    } else {
      console.log(`[+]  `, {
        result: result,
        statusMessage: "classess fetched",
        status: true,
      });
      res.send({
        result: result,
        statusMessage: "classess fetched",
        status: false,
      });
    }
  });
};
