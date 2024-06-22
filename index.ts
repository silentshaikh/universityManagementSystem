import inquirer from "inquirer";
//Create an interface of TStudent list
interface StudentDetail {
    name: string;
    email: string;
    studentId: number;
    role: string;
    subject: string;
    teacher?: string;
}
//Create an interface of Teacher list
interface teacherList {
    name: string;
    id: number;
    email: string;
    subject: string | undefined;
    role: string;
}
//Create a Base Class
class Person {
    constructor(public name: string) { }
}
//Create a Student Class
class Student extends Person {
    static studList: StudentDetail[] = [];
    constructor(
        name: string,
        public email: string,
        public studentId: number,
        public subject: string
    ) {
        super(name);
    }
    static enrollStudent(
        name: string,
        email: string,
        id: number,
        role: string,
        subject: string,
        teacher?: string
    ) {
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
    static showStudent() {
        let filtList = this.studList.filter((e) => e.teacher !== undefined);
        // let findUndef = this.studList.find((e) => e.teacher!==undefined);
        // if(findUndef){
        this.studList = filtList;
        console.log(
            `\nThe students are in the list who have been enrolled for the semester and they have also selected their teacher.`
        );
        // }
        this.studList.forEach((e, i) => {
            // if(e.teacher){
            console.log(
                `\n ${i + 1}) \n Student Name: ${e.name}.\n Student Email: ${e.email
                }.\n Student ID: ${e.studentId}.\n Student Role: ${e.role} \n Course: ${e.subject
                }.\n Teacher: ${e.teacher}.`
            );
            // }else{
            //     console.log(`\n Student Name: ${e.name}.\n Student Email: ${e.email}.\n Student ID: ${e.studentId}.\n Course: ${e.subject}.`)
            // }
        });
    }
}

//Create a Teacher Class
class Teacher extends Person {
    static teacherList: teacherList[] = [];
    constructor(name: string) {
        super(name);
    }

    static showTeachers() {
        this.teacherList.forEach((e, i) => {
            console.log(
                `\n ${i + 1}) \n Teacher Name: ${e.name}.\n Teacher Email: ${e.email
                }.\n Teacher ID: ${e.id}.\n Teacher Subject: ${e.subject} \n Role: ${e.role
                }.`
            );
        });
    }
}
//Create a Department Class
class Department extends Person {
    constructor(name: string) {
        super(name);
    }
    static addStudent(
        name: string,
        email: string,
        id: number,
        subject: string,
        role: string
    ) {
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
let userInput: any;
let studList: StudentDetail[] = [];
//Declare a Variable for instance of a Student Class
let ourStudent: Student;
let persRole = "user";
let admins = "admin";
//Create an ID for Teachers
let teacherId: number = Math.floor(Math.random() * 90000) + 10000;
//Create a List of Teachers
let teacherList: teacherList[] = [
    {
        id: teacherId + 1,
        name: "Tom",
        email: "tom@gmail.com",
        subject: "Computer Science",
        role: "user",
    },
    {
        id: teacherId + 2,
        name: "Ben",
        email: "ben@gmail.com",
        subject: "Engineering",
        role: "user",
    },
    {
        id: teacherId + 3,
        name: "Scarlett",
        email: "scarlett@gmail.com",
        subject: "Software Engineering",
        role: "admin",
    },
    {
        id: teacherId + 4,
        name: "Evan",
        email: "evan@gmail.com",
        subject: "Pharmacy",
        role: "user",
    },
    {
        id: teacherId + 5,
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
let subjectList: string[] = [
    "Computer Science",
    "Engineering",
    "Software Engineering",
    "Pharmacy",
    "Msc in Mathametics",
];
//Remove Duplicate from the List of Subjects
let subjects = [...new Set(subjectList)];
//filter Teacher List
let filtTeacher: teacherList[] = [];
//Filter Subject
let filtSubject: string | undefined = "";
//check teacher in | out
let findTechrSubject: teacherList | undefined;
//Assign update teacher List
// let replceTeacher: teacherList[] = Teacher.teacherList;
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
                "University",
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
                // {
                //     name: "MoreStudent",
                //     message: "Do you want to add more Student",
                //     type: "confirm",
                //     default: true,
                //   },
            ]);
            //Create an Student ID
            let studentId: number = Math.floor(Math.random() * 90000) + 10000;
            //Create an instance of Student Object
            ourStudent = new Student(
                userInput.studentName,
                userInput.studentEmail,
                studentId,
                userInput.courseList
            );
            //Find Duplicate ID
            let notDuplicateId = studList.find((e) => {
                return e.studentId === studentId;
            });
            //Find Duplicate Email
            let notDuplicateEmail = studList.find((e) => {
                return e.email === userInput.studentEmail;
            });
            console.log(notDuplicateEmail?.email);
            //Catch Duplicate ID
            if (notDuplicateId?.studentId) {
                console.log(
                    `This ${studentId} Id  is already exist Please Fill the form again`
                );
            } else {
                //Catch Duplicate Email
                if (notDuplicateEmail?.email) {
                    console.log(
                        `Email : ${userInput.studentEmail}, is already exist. Please fill the form again with new Email`
                    );
                } else {
                    //if name syntax is incorrect
                    if (
                        userInput.studentName === "" ||
                        (userInput.studentName as string).length < 3
                    ) {
                        console.log(
                            "Please Enter Your Name and fill the form again and the must be 3 character"
                        );
                    } else {
                        //if email syntax is incorrect
                        if (
                            !(userInput.studentEmail as string).match(
                                /^([a-z_0-9]+)@([a-z]+)\.([a-z]){2,7}$/
                            )
                        ) {
                            console.log(
                                `Dear ${userInput.studentName}, Please Enter a Correct Email and fill the form again.`
                            );
                        } else {
                            let { name, email, studentId, subject } = ourStudent;
                            //Enroll Student
                            Student.enrollStudent(name, email, studentId, persRole, subject);
                            studList = Student.studList;
                        }
                    }
                    //show ID of Student if name and email syntax is correct 
                    if (
                        userInput.studentName !== "" &&
                        (userInput.studentName as string).length >= 3 &&
                        (userInput.studentEmail as string).match(
                            /^([a-z_0-9]+)@([a-z]+)\.([a-z]){2,7}$/
                        )
                    ) {
                        console.log(
                            `Dear ${userInput.studentName}, Your ID is ${studentId}`
                        );
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
    } else if (universityOptin.UniversityOption === "Select Teacher") {
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
            //Using Inquirer to find a Student
            let studId = await inquirer.prompt([
                {
                    name: "id",
                    message: "Enter Your Id for select Your Teacher",
                    type: "number",
                },
            ]);
            //Find Student
            let filtStudId: StudentDetail | undefined = studList.find(
                (e) => e.studentId === studId.id
            );
            //Find Subject of Student
            filtSubject = subjects.find(
                (e) => e.trim() === filtStudId?.subject.trim()
            );
            console.log(filtSubject);
            let findTeacher = Teacher.teacherList.find((e) => e.subject === filtSubject)
            //if Student ID is Available
            if (filtStudId?.studentId) {
                 //Create a new ID for a Replace Teacher
                 let replceTeacherId = Math.floor(Math.random() * 90000) + 10000;
                 //check if the teacher is not available
                 if (findTeacher) {
                     // filtTeacher = Teacher.teacherList.filter((e) => {
                     //     return e.subject !== filtSubject;
                     // });
                     // Teacher.teacherList = filtTeacher;
                     
                     //replace from a last remove teacher
                     
                     filtStudId.teacher = findTeacher.name;
                     console.log(`\n Dear ${filtStudId.name},Your Teacher is ${findTeacher.name} for subject ${filtStudId.subject}.\n`);
                 }else{
                    let newTeacher ={name: "Sam",
                        id: replceTeacherId,
                        email: `sam${replceTeacherId.toString().slice(0,3)}@gmail.com`,
                        subject: filtSubject,
                        role: "user",}
                    Teacher.teacherList.push(newTeacher);
                    filtStudId.teacher = newTeacher.name;
                    console.log(`\n Dear ${filtStudId.name},Your Teacher is ${newTeacher.name} for subject ${filtStudId.subject}.\n`)
                 }
                //Tell the student who is the teacher of his subject
                // let slectTeacher = await inquirer.prompt([
                //     {
                //         name: "teacher",
                //          message:// () => {
                //         //     for (let i = 0; i < subjects.length; i++) {
                //         //         if (
                //         //             filtSubject?.trim().toLowerCase() ===
                //         //             teacherList[i].subject?.trim().toLowerCase()
                //         //         ) {
                //                  `Teacher of ${filtSubject} is ${findTeacher?.name}.`,
                //         //         } else {
                //         //             return `Teacher of ${filtSubject} is Sam`;
                //         //         }
                //         //     }
                //         // },
                //         type: "list",
                //         choices: [... new Set(replceTeacher.map((e) => e.name))],
                //     },
                // ]);
                let { studentId, name, email, subject } = filtStudId;
                //add Student and Teacher into Student List 
                Student.enrollStudent(
                    name,
                    email,
                    studentId,
                    persRole,
                    subject,
                    // slectTeacher.teacher
                );
                // Student.showStudent();
                // Teacher.showTeachers();
            } else {
                //if Student ID is not available
                console.log(
                    `ID: ${studId.id} is not available,Please Enter a Correct ID Again`
                );
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
    } else if (universityOptin.UniversityOption === "Visit of Department") {
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
                //Show the List of Teacher
                console.log(`\n ### LIST OF STUDENT ###`);
                Student.showStudent();
                console.log(`\n ### END ###`);
            } else if (deparmntOption.departmentOption === "Teacher List") {
                //Show the List of Teacher
                console.log(`\n ### LIST OF STUDENT ###`);
                Teacher.showTeachers();
                console.log(`\n ### END ###`);
            } else if (deparmntOption.departmentOption === "Add Teacher") {
                //Using Inquirer to Find Admin
                let checkIdAdmin = await inquirer.prompt([
                    {
                        name: "adminFind",
                        message: "Enter your ID for if you are admin or not",
                        type: "number",
                    },
                ]);
                //Find Admin
                let findAdmin = Teacher.teacherList.find((e) => e.role === admins);
                console.log(findAdmin?.role);
                // let findAdminID = Teacher.teacherList.find((e) => e.id === findAdmin?.id);
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
                            message: "ENter a Teacher Email",
                            type: "string",
                        },
                        {
                            name: "techrSubject",
                            message: "Enter a Teacher Subject",
                            type: "string",
                        },
                    ]);
                    let newTeacherID = Math.floor(Math.random() * 90000) + 10000;
                    //Find Duplicate ID
                    let duplicateTeacherID = Teacher.teacherList.find(
                        (e) => e.id === newTeacherID
                    );
                    //Find Duplicate Email
                    let duplicateTeacherEmail = teacherList.find((e) => {
                        return e.email === addTeacher.techrEmail;
                    });
                    //Catch Duplicate ID
                    if (duplicateTeacherID?.id) {
                        console.log(
                            `ID ${newTeacherID} is already exist, Please add a Teacher Again.`
                        );
                    } else {
                        //Catch Duplicate Email
                        if (duplicateTeacherEmail?.email) {
                            console.log(
                                `Email : ${addTeacher.techrEmail}, is already exist. Please fill the form again with new Email`
                            );
                        } else {
                            //if name syntax is incorrect
                            if (
                                addTeacher.techrName === "" ||
                                (addTeacher.techrName as string).length < 3
                            ) {
                                console.log(
                                    `Please Enter The  Name of Teacher and fill the form again and the must be 3 character`
                                );
                            } else {
                                //if email syntax is incorrect
                                if (
                                    !(addTeacher.techrEmail as string).match(
                                        /^([a-z_0-9]+)@([a-z]+)\.([a-z]){2,7}$/
                                    )
                                ) {
                                    console.log(
                                        `Dear ${addTeacher.techrName}, Please Enter a Correct Email and fill the form again.`
                                    );
                                } else {
                                    let { techrName, techrEmail, techrSubject } = addTeacher;
                                    //Add new Teachers in the Teacher List
                                    Department.addStudent(
                                        techrName,
                                        techrEmail,
                                        newTeacherID,
                                        techrSubject,
                                        persRole
                                    );
                                    subjectList.push(techrSubject);
                                }
                            }
                        }
                        //Show ID if name and email is correct
                        if (
                            addTeacher.techrName !== "" &&
                            (addTeacher.techrName as string).length >= 3 &&
                            (addTeacher.techrEmail as string).match(
                                /^([a-z_0-9]+)@([a-z]+)\.([a-z]){2,7}$/
                            ) &&
                            !duplicateTeacherEmail
                        ) {
                            console.log(
                                `Dear ${addTeacher.techrName}, Your ID is ${newTeacherID}`
                            );
                        }
                    }
                } else {
                    //if ID is not an Admin ID
                    console.log(
                        `ID ${checkIdAdmin.adminFind} is not an Admin ID only Admin can Add a Teacher.`
                    );
                }
            } else if (deparmntOption.departmentOption === "Remove Teacher") {
                //Using inquirer to find Admin
                let findAdminForRemTechr = await inquirer.prompt([
                    {
                        name: "findAdmin",
                        message: "Enter your ID for if you are admin or not",
                        type: "number",
                    },
                ]);
                //Find Admin in Teacher List
                let findAdminRem = Teacher.teacherList.find((e) => e.role === admins);
                console.log(findAdminRem?.role);
                // let findAdmnId = Teacher.teacherList.find((e) => e.id === findAdminRem?.id);
                let { findAdmin } = findAdminForRemTechr;
                //check admin id is equal to inquirer id
                if (findAdminRem?.id === findAdmin) {
                    let removeTeacher = await inquirer.prompt([
                        {
                            name: "teacherRem",
                            message: "Enter a Teacher ID for remove a Teacher:",
                            type: "number",
                        },
                    ]);
                    let { teacherRem } = removeTeacher;
                    //Find the ID of Teacher
                    let findId = Teacher.teacherList.find((e) => e.id === teacherRem);
                    //check if Teacher ID is Available
                    if (findId?.id) {
                        // Delete a Teacher in Teacher List
                        let filterTeacherList = Teacher.teacherList.filter((e) => {
                            return e.id !== findId.id;
                        });
                        console.log(`Dear Students, Teacher ${findId.name} is Remove.`);
                        //update the teacher list in class teacher on delete a Teacher
                        Teacher.teacherList = filterTeacherList;
                        //Find if the teacher is not available
                        // findTechrSubject = Teacher.teacherList.find(
                        //     (e) => e.subject === findId.subject
                        // );
                        //assign update data to replceTeacher
                        // replceTeacher = Teacher.teacherList;
                       
                    } else {
                        //if ID is not avaiable in Teacher List
                        console.log(`ID:${teacherRem}is not Available.`);
                    }
                } else {
                    //if ID not an Admin ID
                    console.log(
                        `ID: ${findAdmin} is not an Admin ID only Admin can Remove a Teacher.`
                    );
                }
            }else if(deparmntOption.departmentOption === "Remove Student"){
                //Find Admin to Remove a Student
                let findAdminForRemStud = await inquirer.prompt([
                    {
                        name: "findAdmin",
                        message: "Enter your ID for if you are admin or not:",
                        type: "number",
                    },
                ]);
                 //Find Admin in Teacher List
                 let findAdminStud = Teacher.teacherList.find((e) => e.role === admins);
                 console.log(findAdminStud?.role);
                 // let findAdmnId = Teacher.teacherList.find((e) => e.id === findAdminRem?.id);
                 let { findAdmin } = findAdminForRemStud;
                 // if Inquirer id is equal to Admin ID
                 if(findAdmin === findAdminStud?.id){
                    let removeStudent = await inquirer.prompt([
                        {
                            name: "studentRem",
                            message: "Enter a Student ID for remove a Teacher:",
                            type: "number",
                        },
                    ]);
                    let { studentRem } = removeStudent;
                    let findStudId = Student.studList.find((e) => e.studentId === studentRem);
                    if(findStudId?.studentId){
                        let filterStud = Student.studList.filter((e) => {
                            return e.studentId !== findStudId.studentId; 
                        });
                        console.log(`Student ${findStudId.name} is Remove`);
                        Student.studList = filterStud;
                    }else{
                        console.log(`ID: ${studentRem} is not Available.`);
                    }

                 }else{
                    console.log(`ID : ${findAdmin} is not an Admin ID`);
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
