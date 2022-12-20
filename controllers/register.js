const {
  InsertInUserTableQuery,
  InsertInStudentTableQuery,
  InsertInTeacherTableQuery,
  InsertInBalanceTableQuery,
  InsertInTeacherBalanceTableQuery,
} = require("../database/model/insertTable");
const { select } = require("../service/select");
const { insert } = require("../service/insert");
const { deleteRow } = require("../service/delete");
const { deleteFromTable } = require("../database/model/deleteTable");

exports.register = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  //maybe include try catch in select.js file
  let userExists = false;
  if (req.body.Position === undefined) {
    console.log(`[-]  `, {
      statusMessage: "All field are required",
      status: false,
    });
    res.send({
      statusMessage: "All field are required",
      status: false,
    });
  } else if (
    req.body.Position === 0 &&
    (req.body.Email === undefined ||
      req.body.Password === undefined ||
      req.body.FirstName === undefined ||
      req.body.LastName === undefined ||
      req.body.Standard === undefined ||
      req.body.Board === undefined ||
      req.body.phno === undefined ||
      req.body.Address === undefined ||
      req.body.district === undefined ||
      req.body.city === undefined ||
      req.body.country === undefined ||
      req.body.state === undefined ||
      req.body.postal_code === undefined)
  ) {
    console.log(`[-]  `, {
      statusMessage: "All field are required",
      status: false,
    });
    res.send({
      statusMessage: "All field are required",
      status: false,
    });
  } else if (
    req.body.Position === 1 &&
    (req.body.Email === undefined ||
      req.body.Password === undefined ||
      req.body.Name === undefined ||
      req.body.subject === undefined ||
      req.body.prefer_start_Time === undefined ||
      req.body.prefer_end_Time === undefined ||
      req.body.gender === undefined ||
      req.body.image === undefined ||
      req.body.yearsofexperience === undefined ||
      req.body.phno === undefined ||
      req.body.Address === undefined ||
      req.body.district === undefined ||
      req.body.City === undefined ||
      req.body.Country === undefined ||
      req.body.state === undefined ||
      req.body.postal_code === undefined)
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
    try {
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
              userExists = true;
            }

            if (userExists === false) {
              insert(
                InsertInUserTableQuery(),
                "users",
                [req.body.Email, req.body.Position, 1],
                (err, userResult) => {
                  if (!err) {
                    if (req.body.Position === 0) {
                      //fetch user id and fill data array with req values
                      insert(
                        InsertInStudentTableQuery(),
                        "student",
                        [
                          userResult.insertId,
                          req.body.FirstName,
                          req.body.Email,
                          req.body.LastName,
                          req.body.Standard,
                          req.body.Board,
                          req.body.phno,
                          5,
                          req.body.Password,
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
                              statusMessage: "User Registration succeded",
                              status: true,
                            });
                            res.send({
                              statusMessage: "User Registration succeded",
                              status: true,
                            });
                          } else {
                            // remove user from users table if insertion fails in students table
                            console.log(err);
                            deleteRow(
                              deleteFromTable(
                                "users",
                                "user_id",
                                userResult.insertId
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
                                    statusMessage:
                                      "User Removal from Db failed",
                                    status: false,
                                  });
                                  res.send({
                                    error: error,
                                    statusMessage:
                                      "User Removal from Db failed",
                                    status: false,
                                  });
                                }
                              }
                            );
                          }
                        }
                      );

                      //insert into student balance
                      
                              insert(
                                InsertInBalanceTableQuery(),
                                "balance",
                                [
                                  userResult.insertId,
                                 2500
                                ],
                                (err, result) => {
                                  if (!err) {
                                    console.log(`[+]  `, {
                                      statusMessage: "User balance added succeded",
                                      status: true,
                                    });
                                    
                                  } 
                                }
                              );







                    } else if (req.body.Position === 1) {
                      insert(
                        InsertInTeacherTableQuery(),
                        "teacher",
                        [
                          userResult.insertId,
                          req.body.Name,
                          req.body.subject,
                          req.body.prefer_start_Time,
                          req.body.prefer_end_Time,
                          req.body.gender,
                          req.body.image,
                          req.body.yearsofexperience,
                          req.body.phno,
                          req.body.Email,
                          req.body.Password,
                          req.body.Address,
                          req.body.district,
                          req.body.City,
                          req.body.state,
                          req.body.Country,
                          req.body.postal_code,
                        ],
                        (err) => {
                          if (!err) {
                            console.log(`[+]  `, {
                              statusMessage: "User Registration succeed",
                              status: true,
                            });
                            res.send({
                              statusMessage: "User Registration succeed",
                              status: true,
                            });
                          } else {
                            // remove user from users table if insertion fails in students table
                            deleteRow(
                              deleteFromTable(
                                "users",
                                "user_id",
                                userResult.insertId
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
                                    status: false,
                                  });
                                } else {
                                  console.log(`[+]  `, {
                                    error: error,
                                    statusMessage:
                                      "User Removal from Db failed",
                                    status: false,
                                  });
                                  res.send({
                                    error: error,
                                    statusMessage:
                                      "User Removal from Db failed",
                                    status: false,
                                  });
                                  
                                }
                              }
                            );
                          }
                        }
                      );


                      insert(
                        InsertInTeacherBalanceTableQuery(),
                        "tbalance",
                        [
                          userResult.insertId,
                         0
                        ],
                        (err, result) => {
                          if (!err) {
                            console.log(`[+]  `, {
                              statusMessage: "User balance added succeded",
                              status: true,
                            });
                            
                          }
                        }
                      );

                    } else {
                      console.log(`[-]  `, {
                        error: err,
                        statusMessage:
                          "something went wrong in teacher registration",
                        status: false,
                      });
                      res.send({
                        error: err,
                        statusMessage: "something went wrong",
                        status: false,
                      });
                    }
                  }
                }
              );
            }
          }
        }
      );
    } catch (err) {
      console.log(`[-]  `, {
        error: err,
        statusMessage: "something went wrong in function",
        status: false,
      });
      res.send({
        error: err,
        statusMessage: "something went wrong",
        status: false,
      });
    }
  }
};
