export class Student {
  constructor(id, name, grades = {}) {
    this.id = id;
    this.name = name;
    this.grades = grades;
  }

  addGrade(subject, grade) {
    this.grades[subject] = grade;
  }

  removeGrade(subject) {
    delete this.grades[subject];
  }

  getAverageGrade() {
    const values = Object.values(this.grades);
    if (values.length === 0) {
        return 0;
    }
    
    const sum = values.reduce((acc, g) => acc + g, 0);
    return sum / values.length;
  }

    get summary() {
    return `Студент ${this.name} (id: ${this.id}) — средний балл: ${this.getAverageGrade().toFixed(2)}`;
  }
}