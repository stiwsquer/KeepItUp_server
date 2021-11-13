class Calendar {
  constructor(data = {}) {
    this.id = data.id;
    this.date = data.date;
    this.client = data.client;
    this.workout = data.workout;
    this.coach = data.coach;
  }
}

module.exports = {
  Calendar,
};
