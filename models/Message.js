class Message {
  constructor(data = {}) {
    this.id = data.id;
    this.conversation = data.conversation;
    this.createdAt = data.createdAt;
    this.client = data.client;
    this.coach = data.coach;
    this.content = data.content;
  }
}

module.exports = {
  Message,
};
