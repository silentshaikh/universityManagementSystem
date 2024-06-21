import inquirer from "inquirer";
//Create a Bas Class
class Person {
    name;
    constructor(name) {
        this.name = name;
    }
}
;
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
    ;
    static enrollStudent(name, email, id, role, subject, teacher) {
        this.studList.push({
            name: name,
            email: email,
            studentId: id,
            role: role,
            subject: subject,
            teacher: teacher,
        });
        // console.log(this.studList)
    }
    ;
    static showStudent() {
        let filtList = this.studList.filter((e) => e.teacher !== undefined);
        // let findUndef = this.studList.find((e) => e.teacher!==undefined);
        // if(findUndef){
        this.studList = filtList;
        console.log(`\nThe students are in the list who have been enrolled for the semester and they have also selected their teacher.`);
        // }
        this.studList.forEach((e, i) => {
            // if(e.teacher){
            console.log(`\n ${i + 1}) \n Student Name: ${e.name}.\n Student Email: ${e.email}.\n Student ID: ${e.studentId}.\n Student Role: ${e.role} \n Course: ${e.subject}.\n Teacher: ${e.teacher}.`);
            // }else{
            //     console.log(`\n Student Name: ${e.name}.\n Student Email: ${e.email}.\n Student ID: ${e.studentId}.\n Course: ${e.subject}.`)
            // }
        });
    }
}
;
//Create a Teacher Class
class Teacher extends Person {
    static teacherList = [];
    constructor(name) {
        super(name);
    }
    ;
    static showTeachers() {
        this.teacherList.forEach((e, i) => {
            console.log(`\n ${i + 1}) \n Teacher Name: ${e.name}.\n Teacher Email: ${e.email}.\n Teacher ID: ${e.id}.\n Teacher Subject: ${e.subject} \n Role: ${e.role}.`);
        });
    }
}
;
class Department extends Person {
    constructor(name) {
        super(name);
    }
    ;
    static addStudent(name, email, id, subject, role) {
        Teacher.teacherList.push({ name: name,
            id: id,
            email: email,
            subject: subject,
            role: role, });
    }
}
;
//Create a Input for User
let isCond = true;
let userInput;
let studList = [];
let ourStudent;
let persRole = "user";
let admins = "admin";
let teacherId = Math.floor(Math.random() * 90000) + 10000;
let teacherList = [
    {
        id: teacherId + 1,
        name: "Tom",
        email: "tom@gmail.com",
        subject: "Computer Science",
        role: "user"
    },
    {
        id: teacherId + 2,
        name: "Ben",
        email: "ben@gmail.com",
        subject: "Engineering",
        role: "user"
    }, {
        id: teacherId + 3,
        name: "Scarlett",
        email: "scarlett@gmail.com",
        subject: "Software Engineering",
        role: "admin"
    }, {
        id: teacherId + 4,
        name: "Evan",
        email: "evan@gmail.com",
        subject: "Pharmacy",
        role: "user"
    }, {
        id: teacherId + 5,
        name: "Tony",
        email: "tony@gmail.com",
        subject: "Msc in Mathematics",
        role: "user"
    },
];
let ourTeachers = new Teacher("Teacher Staff");
Teacher.teacherList = teacherList;
//Subjects
let subjectList = ["Computer Science", "Engineering", "Software Engineering", "Pharmacy", "Msc in Mathametics"];
let subjects = [...new Set(subjectList)];
while (isCond) {
    let universityOptin = await inquirer.prompt([
        { name: "UniversityOption", message: "please Select only One", type: "list", choices: ["Enroll Student", "Select Teacher", "Visit of Department", "University"] },
    ]);
    if (universityOptin.UniversityOption === "Enroll Student") {
        while (isCond) {
            userInput = await inquirer.prompt([
                { name: "studentName", message: "Enter Your Name", type: "string" },
                { name: "studentEmail", message: "Enter Your Email", type: "string" },
                { name: "courseList", message: "Select Your Course", type: "list", choices: ["Computer Science", "Engineering", "Software Engineering", "Pharmacy", "Msc in Mathametics"] },
                // {
                //     name: "MoreStudent",
                //     message: "Do you want to add more Student",
                //     type: "confirm",
                //     default: true,
                //   },
            ]);
            let studentId = Math.floor(Math.random() * 90000) + 10000;
            ourStudent = new Student(userInput.studentName, userInput.studentEmail, studentId, userInput.courseList);
            let notDuplicateId = studList.find((e) => {
                return e.studentId === studentId;
            });
            let notDuplicateEmail = studList.find((e) => {
                return e.email === userInput.studentEmail;
            });
            console.log(notDuplicateEmail?.email);
            if (notDuplicateId?.studentId) {
                console.log(`This ${studentId} Id  is already exist Please Fill the form again`);
            }
            else {
                if (notDuplicateEmail?.email) {
                    console.log(`Email : ${userInput.studentEmail}, is already exist. Please fill the form again with new Email`);
                }
                else {
                    if (userInput.studentName === "" || userInput.studentName.length < 3) {
                        console.log("Please Enter Your Name and fill the form again and the must be 3 character");
                    }
                    else {
                        if (!userInput.studentEmail.match(/^([a-z_0-9]+)@([a-z]+)\.([a-z]){2,7}$/)) {
                            console.log(`Dear ${userInput.studentName}, Please Enter a Correct Email and fill the form again.`);
                        }
                        else {
                            let { name, email, studentId, subject } = ourStudent;
                            Student.enrollStudent(name, email, studentId, persRole, subject);
                            studList = Student.studList;
                        }
                    }
                    ;
                    if (userInput.studentName !== "" && userInput.studentName.length >= 3 && userInput.studentEmail.match(/^([a-z_0-9]+)@([a-z]+)\.([a-z]){2,7}$/)) {
                        console.log(`Dear ${userInput.studentName}, Your ID is ${studentId}`);
                    }
                }
            }
            ;
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
        while (isCond) {
            // let teacherId:number = Math.floor(Math.random() * 90000) + 10000;
            // const teacherList:Teacher[] = [
            //     new Teacher("Tom","tom@gmail.com",teacherId,["Computer Science"]),
            //     new Teacher("Ben", "ben@gmail.com", teacherId, ["Engineering"]),
            //     new Teacher("Scarlett", "scarlett@gmail.com", teacherId, ["Software Engineering"]),
            //     new Teacher("Evan", "evan@gmail.com", teacherId, ["Pharmacy"]),
            //     new Teacher("Tony", "tony@gmail.com", teacherId, ["MSc in Mathematics"])
            // ]
            // let subjects = ["Computer Science","Engineering","Software Engineering","Pharmacy","Msc in Mathametics"]
            let studId = await inquirer.prompt([
                { name: "id", message: "Enter Your Id for select Your Teacher", type: "number" },
            ]);
            let filtStudId = studList.find((e) => e.studentId === studId.id);
            let filtSubject = subjects.find((e) => e.trim() === filtStudId?.subject.trim());
            console.log(filtSubject);
            if (filtStudId) {
                let availableTeachr = teacherList.filter((e) => {
                    return e.subject === filtSubject;
                });
                let findTechrSubject = availableTeachr.find((e) => e.subject === filtSubject);
                let replceTeacherId = Math.floor(Math.random() * 90000) + 10000;
                if (!findTechrSubject?.subject) {
                    let filtTeacher = teacherList.filter((e) => {
                        return e.subject !== filtSubject;
                    });
                    filtTeacher.push({ name: "Sam",
                        id: replceTeacherId,
                        email: "sam@gmail.com",
                        subject: filtSubject,
                        role: "user" });
                    teacherList = filtTeacher;
                    Teacher.teacherList = teacherList;
                }
                let slectTeacher = await inquirer.prompt([
                    { name: "teacher", message: () => {
                            for (let i = 0; i < subjects.length; i++) {
                                if (filtSubject?.trim().toLowerCase() === teacherList[i].subject?.trim().toLowerCase()) {
                                    return `Teacher of ${filtSubject} is ${teacherList[i].name}.`;
                                }
                                else {
                                    return `Teacher of ${filtSubject} is Sam`;
                                }
                            }
                            ;
                        },
                        type: "list", choices: teacherList.map((e) => e.name),
                    },
                ]);
                let { studentId, name, email, subject } = filtStudId;
                Student.enrollStudent(name, email, studentId, persRole, subject, slectTeacher.teacher);
                // Student.showStudent();
                // Teacher.showTeachers();
            }
            else {
                console.log(`ID: ${studId.id} is not available,Please Enter a Correct ID Again`);
            }
            let addMore = await inquirer.prompt([
                { name: 'addMoreTeacher', message: "Do you want to select Teacher for more Student", type: "confirm" },
            ]);
            isCond = addMore.addMoreTeacher;
        }
        ;
    }
    else if (universityOptin.UniversityOption === "Visit of Department") {
        isCond = true;
        while (isCond) {
            let deparmntOption = await inquirer.prompt([
                { name: "departmentOption", message: "Please Select only one", type: "list", choices: ["Student List", "Teacher List", "Add Teacher", "Remove Teacher", "Remove Student"] }
            ]);
            if (deparmntOption.departmentOption === "Student List") {
                console.log(`\n ### LIST OF STUDENT ###`);
                Student.showStudent();
                console.log(`\n ### END ###`);
            }
            else if (deparmntOption.departmentOption === "Teacher List") {
                console.log(`\n ### LIST OF STUDENT ###`);
                Teacher.showTeachers();
                console.log(`\n ### END ###`);
            }
            else if (deparmntOption.departmentOption === "Add Teacher") {
                let checkIdAdmin = await inquirer.prompt([
                    { name: "adminFind", message: "Enter your ID for if you are admin or not", type: "number" },
                ]);
                let findAdmin = Teacher.teacherList.find((e) => e.role === admins);
                console.log(findAdmin?.role);
                // let findAdminID = Teacher.teacherList.find((e) => e.id === findAdmin?.id);
                if (findAdmin?.id === checkIdAdmin.adminFind) {
                    let addTeacher = await inquirer.prompt([
                        { name: "techrName", messgae: "Enter a Teacher Name", type: "string" },
                        { name: "techrEmail", message: "ENter a Teacher Email", type: "string" },
                        { name: "techrSubject", message: "Enter a Teacher Subject", type: "string" },
                    ]);
                    let newTeacherID = Math.floor(Math.random() * 90000) + 10000;
                    let duplicateTeacherID = Teacher.teacherList.find((e) => e.id === newTeacherID);
                    let duplicateTeacherEmail = teacherList.find((e) => {
                        return e.email === addTeacher.techrEmail;
                    });
                    if (duplicateTeacherID?.id) {
                        console.log(`ID ${newTeacherID} is already exist, Please add a Teacher Again.`);
                    }
                    else {
                        if (duplicateTeacherEmail?.email) {
                            console.log(`Email : ${addTeacher.techrEmail}, is already exist. Please fill the form again with new Email`);
                        }
                        else {
                            if (addTeacher.techrName === "" || addTeacher.techrName.length < 3) {
                                console.log(`Please Enter The  Name of Teacher and fill the form again and the must be 3 character`);
                            }
                            else {
                                if (!addTeacher.techrEmail.match(/^([a-z_0-9]+)@([a-z]+)\.([a-z]){2,7}$/)) {
                                    console.log(`Dear ${addTeacher.techrName}, Please Enter a Correct Email and fill the form again.`);
                                }
                                else {
                                    let { techrName, techrEmail, techrSubject } = addTeacher;
                                    Department.addStudent(techrName, techrEmail, newTeacherID, techrSubject, persRole);
                                    subjectList.push(techrSubject);
                                }
                            }
                        }
                        if (addTeacher.techrName !== "" && addTeacher.techrName.length >= 3 && addTeacher.techrEmail.match(/^([a-z_0-9]+)@([a-z]+)\.([a-z]){2,7}$/) && !duplicateTeacherEmail) {
                            console.log(`Dear ${addTeacher.techrName}, Your ID is ${newTeacherID}`);
                        }
                    }
                }
                else {
                    console.log(`ID ${checkIdAdmin.adminFind} is not an Admin ID only Admin can Add a Teacher.`);
                }
                ;
            }
            else if (deparmntOption.departmentOption === "Remove Teacher") {
                let findAdminForRemTechr = await inquirer.prompt([
                    { name: "findAdmin", message: "Enter your ID for if you are admin or not", type: "number" },
                ]);
                let findAdminRem = Teacher.teacherList.find((e) => e.role === admins);
                console.log(findAdminRem?.role);
                // let findAdmnId = Teacher.teacherList.find((e) => e.id === findAdminRem?.id);
                let { findAdmin } = findAdminForRemTechr;
                if (findAdminRem?.id === findAdmin) {
                    let removeTeacher = await inquirer.prompt([
                        { name: "teacherRem", message: "Enter a Teacher ID for remove a Teacher:", type: "number" },
                    ]);
                    let { teacherRem } = removeTeacher;
                    let findId = Teacher.teacherList.find((e) => e.id === teacherRem);
                    if (findId?.id) {
                        let filterTeacherList = Teacher.teacherList.filter((e) => {
                            return e.id !== findId.id;
                        });
                        console.log(`Dear Students, Teacher ${findId.name} is Remove.`);
                        Teacher.teacherList = filterTeacherList;
                    }
                    else {
                        console.log(`ID:${teacherRem}is not Available.`);
                    }
                }
                else {
                    console.log(`ID: ${findAdmin} is not an Admin ID only Admin can Remove a Teacher.`);
                }
            }
            let runMoreDepart = await inquirer.prompt([
                { name: "runMore", message: "Do you want to run more the department", type: "confirm" },
            ]);
            isCond = runMoreDepart.runMore;
        }
    }
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
;
