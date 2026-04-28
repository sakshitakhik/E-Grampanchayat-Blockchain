const Poll = require('../models/Poll');
const Vote = require('../models/Vote');
const { sequelize } = require('../config/database');

exports.createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;
    const poll = await Poll.create({ question, options });
    res.status(201).json(poll);
  } catch (error) {
    res.status(500).json({ message: 'Error creating poll', error: error.message });
  }
};

exports.listPolls = async (req, res) => {
  try {
    const polls = await Poll.findAll({ where: { active: true } });
    
    // Map each poll to include option-wise vote counts
    const pollsWithResults = await Promise.all(polls.map(async (poll) => {
      const votes = await Vote.findAll({
        where: { pollId: poll.id },
        attributes: ['optionIndex', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
        group: ['optionIndex'],
        raw: true
      });

      // Transform votes array into a map for easy lookup
      const voteMap = {};
      votes.forEach(v => voteMap[v.optionIndex] = parseInt(v.count));

      // Map options strings to objects with votes
      const optionsWithVotes = poll.options.map((optionText, index) => ({
        text: optionText,
        votes: voteMap[index] || 0
      }));

      return {
        ...poll.toJSON(),
        optionsWithVotes // We add this field for the UI
      };
    }));

    res.json(pollsWithResults);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching polls', error: error.message });
  }
};

exports.vote = async (req, res) => {
  try {
    const { optionIndex, userId } = req.body;
    const pollId = req.params.id;

    // Use userId from body as priority, fallback to token user
    const finalUserId = userId || (req.user && req.user.id) || null;

    if (finalUserId) {
      // Check if this specific user has already cast a vote in this poll
      const existingVote = await Vote.findOne({
        where: { pollId, userId: finalUserId }
      });

      if (existingVote) {
        return res.status(400).json({ 
          message: 'This user has already voted in this poll',
          voted: true 
        });
      }
    }

    const vote = await Vote.create({
      pollId,
      userId: finalUserId,
      optionIndex
    });

    res.status(201).json(vote);
  } catch (error) {
    res.status(500).json({ message: 'Error casting vote', error: error.message });
  }
};

exports.getResults = async (req, res) => {
  try {
    const pollId = req.params.id;
    const poll = await Poll.findByPk(pollId);
    
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    const results = await Vote.findAll({
      where: { pollId },
      attributes: [
        'optionIndex',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['optionIndex']
    });

    res.json({ poll, results });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching results', error: error.message });
  }
};
