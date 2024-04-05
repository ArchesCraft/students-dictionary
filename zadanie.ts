const input = require("prompt-sync")();
const CLOSE_OPTION = '7';
let menuResponse = "";
let grade = "";

class Diary{
    private students:Student[];
    constructor(students:Student[]){
      this.students = students
    }
    printStudents(){
      console.log("================================")
      for (let i = 0; i < this.students.length; i++) {
        const currentStudent = this.students[i];
        console.log()
        console.log(currentStudent.getFullName(),"|", currentStudent.getIndex(),"|" , currentStudent.getGrades().join(','))
      }
      console.log("================================")
    }
    addStudent(){
        const firstnameOfStudent = input("Podaj imie: ");
        const lastnameOfStudent = input("Podaj nazwisko: ");
        const indexOfStudent = input("Podaj indeks: ");
        if(this.doesIndexExists(indexOfStudent)){
          console.log("Ten indeks jest zajęty.")
          return;
        }
        const student = new Student(firstnameOfStudent, lastnameOfStudent, indexOfStudent, []);
        this.students.push(student)
    }
    doesIndexExists(indexOfStudent:string){
      for (let i = 0; i < this.students.length; i++) {
        const currentStudentIndex = this.students[i].getIndex();
        if(currentStudentIndex == indexOfStudent){
          return true;
        }
      }
      return false;
    }
    getStudentIndexFromArray(indexOfStudent:string){
      for (let i = 0; i < this.students.length; i++) {
        const currentStudentIndex = this.students[i].getIndex();
        if(currentStudentIndex == indexOfStudent){
          return i;
        }
      }
      return -1;
    }
    removeStudent(){
      const indexOfStudent = input("Podaj indeks: ")
      for (let i = 0; i < this.students.length; i++) {
        const currentStudentIndex = this.students[i].getIndex();
        if(currentStudentIndex == indexOfStudent){
          const leftSideOfArr = this.students.slice(0,i)
          const rightSideOfArr = this.students.slice(i+1)
          this.students = leftSideOfArr.concat(rightSideOfArr)
          return;
        }
      }
      console.log("Nie ma ucznia z takim indeksem")
    }
    changeStudentData(){
      const indexOfStudent = input("Podaj indeks: ")
      const indexInArray = this.getStudentIndexFromArray(indexOfStudent);
      const doesStudentExist = indexInArray != -1;
      if(doesStudentExist){
        const firstnameOfStudent = input("Podaj imie: ")
        const lastnameOfStudent = input("Podaj nazwisko: ")
        this.students[indexInArray].changeData(firstnameOfStudent, lastnameOfStudent)
        console.log("Poprawnie zmieniono dane ucznia.")
      }
      else{
        console.log("Nie ma ucznia z takim indeksem")
      }
    }
    showStudentData(){
      const indexOfStudent = input("Podaj indeks: ")
      const indexInArray = this.getStudentIndexFromArray(indexOfStudent);
      const doesStudentExist = indexInArray != -1;
      if(doesStudentExist){
        console.log("======================");
        console.log("Imie i nazwisko:", this.students[indexInArray].getFullName())
        console.log("Nr. Indeksu:", this.students[indexInArray].getIndex())
        console.log("Oceny:", this.students[indexInArray].getGrades())
        console.log("Srednia ocen:", this.students[indexInArray].getAvgStudentGrade())
        console.log("======================");
      }
      else{
        console.log("Nie ma ucznia z takim indeksem")
      }
    }
    addStudentGrade(){
      const indexOfStudent = input("Podaj indeks: ")
      const indexInArray = this.getStudentIndexFromArray(indexOfStudent);
      if(indexInArray != -1){
          console.log("Aby zakończyć dodawanie ocen wpisz słowo kluczowe END")
          const possibleGrades = ['1', '2', '3', '4', '5', '6']
            while (grade != "END"){
              grade = input("Podaj ocene: ")
              if(possibleGrades.includes(grade)){
                this.students[indexInArray].addGrade(grade);
              }
              else if(grade == "END"){
                console.log("Zakończono dodawanie ocen")
              }
              else(
                console.log("Podaj poprawną ocenę.")
              )
            }
            grade = "" // tutaj trzeba zrestartowac grade bo inaczej jak juz wczesniej dodawalem oceny to zostaje END i wywala petle while
      }
      else(
        console.log("Nie ma ucznia z takim indeksem")
      )
    }
    getStudents(){
      return this.students;
    }
}

class Student{
    private firstname: string;
    private lastname: string;
    private index: string;
    private grades: string[];
    constructor(firstname:string, lastname:string, index:string, grades:string[]){
        this.firstname = firstname;
        this.lastname = lastname;
        this.index = index;
        this.grades= grades;
    }
    changeData(firstname:string,lastname:string){
      this.firstname = firstname;
      this.lastname = lastname;
    }
    addGrade(grade:string){
      this.grades.push(grade);
    }
    getFirstName(){
      return this.firstname;
    }
    getLastName(){
      return this.lastname;
    }
    getFullName(){
      return this.firstname + " " + this.lastname;
    }
    getIndex(){
      return this.index;
    }
    getGrades(){
      return this.grades;
    }
    getAvgStudentGrade(){
      let sumOfGrades = 0;
        for (let i = 0; i < this.grades.length; i++) {
            const currentGrade = parseFloat(this.grades[i]);
            sumOfGrades = currentGrade + sumOfGrades;
        }
        const avgStudentGrade = sumOfGrades/this.grades.length
        return avgStudentGrade;
    }
}

const uczen1 = new Student("Janek", "Krawczyk", "19", ["5","4","3","5"])
const uczen2 = new Student("Adam", "Kowalski", "23", ["1","2","2","1"])
const uczen3 = new Student("Adam", "Mickiewicz", "98", ["2","2","1"])
const storage = new Diary([uczen1,uczen2,uczen3])

while (menuResponse != CLOSE_OPTION) {
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
  switch (menuResponse) {
    case "1": {
      storage.addStudent()
      break;
    }
    case "2": {
      storage.removeStudent();
      break;
    }
    case "3": {
      storage.changeStudentData();
      break;
    }
    case "4": {
      //console.table(storage.getStudents());
      storage.printStudents()
      break;
    }
    case "5": {
      storage.showStudentData();
      break;
    }
    case "6": {
      storage.addStudentGrade();
      break;
    }
    case CLOSE_OPTION: {
      console.log("Zamykanie...");
      break;
    }
    default: {
      console.log("Nie wybrano zadnej opcji.");
      break;
    }
  }
}