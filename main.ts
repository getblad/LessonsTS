import { School } from "./entities";
import { getClassYoungestStudent as getClassYoungestStudentFullName, initializeSchool, initializeSchool2, printSchool, transferStudent } from "./services";

const school: School = initializeSchool();

// Task 1
printSchool(school);


// Task 2
// Because it's not exported, and also commented. Also there is no conts Subjects, from which we can get it for our classes.

// Task 3
// In services.ts and constants.ts files

// Task 4
// helpers.ts and services.ts

// Task 5
console.log(getClassYoungestStudentFullName(school.classes[1]));

// Task 6
// services.ts

// Task 7
console.log('########################################')
transferStudent('Vasya Sidorov', school.classes[1], school.classes[0]);

printSchool(school);

// Task 8
const school2: School = initializeSchool2('VSU','Lenina, 14','+9008', 2);
printSchool(school2);