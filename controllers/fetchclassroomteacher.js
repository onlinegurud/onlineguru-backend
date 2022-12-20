const { select } = require("../service/select");
exports.fetchClassroomteacher = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  
  let studentQuery2 = {
    subject: "*",
    table: "teachers",
    condition: [
      `Email="${req.body.tokenEmail}"`,
      `user_id=${req.body.tokenId}`,
    ],
  };

  await select(studentQuery2, async (err, studentResult) => {


      req.body.tokenId = studentResult[0].teacher_id;

      let selectQuery = {
        subject: "*",
        table: "classrooms",
        condition: [`id_teacher=${req.body.tokenId}`,
        ],
        
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

  }
  );
  
};
