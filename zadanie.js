var input = require("prompt-sync")();
var CLOSE_OPTION = '7';
var grade = "";
// =====================================================================
var Diary = /** @class */ (function () {
    function Diary(students) {
        this.students = students;
    }
    Diary.prototype.printStudents = function () {
        console.log("================================");
        for (var i = 0; i < this.students.length; i++) {
            var currentStudent = this.students[i];
            console.log();
            console.log(currentStudent.getFullName(), "|", currentStudent.getIndex(), "|", currentStudent.getGrades().join(','));
        }
        console.log("================================");
    };
    Diary.prototype.addStudent = function () {
        var firstnameOfStudent = input("Podaj imie: ");
        var lastnameOfStudent = input("Podaj nazwisko: ");
        var indexOfStudent = input("Podaj indeks: ");
        if (this.doesIndexExists(indexOfStudent)) {
            console.log("Ten indeks jest zajęty.");
            return;
        }
        var student = new Student(firstnameOfStudent, lastnameOfStudent, indexOfStudent, []);
        this.students.push(student);
    };
    Diary.prototype.doesIndexExists = function (indexOfStudent) {
        for (var i = 0; i < this.students.length; i++) {
            var currentStudentIndex = this.students[i].getIndex();
            if (currentStudentIndex == indexOfStudent) {
                return true;
            }
        }
        return false;
    };
    Diary.prototype.getStudentIndexFromArray = function (indexOfStudent) {
        for (var i = 0; i < this.students.length; i++) {
            var currentStudentIndex = this.students[i].getIndex();
            if (currentStudentIndex == indexOfStudent) {
                return i;
            }
        }
        return -1;
    };
    Diary.prototype.removeStudent = function () {
        var indexOfStudent = input("Podaj indeks: ");
        for (var i = 0; i < this.students.length; i++) {
            var currentStudentIndex = this.students[i].getIndex();
            if (currentStudentIndex == indexOfStudent) {
                var leftSideOfArr = this.students.slice(0, i);
                var rightSideOfArr = this.students.slice(i + 1);
                this.students = leftSideOfArr.concat(rightSideOfArr);
                return;
            }
        }
        console.log("Nie ma ucznia z takim indeksem");
    };
    Diary.prototype.changeStudentData = function () {
        var indexOfStudent = input("Podaj indeks: ");
        var indexInArray = this.getStudentIndexFromArray(indexOfStudent);
        var doesStudentExist = indexInArray != -1;
        if (doesStudentExist) {
            var firstnameOfStudent = input("Podaj imie: ");
            var lastnameOfStudent = input("Podaj nazwisko: ");
            this.students[indexInArray].changeData(firstnameOfStudent, lastnameOfStudent);
            console.log("Poprawnie zmieniono dane ucznia.");
        }
        else {
            console.log("Nie ma ucznia z takim indeksem");
        }
    };
    Diary.prototype.showStudentData = function () {
        var indexOfStudent = input("Podaj indeks: ");
        var indexInArray = this.getStudentIndexFromArray(indexOfStudent);
        var doesStudentExist = indexInArray != -1;
        if (doesStudentExist) {
            console.log("======================");
            console.log("Imie i nazwisko:", this.students[indexInArray].getFullName());
            console.log("Nr. Indeksu:", this.students[indexInArray].getIndex());
            console.log("Oceny:", this.students[indexInArray].getGrades());
            console.log("Srednia ocen:", this.students[indexInArray].getAvgStudentGrade());
            console.log("======================");
        }
        else {
            console.log("Nie ma ucznia z takim indeksem");
        }
    };
    Diary.prototype.addStudentGrade = function () {
        var indexOfStudent = input("Podaj indeks: ");
        var indexInArray = this.getStudentIndexFromArray(indexOfStudent);
        if (indexInArray != -1) {
            console.log("Aby zakończyć dodawanie ocen wpisz słowo kluczowe END");
            var possibleGrades = ['1', '2', '3', '4', '5', '6'];
            while (grade != "END") {
                grade = input("Podaj ocene: ");
                if (possibleGrades.includes(grade)) {
                    this.students[indexInArray].addGrade(grade);
                }
                else if (grade == "END") {
                    console.log("Zakończono dodawanie ocen");
                }
                else
                    (console.log("Podaj poprawną ocenę."));
            }
            grade = "";
        }
        else
            (console.log("Nie ma ucznia z takim indeksem"));
    };
    Diary.prototype.getStudents = function () {
        return this.students;
    };
    return Diary;
}());
// =====================================================================
var Student = /** @class */ (function () {
    function Student(firstname, lastname, index, grades) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.index = index;
        this.grades = grades;
    }
    Student.prototype.changeData = function (firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    };
    Student.prototype.addGrade = function (grade) {
        this.grades.push(grade);
    };
    Student.prototype.getFirstName = function () {
        return this.firstname;
    };
    Student.prototype.getLastName = function () {
        return this.lastname;
    };
    Student.prototype.getFullName = function () {
        return this.firstname + " " + this.lastname;
    };
    Student.prototype.getIndex = function () {
        return this.index;
    };
    Student.prototype.getGrades = function () {
        return this.grades;
    };
    Student.prototype.getAvgStudentGrade = function () {
        var sumOfGrades = 0;
        for (var i = 0; i < this.grades.length; i++) {
            var currentGrade = parseFloat(this.grades[i]);
            sumOfGrades = currentGrade + sumOfGrades;
        }
        var avgStudentGrade = sumOfGrades / this.grades.length;
        return avgStudentGrade;
    };
    return Student;
}());
// =====================================================================
var MenuOption;
(function (MenuOption) {
    MenuOption[MenuOption["ADD_STUDENT"] = 1] = "ADD_STUDENT";
    MenuOption[MenuOption["REMOVE_STUDENT"] = 2] = "REMOVE_STUDENT";
    MenuOption[MenuOption["CHANGE_STUDENT_DATA"] = 3] = "CHANGE_STUDENT_DATA";
    MenuOption[MenuOption["SHOW_STUDENTS"] = 4] = "SHOW_STUDENTS";
    MenuOption[MenuOption["SHOW_STUDENT_DATA"] = 5] = "SHOW_STUDENT_DATA";
    MenuOption[MenuOption["ADD_GRADE"] = 6] = "ADD_GRADE";
    MenuOption[MenuOption["CLOSE"] = 7] = "CLOSE";
})(MenuOption || (MenuOption = {}));
// =====================================================================
var uczen1 = new Student("Janek", "Krawczyk", "19", ["5", "4", "3", "5"]);
var uczen2 = new Student("Adam", "Kowalski", "23", ["1", "2", "2", "1"]);
var uczen3 = new Student("Adam", "Mickiewicz", "98", ["2", "2", "1"]);
var storage = new Diary([uczen1, uczen2, uczen3]);
var menuResponse = "";
while (+menuResponse != MenuOption.CLOSE) {
    console.log("======================");
    console.log("   MENU    ");
    console.log("1. Dodaj ucznia");
    console.log("2. Usun ucznia");
    console.log("3. Edytuj dane ucznia");
    console.log("4. Wyswietl wszystkich uczniow");
    console.log("5. Wyswietl dane ucznia ");
    console.log("6. Dodaj ocene");
    console.log("7. WYJDZ");
    console.log("======================");
    menuResponse = input("Wybierz opcje: ");
    switch (+menuResponse) {
        case MenuOption.ADD_STUDENT: {
            storage.addStudent();
            break;
        }
        case MenuOption.REMOVE_STUDENT: {
            storage.removeStudent();
            break;
        }
        case MenuOption.CHANGE_STUDENT_DATA: {
            storage.changeStudentData();
            break;
        }
        case MenuOption.SHOW_STUDENTS: {
            storage.printStudents();
            break;
        }
        case MenuOption.SHOW_STUDENT_DATA: {
            storage.showStudentData();
            break;
        }
        case MenuOption.ADD_GRADE: {
            storage.addStudentGrade();
            break;
        }
        case MenuOption.CLOSE: {
            console.log("Zamykanie...");
            break;
        }
        default: {
            console.log("Nie wybrano zadnej opcji.");
            break;
        }
    }
}
