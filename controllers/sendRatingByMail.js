const { select } = require("../service/select");
const { SendMail } = require("../service/sendMail");

exports.sendRating = async (data) => {
  console.log("\n[+]  request send rating by mail");
  console.log("[+] ", data);

  const studentselectQuery = {
    subject: "*",
    table: "students",
    condition: [`student_id=${data[0].id_student}`],
  };

  await select(studentselectQuery, async (err, result) => {
    await SendMail(
      result[0].Email,
      "class rating",
      `Thank you for taking class in our plateform , it will be helpfull, if you share your rating link`
    );
  });

  const teacherselectQuery = {
    subject: "*",
    table: "teachers",
    condition: [`teacher_id=${data[0].id_teacher}`],
  };

  await select(teacherselectQuery, async (err, result) => {
    await SendMail(
      result[0].Email,
      "class rating",
      `Thank you for taking class in our plateform , it will be helpfull, if you share your rating link`
    );
  });
};
