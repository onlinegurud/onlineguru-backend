const {
  InsertInAdminTableQuery,
  InsertInUserTableQuery,
} = require("../../database/model/insertTable");
const { select } = require("../../service/select");
const { insert } = require("../../service/insert");
const { deleteRow } = require("../../service/delete");
const { deleteFromTable } = require("../../database/model/deleteTable");

exports.CreateAdmin = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  try {
    if (
      req.body.Email === undefined ||
      req.body.Password === undefined ||
      req.body.Name === undefined ||
      req.body.phno === undefined ||
      req.body.Address === undefined ||
      req.body.district === undefined ||
      req.body.city === undefined ||
      req.body.country === undefined ||
      req.body.state === undefined ||
      req.body.postal_code === undefined
    ) {
      console.log(`[-]  `, {
        statusMessage: "All field are required",
        status: false,
      });
      res.send({
        statusMessage: "All field are required",
        status: false,
      });
    } else {
      select(
        {
          subject: "*",
          table: "users",
          condition: [`Email="${req.body.Email}"`],
        },
        (err, result) => {
          console.log("[+] ", result);
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
            if (result.length > 0) {
              console.log(`[+]  `, {
                statusMessage: "User already exsist",
                status: false,
              });
              res.send({
                statusMessage: "User already exsist",
                status: false,
              });
            } else {
              insert(
                InsertInUserTableQuery(),
                "users",
                [req.body.Email, 2, 1],
                (err, result) => {
                  if (!err) {
                    //fill data  with user id
                    insert(
                      InsertInAdminTableQuery(),
                      "student",
                      [
                        result.insertId,
                        req.body.Email,
                        req.body.Name,
                        req.body.Password,
                        req.body.phno,
                        req.body.Address,
                        req.body.district,
                        req.body.city,
                        req.body.country,
                        req.body.state,
                        req.body.postal_code,
                      ],
                      (err, result) => {
                        if (!err) {
                          console.log(`[+]  `, {
                            statusMessage: "Admin Registration succeded",
                            status: true,
                          });
                          res.send({
                            statusMessage: "Admin Registration succeded",
                            status: true,
                          });
                        } else {
                          // remove user from users table if insertion fails in admin table
                          console.log(err);
                          deleteRow(
                            deleteFromTable(
                              "users",
                              "user_id",
                              result.insertId
                            ),
                            "users",
                            (error, result) => {
                              if (!error) {
                                console.log(`[+]  `, {
                                  result: result,
                                  statusMessage: "User Removed from Db",
                                  status: true,
                                });
                                res.send({
                                  result: result,
                                  statusMessage: "User Removed from Db",
                                  status: true,
                                });
                              } else {
                                console.log(`[+]  `, {
                                  error: error,
                                  statusMessage: "User Removal from Db failed",
                                  status: false,
                                });
                                res.send({
                                  error: error,
                                  statusMessage: "User Removal from Db failed",
                                  status: false,
                                });
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        }
      );
    }
  } catch (err) {
    console.log(`[+]  `, {
      error: err,
      statusMessage: "Something went wrong",
      status: false,
    });
    res.send({
      error: err,
      statusMessage: "something went wrong",
      status: false,
    });
  }
};
