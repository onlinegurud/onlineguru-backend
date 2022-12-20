const InsertInUserTableQuery = () => {
  let string =
    "INSERT INTO `users` (`Email`, `Position`, `status`) VALUES (?, ?, ?);";
  return string;
};

const InsertInStudentTableQuery = () => {
  let string =
    "INSERT INTO `students` (`user_id`, `FirstName`, `Email`, `LastName`, `Standard`, `Board`,  `phno`,`demo`, `Password`, `Address`, `district`, `city`, `country`,`state`,`postal_code`) VALUES (?, ?, ?, ?, ?,  ?, ?, ?, ?,?, ?, ?, ?,?,?);";
  return string;
};

const InsertInTeacherTableQuery = () => {
  let string =
    "INSERT INTO `teachers` (`user_id`,`Name`,`subject`,`prefer_start_Time`,`prefer_end_Time`,`gender`,`image`,`yearsofexperience`,`phno`,`Email`,`Password`,`Address`,`district`,`City`, `state`,`Country`,`postal_code`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?);";
  return string;
};

const InsertInClassTableQuery = () => {
  let string =
    "INSERT INTO `classes` (`id_classroom`,`id_student`,`id_teacher`,`start_Time` ,`status` ,`topic` ,`req_time` ,`demo`,`Link`,`credit`) VALUES (?,?,?, ?, ?, ?, ?, ?,?,?);";
  return string;
};

const InsertInClassroomTableQuery = () => {
  let string =
    "INSERT INTO `classrooms` ( `id_student`, `subject`, `id_teacher`,`status`,`credit`) VALUES (?, ?, ?,?,?);";
  return string;
};

const InsertInAdminTableQuery = () => {
  let string =
    "INSERT INTO `admins` (`user_id`,`Email`,`Name`,`Password`,`Phno`,`Address`,`district`,`city`,`country`,`state`,`postal_code`) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
  return string;
};

const InsertInPropertyTableQuery = () => {
  let string =
    "INSERT INTO `properties` (`demo_time`,`user_id`,`session_time`,`creditsperrupee`) VALUES (?,?,?,?);";
  return string;
};

const InsertInPricingTableQuery = () => {
  let string =
    "INSERT INTO `prices` (`user_id`,`standard`,`board`,`credits`, `discounts`) VALUES (?,?,?,?,?);";
  return string;
};

const InsertInRatingTableQuery = () => {
  let string =
    "INSERT INTO `ratings` (`id_student`,`id_teacher`,`ratings`,`comments`,`to_position`,`id_classes`) VALUES (?,?,?,?,?,?);";
  return string;
};


const InsertInBalanceTableQuery = () => {
  let string =
    "INSERT INTO `balance` (`user_id`,`balance`) VALUES (?,?);";
  return string;
};


const InsertInTeacherBalanceTableQuery = () => {
  let string =
    "INSERT INTO `tbalance` (`user_id`,`balance`) VALUES (?,?);";
  return string;
};

module.exports = {
  InsertInPropertyTableQuery,
  InsertInPricingTableQuery,
  InsertInUserTableQuery,
  InsertInRatingTableQuery,
  InsertInStudentTableQuery,
  InsertInTeacherTableQuery,
  InsertInClassTableQuery,
  InsertInClassroomTableQuery,
  InsertInAdminTableQuery,
  InsertInBalanceTableQuery,
  InsertInTeacherBalanceTableQuery,
};
