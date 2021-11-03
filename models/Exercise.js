class Exercise {
  constructor(id, coachId, bodyPart, equipment, name, target, url) {
    this.id = id;
    this.coachId = coachId;
    this.bodyPart = bodyPart;
    this.equipment = equipment;
    this.name = name;
    this.target = target;
    this.url = url;
  }
}

module.exports = {
  Exercise,
};
