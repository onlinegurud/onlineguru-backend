const { createTable } = require("../service/createTable");
const { showTables } = require("../service/showTables");
const {
  InsertInUserTableQuery,
  InsertInPropertyTableQuery,
  InsertInPricingTableQuery,
} = require("../database/model/insertTable");
const { insert } = require("../service/insert");

const {
  UserTableCreateQuery,
  StudentTableCreateQuery,
  TeacherTableCreateQuery,
  ClassroomTableCreateQuery,
  ClassTableCreateQuery,
  RatingTableCreateQuery,
  AdminTableCreateQuery,
  PropertyTableCreateQuery,
  PricingTableCreateQuery,
  BalanceTableCreateQuery,
  TeacherBalanceTableCreateQuery ,
} = require("../database/model/createTable");
const { refreshValues } = require("./getPriceAndProperty");

exports.createInitialTable = async () => {
  console.log("[+] initialling initial table check ");
  let presentTable = [];
  await showTables(async (result) => {
    presentTable.push(...result);
    presentTable.map((table, index) => {
      presentTable[index] = table[`Tables_in_${process.env.DB_NAME}`];
    });

    // console.log(presentTable.includes("users"), presentTable);
    if (presentTable.includes("users") != true) {
      createTable(UserTableCreateQuery(), (result) => {
        console.log("[+] User Table Created");
        insert(
          InsertInUserTableQuery(),
          "Users",
          [process.env.MAIL_USERNAME, 3, 1],
          (err, result) => {
            if (!err) {
              console.log("[+] SuperAdmin Inserted");
            } else {
              console.log("[-] SuperAdmin not Inserted");
            }
          }
        );
      });
    }
    if (presentTable.includes("properties") != true) {
      createTable(PropertyTableCreateQuery(), (result) => {
        console.log("[+] Properties Table Created");
        insert(
          InsertInPropertyTableQuery(),
          "Properties",
          [5, 1, 40, 50],
          (err, result) => {
            if (!err) {
              console.log("[+] Initial property Inserted");
            } else {
              console.log("[-] Initial property not Inserted");
            }
          }
        );
      });
    }
    if (presentTable.includes("prices") != true) {
      createTable(PricingTableCreateQuery(), (result) => {
        console.log("[+] prices Table Created");
        for (let i = 1; i < 13; i++) {
          for (let j = 1; j < 5; j++) {
            insert(
              InsertInPricingTableQuery(),
              "Prices",
              [1, i, j, 300 + 50 * i, 0],
              (err, result) => {
                if (!err) {
                  console.log(
                    "[+] price Inserted for ",
                    i,
                    " grade and ",
                    j,
                    " standard"
                  );
                } else {
                  console.log("[-] Something went wrong");
                }
              }
            );
          }
        }
      });
    }


    if (presentTable.includes("balance") != true) {
      createTable(BalanceTableCreateQuery(), (result) => {
        console.log("[+] Balance Table Created");
      });
    }


    if (presentTable.includes("students") != true) {
      createTable(StudentTableCreateQuery(), (result) => {
        console.log("[+] Students Table Created");
      });
    }
    if (presentTable.includes("teachers") != true) {
      createTable(TeacherTableCreateQuery(), (result) => {
        console.log("[+] Teachers Table Created");
      });
    }
    if (presentTable.includes("classrooms") != true) {
      createTable(ClassroomTableCreateQuery(), (result) => {
        console.log("[+] Classrooms Table Created");
      });
    }
    if (presentTable.includes("classes") != true) {
      createTable(ClassTableCreateQuery(), (result) => {
        console.log("[+] Classes Table Created");
      });
    }
    if (presentTable.includes("ratings") != true) {
      createTable(RatingTableCreateQuery(), (result) => {
        console.log("[+] Rating Table Created");
      });
    }
    if (presentTable.includes("admins") != true) {
      createTable(AdminTableCreateQuery(), (result) => {
        console.log("[+] Admin Table Created");
      });
    }

    if (presentTable.includes("tbalance") != true) {
      createTable(TeacherBalanceTableCreateQuery(), (result) => {
        console.log("[+] balance teacher Table Created");
      });
    }
  });
  refreshValues();
};
