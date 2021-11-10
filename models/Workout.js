class Workout {
  constructor(data = {}) {
    this.id = data.id;
    this.coach = data.coach;
    this.title = data.title;
    this.description = data.description;
    this.exercises = data.exercises;
  }
}

module.exports = {
  Workout,
};
