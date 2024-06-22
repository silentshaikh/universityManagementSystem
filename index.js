import inquirer from "inquirer";
import chalk from "chalk";
//Create a Base Class
class Person {
    name;
    constructor(name) {
        this.name = name;
    }
}
//Create a Student Class
class Student extends Person {
    email;
    studentId;
    subject;
    static studList = [];
    constructor(name, email, studentId, subject) {
        super(name);
        this.email = email;
        this.studentId = studentId;
        this.subject = subject;
    }
    static enrollStudent(name, email, id, role, subject, teacher) {
        this.studList.push({
            name: name,
            email: email,
            studentId: id,
            role: role,
            subject: subject,
            teacher: teacher,
        });
    }
    static showStudent() {
        this.studList.forEach((e, i) => {
            if (e.teacher) {
                console.log(chalk.greenBright(`\n\tCongratulation ${chalk.italic(e.name)}, You are Enrolled in the Course\n`)),
                    console.log(`\n ${i + 1}) \n Student Name: ${chalk.italic(e.name)}.\n Student Email: ${chalk.italic(e.email)}.\n Student ID: ${chalk.italic(e.studentId)}.\n Student Role: ${chalk.italic(e.role)} \n Course: ${chalk.italic(e.subject)}.\n Teacher: ${chalk.italic(e.teacher)}.`);
            }
            else {
                console.log(chalk.red(`Dear ${chalk.italic(e.name)}, You are not Enrolled in the Course,Because you can't select your Teacher, Plz select your Teacher`)),
                    console.log(` \n ${chalk.cyanBright(i + 1)})\n Student Name: ${chalk.italic(e.name)}.\n Student Email: ${chalk.italic(e.email)}.\n Student ID: ${chalk.italic(e.studentId)}.\n Course: ${chalk.italic(e.subject)}\n Student Role: ${chalk.italic(e.role)}.`);
            }
        });
    }
}
//Create a Teacher Class
class Teacher extends Person {
    static teacherList = [];
    constructor(name) {
        super(name);
    }
    static showTeachers() {
        this.teacherList.forEach((e, i) => {
            console.log(`\n ${chalk.cyanBright(i + 1)}) \n Teacher Name: ${chalk.italic(e.name)}.\n Teacher Email: ${chalk.italic(e.email)}.\n Teacher ID: ${chalk.italic(e.id)}.\n Teacher Subject: ${chalk.italic(e.subject)} \n Role: ${chalk.italic(chalk.greenBright(e.role))}.`);
        });
    }
}
//Create a Department Class
class Department extends Person {
    constructor(name) {
        super(name);
    }
    static addTeacher(name, email, id, subject, role) {
        Teacher.teacherList.push({
            name: name,
            id: id,
            email: email,
            subject: subject,
            role: role,
        });
    }
}
//Create a Variable for Running the University
let isCond = true;
//Declare a Variable for Enroll Student Inquirer
let userInput;
//Declare a Variable for instance of a Student Class
let ourStudent;
let persRole = "user";
let admins = "admin";
//Create an ID for Teachers
let teacherId = Math.floor(Math.random() * 90000) + 10000;
//Create a List of Teachers
let teacherList = [
    {
        id: `T-${teacherId + 1}`,
        name: "Tom",
        email: "tom@gmail.com",
        subject: "Computer Science",
        role: "user",
    },
    {
        id: `T-${teacherId + 2}`,
        name: "Ben",
        email: "ben@gmail.com",
        subject: "Engineering",
        role: "user",
    },
    {
        id: `T-${teacherId + 3}`,
        name: "Scarlett",
        email: "scarlett@gmail.com",
        subject: "Software Engineering",
        role: "admin",
    },
    {
        id: `T-${teacherId + 4}`,
        name: "Evan",
        email: "evan@gmail.com",
        subject: "Pharmacy",
        role: "user",
    },
    {
        id: `T-${teacherId + 5}`,
        name: "Tony",
        email: "tony@gmail.com",
        subject: "Msc in Mathematics",
        role: "user",
    },
];
//Create an Instance of Teacher class
let ourTeachers = new Teacher("Teacher Staff");
Teacher.teacherList = teacherList;
//Subjects
let subjectList = [
    "Computer Science",
    "Engineering",
    "Software Engineering",
    "Pharmacy",
    "Msc in Mathametics",
];
//Remove Duplicate from the List of Subjects
let subjects = [...new Set(subjectList)];
while (isCond) {
    let universityOptin = await inquirer.prompt([
        //University OPtions
        {
            name: "UniversityOption",
            message: "please Select only One",
            type: "list",
            choices: [
                "Enroll Student",
                "Select Teacher",
                "Visit of Department",
            ],
        },
    ]);
    if (universityOptin.UniversityOption === "Enroll Student") {
        while (isCond) {
            userInput = await inquirer.prompt([
                { name: "studentName", message: "Enter Your Name", type: "string" },
                { name: "studentEmail", message: "Enter Your Email", type: "string" },
                {
                    name: "courseList",
                    message: "Select Your Course",
                    type: "list",
                    choices: [
                        "Computer Science",
                        "Engineering",
                        "Software Engineering",
                        "Pharmacy",
                        "Msc in Mathametics",
                    ],
                },
            ]);
            //Create an Student ID
            let studentId = Math.floor(Math.random() * 90000) + 10000;
            let numToStr = `S-${studentId}`;
            //Create an instance of Student Object
            ourStudent = new Student(userInput.studentName, userInput.studentEmail, numToStr, userInput.courseList);
            //Find Duplicate ID
            let notDuplicateId = Student.studList.find((e) => {
                return e.studentId === numToStr;
            });
            //Find Duplicate Email
            let notDuplicateEmail = Student.studList.find((e) => {
                return e.email === userInput.studentEmail;
            });
            //Catch Duplicate ID
            if (notDuplicateId?.studentId) {
                console.log(chalk.red(chalk.italic(` \n\t This ${chalk.cyanBright(numToStr)} ID  is already exist Please Fill the form again\n`)));
            }
            else {
                //Catch Duplicate Email
                if (notDuplicateEmail?.email) {
                    console.log(chalk.red(chalk.italic(`\n\t Email : ${chalk.cyanBright(userInput.studentEmail)} , is already exist. Please fill the form again with new Email\n`)));
                }
                else {
                    //if name syntax is incorrect
                    if (userInput.studentName === "" ||
                        userInput.studentName.length < 3) {
                        console.log(chalk.red(chalk.italic("\n\t Please Enter Your Name and fill the form again and the must be 3 character\n")));
                    }
                    else {
                        //if email syntax is incorrect
                        if (!userInput.studentEmail.match(/^([a-z_0-9]+)@([a-z]+)\.([a-z]){2,7}$/)) {
                            console.log(chalk.italic(chalk.red(`\n\t Dear ${chalk.cyanBright(userInput.studentName)}, Please Enter a Correct Email and fill the form again.\n`)));
                        }
                        else {
                            let { name, email, studentId, subject } = ourStudent;
                            //Enroll Student
                            Student.enrollStudent(name, email, studentId, persRole, subject);
                            // studList = Student.studList;
                        }
                    }
                    //show ID of Student if name and email syntax is correct 
                    if (userInput.studentName !== "" &&
                        userInput.studentName.length >= 3 &&
                        userInput.studentEmail.match(/^([a-z_0-9]+)@([a-z]+)\.([a-z]){2,7}$/)) {
                        console.log(chalk.italic(chalk.greenBright(`\n\t Dear ${chalk.cyanBright(userInput.studentName)}, Your ID is ${chalk.cyanBright(numToStr)}.\n`)));
                    }
                }
            }
            //if you want to add more student
            let moreStud = await inquirer.prompt([
                {
                    name: "MoreStudent",
                    message: "Do you want to add more Student",
                    type: "confirm",
                    default: true,
                },
            ]);
            isCond = moreStud.MoreStudent;
        }
    }
    else if (universityOptin.UniversityOption === "Select Teacher") {
        isCond = true;
        if (Student.studList.length === 0) {
            console.log(chalk.red("\n\t ########################## \n"));
            console.log(chalk.red("\t# STUDENT LIST IS EMPTY #"));
            console.log(chalk.red("\n\t ########################## \n"));
        }
        else {
            while (isCond) {
                //Using Inquirer to find a Student
                let studId = await inquirer.prompt([
                    {
                        name: "id",
                        message: "Enter Your Id for select Your Teacher",
                        type: "string",
                    },
                ]);
                //Find Student
                let filtStudId = Student.studList.find((e) => e.studentId === studId.id);
                if (filtStudId?.teacher) {
                    console.log(chalk.red(chalk.italic(`\n \tYou already select your Teacher, so you can't be again\n`)));
                }
                else {
                    //Find Subject of Student
                    let filtSubject = subjects.find((e) => e.trim() === filtStudId?.subject.trim());
                    let findTeacher = Teacher.teacherList.find((e) => e.subject === filtSubject);
                    //if Student ID is Available
                    if (filtStudId?.studentId) {
                        //Create a new ID for a Replace Teacher
                        let replceTeacherId = Math.floor(Math.random() * 90000) + 10000;
                        //check if the teacher is not available
                        if (findTeacher) {
                            //Student Teacher equal to teacher name
                            filtStudId.teacher = findTeacher.name;
                            console.log(chalk.italic(chalk.greenBright(`\n \t Dear ${chalk.cyanBright(filtStudId.name)},Your Teacher is ${chalk.cyanBright(findTeacher.name)} for subject ${chalk.cyanBright(filtStudId.subject)}.\n`)));
                        }
                        else {
                            //replace the last remove teacher
                            let newTeacher = { name: "Sam",
                                id: `T-${replceTeacherId}`,
                                email: `sam${replceTeacherId.toString().slice(0, 3)}@gmail.com`,
                                subject: filtSubject,
                                role: "user", };
                            //Add into Teacher List
                            Teacher.teacherList.push(newTeacher);
                            //Student Teacher equal to teacher name
                            filtStudId.teacher = newTeacher.name;
                            console.log(chalk.italic(chalk.greenBright(`\n \t Dear ${chalk.cyanBright(filtStudId.name)},Your Teacher is ${chalk.cyanBright(newTeacher.name)} for subject ${chalk.cyanBright(filtStudId.subject)}.\n`)));
                        }
                    }
                    else {
                        //if Student ID is not available
                        console.log(chalk.red(chalk.italic(`\n\tID: ${chalk.cyanBright(studId.id)} is not available,Please Enter a Correct ID Again\n`)));
                    }
                }
                //if Add More Student
                let addMore = await inquirer.prompt([
                    {
                        name: "addMoreTeacher",
                        message: "Do you want to select Teacher for more Student",
                        type: "confirm",
                    },
                ]);
                isCond = addMore.addMoreTeacher;
            }
        }
    }
    else if (universityOptin.UniversityOption === "Visit of Department") {
        //Instance of Department
        let ourDeparment = new Department("Department");
        isCond = true;
        while (isCond) {
            //Option of Department
            let deparmntOption = await inquirer.prompt([
                {
                    name: "departmentOption",
                    message: "Please Select only one",
                    type: "list",
                    choices: [
                        "Student List",
                        "Teacher List",
                        "Add Teacher",
                        "Remove Teacher",
                        "Remove Student",
                    ],
                },
            ]);
            if (deparmntOption.departmentOption === "Student List") {
                if (Student.studList.length === 0) {
                    console.log(chalk.red("\n \t##########################\n"));
                    console.log(chalk.red("\t# STUDENT LIST IS EMPTY #"));
                    console.log(chalk.red("\n\t##########################\n"));
                }
                else {
                    //Show the List of Teacher
                    console.log(chalk.italic(chalk.greenBright(`\n \t ### LIST OF STUDENT ###\n`)));
                    Student.showStudent();
                    console.log(chalk.greenBright(chalk.italic(`\n \t ### END ###\n`)));
                }
            }
            else if (deparmntOption.departmentOption === "Teacher List") {
                //Show the List of Teacher
                console.log(chalk.greenBright(chalk.italic(`\n \t ### LIST OF tEACHER ### \n`)));
                Teacher.showTeachers();
                console.log(chalk.greenBright(chalk.italic(`\n ### END ### \n`)));
            }
            else if (deparmntOption.departmentOption === "Add Teacher") {
                //Using Inquirer to Find Admin
                let checkIdAdmin = await inquirer.prompt([
                    {
                        name: "adminFind",
                        message: "Enter your ID for if you are admin or not",
                        type: "string",
                    },
                ]);
                //Find Admin
                let findAdmin = Teacher.teacherList.find((e) => e.role === admins);
                //check the person is Admin
                if (findAdmin?.id === checkIdAdmin.adminFind) {
                    // Add a Teacher
                    let addTeacher = await inquirer.prompt([
                        {
                            name: "techrName",
                            messgae: "Enter a Teacher Name",
                            type: "string",
                        },
                        {
                            name: "techrEmail",
                            message: "Enter a Teacher Email",
                            type: "string",
                        },
                        {
                            name: "techrSubject",
                            message: "Enter a Teacher Subject",
                            type: "string",
                        },
                    ]);
                    let newTeacherID = Math.floor(Math.random() * 90000) + 10000;
                    let strTechrID = `T-${newTeacherID}`;
                    //Find Duplicate ID
                    let duplicateTeacherID = Teacher.teacherList.find((e) => e.id === strTechrID);
                    //Find Duplicate Email
                    let duplicateTeacherEmail = teacherList.find((e) => {
                        return e.email === addTeacher.techrEmail;
                    });
                    //Catch Duplicate ID
                    if (duplicateTeacherID?.id) {
                        console.log(chalk.italic(chalk.red(`\n\tID ${chalk.cyanBright(strTechrID)} is already exist, Please add a Teacher Again.\n`)));
                    }
                    else {
                        //Catch Duplicate Email
                        if (duplicateTeacherEmail?.email) {
                            console.log(chalk.italic(chalk.red(`\n\tEmail : ${chalk.cyanBright(addTeacher.techrEmail)}, is already exist. Please fill the form again with new Email.\n`)));
                        }
                        else {
                            //if name syntax is incorrect
                            if (addTeacher.techrName === "" ||
                                addTeacher.techrName.length < 3) {
                                console.log(chalk.italic(chalk.red(`\n\tPlease Enter The  Name of Teacher and fill the form again and the must be 3 character.\n`)));
                            }
                            else {
                                //if email syntax is incorrect
                                if (!addTeacher.techrEmail.match(/^([a-z_0-9]+)@([a-z]+)\.([a-z]){2,7}$/)) {
                                    console.log(chalk.italic(chalk.red(`\n\tDear ${chalk.cyanBright(addTeacher.techrName)}, Please Enter a Correct Email and fill the form again.\n`)));
                                }
                                else {
                                    let { techrName, techrEmail, techrSubject } = addTeacher;
                                    //Add new Teachers in the Teacher List
                                    Department.addTeacher(techrName, techrEmail, strTechrID, techrSubject, persRole);
                                    subjectList.push(techrSubject);
                                }
                            }
                        }
                        //Show ID if name and email is correct
                        if (addTeacher.techrName !== "" &&
                            addTeacher.techrName.length >= 3 &&
                            addTeacher.techrEmail.match(/^([a-z_0-9]+)@([a-z]+)\.([a-z]){2,7}$/) &&
                            !duplicateTeacherEmail) {
                            console.log(chalk.greenBright(chalk.italic(`\n\tDear ${chalk.cyanBright(addTeacher.techrName)}, Your ID is ${chalk.cyanBright(strTechrID)}\n`)));
                        }
                    }
                }
                else {
                    //if ID is not an Admin ID
                    console.log(chalk.italic(chalk.red(`\n\tID ${chalk.cyanBright(checkIdAdmin.adminFind)} is not an Admin ID only Admin can Add a Teacher.\n`)));
                }
            }
            else if (deparmntOption.departmentOption === "Remove Teacher") {
                //Using inquirer to find Admin
                let findAdminForRemTechr = await inquirer.prompt([
                    {
                        name: "findAdmin",
                        message: "Enter your ID for if you are admin or not",
                        type: "string",
                    },
                ]);
                //Find Admin in Teacher List
                let findAdminRem = Teacher.teacherList.find((e) => e.role === admins);
                let { findAdmin } = findAdminForRemTechr;
                //check admin id is equal to inquirer id
                if (findAdminRem?.id === findAdmin) {
                    let removeTeacher = await inquirer.prompt([
                        {
                            name: "teacherRem",
                            message: "Enter a Teacher ID for remove a Teacher:",
                            type: "string",
                        },
                    ]);
                    let { teacherRem } = removeTeacher;
                    //Find the ID of Teacher
                    let findId = Teacher.teacherList.find((e) => e.id === teacherRem);
                    //find id equal to admin id
                    if (findId?.id === findAdmin) {
                        console.log(chalk.italic(chalk.red(`\n\t Admin can't be removed.\n`)));
                    }
                    else {
                        //check if Teacher ID is Available
                        if (findId?.id) {
                            // Delete a Teacher in Teacher List
                            let filterTeacherList = Teacher.teacherList.filter((e) => {
                                return e.id !== findId.id;
                            });
                            console.log(chalk.italic(chalk.cyanBright(`\n \tDear Students, Teacher ${chalk.greenBright(findId.name)} is Remove.\n`)));
                            //update the teacher list in class teacher on delete a Teacher
                            Teacher.teacherList = filterTeacherList;
                        }
                        else {
                            //if ID is not avaiable in Teacher List
                            console.log(chalk.italic(chalk.red(`\n\tID:${teacherRem}is not Available.\n`)));
                        }
                    }
                }
                else {
                    //if ID not an Admin ID
                    console.log(chalk.italic(chalk.red(`\n \tID: ${findAdmin} is not an Admin ID only Admin can Remove a Teacher.\n`)));
                }
            }
            else if (deparmntOption.departmentOption === "Remove Student") {
                if (Student.studList.length === 0) {
                    console.log(chalk.red("\n\t##########################\n"));
                    console.log(chalk.red("\t# STUDENT LIST IS EMPTY #"));
                    console.log(chalk.red("\n\t##########################\n"));
                }
                else {
                    //Find Admin to Remove a Student
                    let findAdminForRemStud = await inquirer.prompt([
                        {
                            name: "findAdmin",
                            message: "Enter your ID for if you are admin or not:",
                            type: "string",
                        },
                    ]);
                    //Find Admin in Teacher List
                    let findAdminStud = Teacher.teacherList.find((e) => e.role === admins);
                    let { findAdmin } = findAdminForRemStud;
                    // if Inquirer id is equal to Admin ID
                    if (findAdmin === findAdminStud?.id) {
                        //Using Inquirer to find Student ID
                        let removeStudent = await inquirer.prompt([
                            {
                                name: "studentRem",
                                message: "Enter a Student ID for remove a Student:",
                                type: "string",
                            },
                        ]);
                        let { studentRem } = removeStudent;
                        // find Student ID for Delete an Student 
                        let findStudId = Student.studList.find((e) => e.studentId === studentRem);
                        if (findStudId?.studentId) {
                            //Filter the list of Student
                            let filterStud = Student.studList.filter((e) => {
                                return e.studentId !== findStudId.studentId;
                            });
                            //Message if Student is remove 
                            console.log(chalk.cyan(`\n\tStudent ${findStudId.name} is Remove\n`));
                            Student.studList = filterStud;
                        }
                        else {
                            //if Student ID is not available
                            console.log(chalk.red(chalk.italic(`ID: ${chalk.cyanBright(studentRem)} is not Available.`)));
                        }
                    }
                    else {
                        //if Id not an Admin ID
                        console.log(chalk.italic(chalk.red(`ID : ${chalk.cyanBright(findAdmin)} is not an Admin ID`)));
                    }
                }
            }
            //if you want to run Department more time 
            let runMoreDepart = await inquirer.prompt([
                {
                    name: "runMore",
                    message: "Do you want to run more the department",
                    type: "confirm",
                },
            ]);
            isCond = runMoreDepart.runMore;
        }
    }
    //if you want to run University more time
    let universityRunMore = await inquirer.prompt([
        {
            name: "runMore",
            message: "Do you want to run more",
            type: "confirm",
            default: true,
        },
    ]);
    isCond = universityRunMore.runMore;
}
