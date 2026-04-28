const User = require('./User');
const Application = require('./Application');
const Complaint = require('./Complaint');
const Announcement = require('./Announcement');
const Poll = require('./Poll');
const Vote = require('./Vote');

// Centralizing associations (some are already in models, but good to keep clear)
module.exports = {
  User,
  Application,
  Complaint,
  Announcement,
  Poll,
  Vote
};
