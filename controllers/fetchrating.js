const { select } = require("../service/select");
exports.fetchRatings = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  let selectQuery = {
    subject: "*",
    table: "ratings",
    condition: [
      req[`body`][`position`] == 0
        ? `id_student=${req.body.id}`
        : `id_teacher=${req.body.id}`,
      req[`body`][`position`] == 0 ? `to_position=0` : `to_position=1`,
      // req[`body`][`id_classes`]
      //   ? `id_classes=${req.body.id_classes}`
      //   : `id_classes>0`,
    ],
    commands: " ORDER BY `ratings_id` DESC",
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
        statusMessage: "rating fetched",
        status: true,
      });
      res.send({
        result: result,
        statusMessage: "rating fetched",
        status: false,
      });
    }
  });
};
