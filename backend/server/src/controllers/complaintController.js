const Complaint = require('../models/Complaint');
const User = require('../models/User');
const { logToBlockchain } = require('../utils/blockchain');

exports.submit = async (req, res) => {
  try {
    const { subject, description, userId } = req.body;
    const complaint = await Complaint.create({
      userId: userId || req.user?.id || null,
      subject,
      description
    });

    // Log to Blockchain for immutability
    logToBlockchain({
      type: 'COMPLAINT_SUBMITTED',
      complaintId: complaint.id,
      userId: complaint.userId,
      subject: complaint.subject,
      timestamp: complaint.createdAt
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting complaint', error: error.message });
  }
};

exports.listComplaints = async (req, res) => {
  try {
    let whereClause = {};
    // If a userId is explicitly passed or decoded from token, filter by it
    // Otherwise, show all (since we are in permissive mode)
    if (req.user && req.user.id) {
      whereClause.userId = req.user.id;
    }

    const complaints = await Complaint.findAll({
      where: whereClause,
      include: [{ model: User, attributes: ['name', 'email'] }],
      order: [['date', 'DESC']]
    });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints', error: error.message });
  }
};

exports.resolve = async (req, res) => {
  try {
    const complaint = await Complaint.findByPk(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.status = 'Resolved';
    await complaint.save();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Error resolving complaint', error: error.message });
  }
};
