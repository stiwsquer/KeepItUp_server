class Calendar {
  constructor(data = {}) {
    this.id = data.id;
    this.date = data.date;
    this.clientId = data.clientId;
    this.workoutId = data.workoutId;
    this.coachId = data.coachId;
  }
}

module.exports = {
  Calendar,
};
