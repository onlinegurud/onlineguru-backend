const UserTableCreateQuery = () => {
  string =
    "CREATE TABLE `users` (`user_id` INT NOT NULL AUTO_INCREMENT,`Email` varchar(255) NOT NULL UNIQUE,`Position` INT NOT NULL,`Status` INT NOT NULL,PRIMARY KEY (`user_id`));";
  return string;
};

const TeacherTableCreateQuery = () => {
  string =
    "CREATE TABLE `teachers` (`user_id` INT NOT NULL, `teacher_id` INT NOT NULL AUTO_INCREMENT,`Name` varchar(255) NOT NULL,`subject` VARCHAR(255) NOT NULL,`prefer_start_Time` TIME NOT NULL,`prefer_end_Time` TIME NOT NULL,`gender` INT NOT NULL,`image` VARCHAR(255) NOT NULL,`yearsofexperience` INT NOT NULL,`phno` varchar(20) NOT NULL UNIQUE,`Email` varchar(255) NOT NULL UNIQUE,`Password` varchar(255) NOT NULL,`Address` varchar(255) NOT NULL,`district` varchar(255) NOT NULL,`City` varchar(255) NOT NULL, `state` varchar(255) NOT NULL,`Country` varchar(255) NOT NULL,`postal_code` INT(255) NOT NULL,PRIMARY KEY (`teacher_id`),FOREIGN KEY (user_id) REFERENCES users(user_id),FOREIGN KEY (Email) REFERENCES users(Email));";
  return string;
};

// CREATE TABLE `Teachers` (
// 	`teacher_id` INT NOT NULL,
// 	`Name` varchar(255) NOT NULL,
// 	`subject` VARCHAR(255) NOT NULL,
// 	`prefer_start_Time` TIME NOT NULL,
// 	`prefer_end_Time` TIME NOT NULL,
// 	`gender` INT NOT NULL,
// 	`image` VARCHAR(255) NOT NULL,
// 	`yearsofexperience` INT NOT NULL,
// 	`phno` varchar(20) NOT NULL UNIQUE,
// 	`Email` varchar(255) NOT NULL UNIQUE,
// 	`Password` varchar(255) NOT NULL,
// 	`Address` varchar(255) NOT NULL,
// 	`district` varchar(255) NOT NULL,
// 	`City` varchar(255) NOT NULL,
// 	`state` varchar(255) NOT NULL,
// 	`Country` varchar(255) NOT NULL,
// 	`postal_code` INT(255) NOT NULL,
// 	PRIMARY KEY (`teacher_id`),
//     FOREIGN KEY (teacher_id) REFERENCES Users(user_id),
//     FOREIGN KEY (Email) REFERENCES Users(Email),
// );

const StudentTableCreateQuery = () => {
  string =
    "CREATE TABLE `students` (`user_id` INT NOT NULL, `student_id` INT NOT NULL AUTO_INCREMENT,`FirstName` varchar(255) NOT NULL,`Email` varchar(255) NOT NULL UNIQUE,`LastName` varchar(255),`Standard` INT NOT NULL,`Board` INT NOT NULL,`Phno` varchar(20) NOT NULL,`demo` INT,`Password` VARCHAR(255) NOT NULL,`Address` varchar(255) NOT NULL,`district` varchar(255) NOT NULL,`city` varchar(255) NOT NULL,`country` varchar(255) NOT NULL,`state` varchar(255) NOT NULL,`postal_code` INT NOT NULL,PRIMARY KEY (`student_id`),FOREIGN KEY (user_id) REFERENCES users(user_id),FOREIGN KEY (Email) REFERENCES users(Email));";
  return string;
};

// CREATE TABLE `Students` (
//     `student_id` INT NOT NULL,
//     `FirstName` varchar(255) NOT NULL,
//     `Email` varchar(255) NOT NULL UNIQUE,
//     `LastName` varchar(255),
//     `Standard` INT NOT NULL,
//     `Board` varchar(10) NOT NULL,
//     `GenderPerference` INT NOT NULL,
//     `Phno` varchar(20) NOT NULL,
//     `Password` VARCHAR(255) NOT NULL,
//     `Address` varchar(255) NOT NULL,
//     `district` varchar(255) NOT NULL,
//     `city` varchar(255) NOT NULL,
//     `country` varchar(255) NOT NULL,
//     `state` varchar(255) NOT NULL,
//     `postal_code` INT NOT NULL,
//     PRIMARY KEY (`student_id`),
//     FOREIGN KEY (student_id) REFERENCES Users(user_id),
//     FOREIGN KEY (Email) REFERENCES Users(Email),
// );

const ClassroomTableCreateQuery = () => {
  string =
    "CREATE TABLE `classrooms` ( `id_student` INT NOT NULL, `subject` VARCHAR(255) NOT NULL, `id_teacher` INT NOT NULL, `classroom_id` INT NOT NULL AUTO_INCREMENT,`status` INT NOT NULL,`credit` INT NOT NULL, PRIMARY KEY (`classroom_id`), FOREIGN KEY (id_student) REFERENCES students(student_id), FOREIGN KEY (id_teacher) REFERENCES teachers(teacher_id));";
  return string;
};

// CREATE TABLE `Classrooms` (
// 	`id_student` INT NOT NULL,
// 	`subject` VARCHAR(255) NOT NULL,
// 	`id_teacher` INT NOT NULL,
// 	`Topic` varchar(255) NOT NULL,
// 	`classroom_id` INT NOT NULL AUTO_INCREMENT,
// 	PRIMARY KEY (`classroom_id`),
//     FOREIGN KEY (id_student) REFERENCES Students(student_id),
//     FOREIGN KEY (id_teacher) REFERENCES Teachers(teacher_id)
// );

const RatingTableCreateQuery = () => {
  string =
    "CREATE TABLE `ratings` (`ratings_id` INT NOT NULL AUTO_INCREMENT,`id_student` INT NOT NULL,`id_teacher` INT NOT NULL,`ratings` INT,`comments` VARCHAR(255) NOT NULL,`to_position` INT NOT NULL,`id_classes` INT NOT NULL,PRIMARY KEY (`ratings_id`),FOREIGN KEY (id_student) REFERENCES students(student_id),FOREIGN KEY (id_teacher) REFERENCES teachers(teacher_id),FOREIGN KEY (id_classes) REFERENCES classes(classes_id))  ;";
  return string;
};

// CREATE TABLE `Ratings` (
// 	`ratings_id` INT NOT NULL AUTO_INCREMENT,
// 	`id_student` INT NOT NULL,
// 	`id_teacher` INT NOT NULL,
// 	`ratings` INT,
// 	`comments` VARCHAR(255) NOT NULL,
// 	`to` INT NOT NULL,
// 	PRIMARY KEY (`ratings_id`),
//     FOREIGN KEY (id_student) REFERENCES Students(student_id),
//     FOREIGN KEY (id_teacher) REFERENCES Teachers(teacher_id)
// );

const ClassTableCreateQuery = () => {
  string =
    "CREATE TABLE `classes` (`classes_id` INT NOT NULL AUTO_INCREMENT,`id_classroom` INT ,`id_student` INT NOT NULL,`id_teacher` INT NOT NULL,`start_Time` DATETIME NOT NULL,`status` INT NOT NULL,`topic` varchar(255) NOT NULL,`req_time` DATETIME NOT NULL,`demo` BOOLEAN NOT NULL,`Link` varchar(255),`credit` INT NOT NULL,PRIMARY KEY (`classes_id`),FOREIGN KEY (`id_classroom`) REFERENCES `classrooms`(`classroom_id`));";
  return string;
};

const AdminTableCreateQuery = () => {
  string =
    "CREATE TABLE `admins` (`admin_id` INT NOT NULL AUTO_INCREMENT,`user_id` INT NOT NULL,`Email` varchar(255) NOT NULL UNIQUE,`Name` varchar(255),`Phno` varchar(20) NOT NULL,`Password` VARCHAR(255) NOT NULL,`Address` varchar(255) NOT NULL,`district` varchar(255) NOT NULL,`city` varchar(255) NOT NULL,`country` varchar(255) NOT NULL,`state` varchar(255) NOT NULL,`postal_code` INT NOT NULL,FOREIGN KEY (user_id) REFERENCES users(user_id),FOREIGN KEY (Email) REFERENCES users(Email),PRIMARY KEY (`admin_id`));";
  return string;
};

// CREATE TABLE `classes` (
// 	`classes_id` INT NOT NULL AUTO_INCREMENT,
// 	`id_classroom` INT NOT NULL,
// 	`start_Time` DATETIME NOT NULL,
// 	`status` varchar(20) NOT NULL,
// 	`topic` varchar(255) NOT NULL,
// 	`req_time` DATETIME NOT NULL,
// 	`demo` BOOLEAN NOT NULL,
// 	PRIMARY KEY (`classes_id`),
//     FOREIGN KEY (`id_classroom`) REFERENCES `Classrooms`(`classroom_id`)
// );

const PropertyTableCreateQuery = () => {
  string =
    "CREATE TABLE `properties` (`property_id` INT NOT NULL AUTO_INCREMENT,`demo_time` INT NOT NULL,`user_id` INT NOT NULL,`session_time` INT NOT NULL,`creditsperrupee` INT NOT NULL,FOREIGN KEY (user_id) REFERENCES users(user_id),PRIMARY KEY (`property_id`));";
  return string;
};

// CREATE TABLE `properties` (
// 	`property_id` INT NOT NULL AUTO_INCREMENT,
// 	`demo_time` INT NOT NULL,
// 	`user_id` INT NOT NULL,
// 	`session_time` INT NOT NULL,
// 	`creditsperrupee` INT NOT NULL,
// 	PRIMARY KEY (`property_id`)
// );

const PricingTableCreateQuery = () => {
  string =
    "CREATE TABLE `prices` (`user_id` INT NOT NULL,`price_id` INT NOT NULL AUTO_INCREMENT,`standard` INT NOT NULL,`discounts` INT NOT NULL,`board` INT NOT NULL,`credits` INT NOT NULL,PRIMARY KEY (`price_id`),FOREIGN KEY (user_id) REFERENCES users(user_id));";
  return string;
};

const BalanceTableCreateQuery = () => {
  string =
    "CREATE TABLE `balance` (`b_id` INT NOT NULL AUTO_INCREMENT,`user_id` INT NOT NULL UNIQUE,`balance` INT NOT NULL ,PRIMARY KEY (`b_id`),FOREIGN KEY (user_id) REFERENCES users(user_id));";
  return string;
};

// CREATE TABLE `pricings` (
// 	`user_id` INT NOT NULL,
// 	`price_id` INT NOT NULL AUTO_INCREMENT,
// 	`standard` INT NOT NULL,
// 	`board` INT NOT NULL,
// 	`credits` INT NOT NULL,
// 	PRIMARY KEY (`price_id`)
// );

const TeacherBalanceTableCreateQuery = () => {
  string =
    "CREATE TABLE `tbalance` (`bt_id` INT NOT NULL AUTO_INCREMENT,`user_id` INT NOT NULL UNIQUE,`balance` INT NOT NULL ,PRIMARY KEY (`bt_id`),FOREIGN KEY (user_id) REFERENCES users(user_id));";
  return string;
};
module.exports = {
  PropertyTableCreateQuery,
  PricingTableCreateQuery,
  UserTableCreateQuery,
  StudentTableCreateQuery,
  TeacherTableCreateQuery,
  ClassroomTableCreateQuery,
  ClassTableCreateQuery,
  RatingTableCreateQuery,
  AdminTableCreateQuery,
  BalanceTableCreateQuery,
  TeacherBalanceTableCreateQuery ,
};

//ALTER TABLE `Teachers` ADD CONSTRAINT `Teachers_fk0` FOREIGN KEY (`teacher_id`) REFERENCES `User`(`user_id`);

// ALTER TABLE `Teachers` ADD CONSTRAINT `Teachers_fk1` FOREIGN KEY (`Email`) REFERENCES `User`(`Email`);

// ALTER TABLE `classroom` ADD CONSTRAINT `classroom_fk0` FOREIGN KEY (`id_student`) REFERENCES `Student`(`student_id`);

// ALTER TABLE `classroom` ADD CONSTRAINT `classroom_fk1` FOREIGN KEY (`id_teacher`) REFERENCES `Teachers`(`teacher_id`);

// ALTER TABLE `Student` ADD CONSTRAINT `Student_fk0` FOREIGN KEY (`student_id`) REFERENCES `User`(`user_id`);

// ALTER TABLE `Student` ADD CONSTRAINT `Student_fk1` FOREIGN KEY (`Email`) REFERENCES `User`(`Email`);

// ALTER TABLE `ratings` ADD CONSTRAINT `ratings_fk0` FOREIGN KEY (`id_student`) REFERENCES `Student`(`student_id`);

// ALTER TABLE `ratings` ADD CONSTRAINT `ratings_fk1` FOREIGN KEY (`id_teacher`) REFERENCES `Teachers`(`teacher_id`);

// ALTER TABLE `classes` ADD CONSTRAINT `classes_fk0` FOREIGN KEY (`id_classroom`) REFERENCES `classroom`(`classroom_id`);
