class Workout {
  constructor(id, coachId, title, description) {
    this.id = id;
    this.coachId = coachId;
    this.title = title;
    this.description = description;
  }
}

module.exports = {
  Workout,
};
