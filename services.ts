// Ideas:
// Build dynamically created classmates: collection of first names, collection of lastnames, randomly pick birth date
import * as _ from 'underscore';

import { firstNames, Geography, lastNames, Mathematics, Subjects } from "./constants";
import { Classroom, School, Student, Teacher } from "./entities";
import { fullName, getRandomBirthDate, getRandomValueFromArray } from "./helpers";

export function initializeSchool(): School {
    const student1: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student2: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student3: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student4: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());

    const teacher1: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Mathematics]);

    const student5: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student6: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student7: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student8: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student9: Student = createStudent('Vasya','Sidorov', getRandomBirthDate());


    const teacher2: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Geography]);

    const Class1: Classroom = createClassroom(getRandomValueFromArray(Subjects), teacher1, [student1, student2, student3, student4]);
    const Class2: Classroom = createClassroom(getRandomValueFromArray(Subjects), teacher2, [student5, student6, student7, student8, student9]);

    return {
        name: "Big school",
        address: "Moscow",
        phone: "+7 (916) 000 12 21",
        classes: [
            Class1,
            Class2
        ]
    }
}

function createTeacher(firstName: string, lastName: string, professions: string[]): Teacher {
    return {
        firstName: firstName,
        lastName: lastName,
        fullName: () =>{
            return fullName(firstName, lastName)
        },
        professions: professions
    };
}

function createStudent(firstName: string, lastName: string, birthDate: Date): Student {
    return {
        firstName: firstName,
        lastName: lastName,
        fullName: () =>{
            return fullName(firstName, lastName)
        },
        birthDate: birthDate,
        age: () => {
                var ageDifMs = Date.now() - birthDate.getTime();
                var ageDate = new Date(ageDifMs);
                return Math.abs(ageDate.getUTCFullYear() - 1970);
            }
    };
}

function createClassroom(name: string, teacher: Teacher, students: Student[]): Classroom {
    return {
        name: name,
        teacher: teacher, 
        students: students
    };
}

export function getClassYoungestStudent(classroom: Classroom): string {
    return _.sortBy(classroom.students, student => -student.birthDate)[0].fullName() ;
}

export function printSchool(school: School): void {
    console.log("School data:");
    console.log("============");
    console.log(school.name);
    console.log(school.address);
    console.log(school.phone);
    console.log('\nClasses\n============')
    let classIndex = 0
    _.sortBy(school.classes, classe => classe.name).forEach(classe => {        
        console.log(`Class ${++classIndex}: ${classe.name}`);
        console.log(`Teacher: ${classe.teacher.fullName()}, ${classe.teacher.professions.join(', ')}`);
        classe.students.sort((a, b) => {
            const result = a.lastName.localeCompare(b.lastName);
  
            return result !== 0 ? result : a.firstName.localeCompare(b.firstName);
          });
        for (let studentIndex = 0; studentIndex < classe.students.length; studentIndex++) {
            console.log(`${studentIndex + 1}: ${classe.students[studentIndex].fullName()}: ${classe.students[studentIndex].age()}`);
            
        }

    })
}
export function  transferStudent(fullName: string, fromClassroom: Classroom, toClassroom: Classroom): void {
    let a = _.find(fromClassroom.students, name => name.fullName() == fullName)
    if (a){
    toClassroom.students.push(a)
    fromClassroom.students = fromClassroom.students.filter(name => name.fullName != a?.fullName)
    console.log('Transfer is complete!')
}}

export function initializeSchool2(name:string,address:string, phone:string, numberOfClasses:number) : School {
    let classes: Classroom[] = [];
    for (let number = 0; number < numberOfClasses; number++) {
        let students:Student[] = [];
        let numberOfStudents:number = Math.floor(Math.random()*31);
        for (let numberOfStudent:number = 0; numberOfStudent < numberOfStudents; numberOfStudent++){
            students.push(createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate()))
        }
        classes.push(createClassroom(getRandomValueFromArray(Subjects), createTeacher(getRandomValueFromArray(firstNames), 
        getRandomValueFromArray(lastNames), Array.from({length: 2}, () => getRandomValueFromArray(Subjects)).filter((v, i, a) => a.indexOf(v) === i)), students))
        
    }
    return {
        name: name,
        address: address,
        phone: phone,
        classes: classes
    }

}
