class Exercise {
  constructor(data = {}) {
    this.id = data.id;
    this.coachId = data.coachId;
    this.bodyPart = data.bodyPart;
    this.equipment = data.equipment;
    this.name = data.name;
    this.target = data.target;
    this.url = data.url;
  }
}

module.exports = {
  Exercise,
};
