const Announcement = require('../models/Announcement');

exports.listAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll({
      order: [['date', 'DESC']]
    });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching announcements', error: error.message });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, content, priority } = req.body;
    const announcement = await Announcement.create({
      title,
      content,
      priority
    });
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: 'Error creating announcement', error: error.message });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByPk(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    await announcement.destroy();
    res.json({ message: 'Announcement deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting announcement', error: error.message });
  }
};
