const { select } = require("../service/select");
exports.fetchClasses = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);


  if(req.body.tokenPosition == 0){


    let studentQuery2 = {
      subject: "*",
      table: "students",
      condition: [
        `Email="${req.body.tokenEmail}"`,
        `user_id=${req.body.tokenId}`,
      ],
    };
  
    await select(studentQuery2, async (err, studentResult) => {
  
  
        req.body.tokenId = studentResult[0].student_id;

        let selectQuery = {
          subject: "*",
          table: "classes",
          condition: [
             `id_student=${req.body.tokenId}`,
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
      


    });



    
  




  }else{



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
      table: "classes",
      condition: [
       `id_teacher=${req.body.tokenId}`,
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
    });

};
}





  