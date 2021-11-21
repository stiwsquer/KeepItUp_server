class Conversation {
  constructor(data = {}) {
    this.id = data.id;
    this.client = data.client;
    this.coach = data.coach;
  }
}

module.exports = {
  Conversation,
};
