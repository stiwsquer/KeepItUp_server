class Calendar {
  constructor(id, date, clientId, workoutId, coachId) {
    this.id = id;
    this.date = date;
    this.clientId = clientId;
    this.workoutId = workoutId;
    this.coachId = coachId;
  }
}

module.exports = {
  Calendar,
};
