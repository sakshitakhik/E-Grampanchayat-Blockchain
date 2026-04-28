const Application = require('../models/Application');
const User = require('../models/User');
const { logToBlockchain } = require('../utils/blockchain');

exports.apply = async (req, res) => {
  try {
    const { type, documents, remarks, userId, applicantName, aadharNumber } = req.body;
    const application = await Application.create({
      userId: userId || req.user?.id || null,
      applicantName,
      aadharNumber,
      type,
      documents,
      remarks
    });

    // Log application request to blockchain
    logToBlockchain({
      type: 'CERTIFICATE_APPLIED',
      applicationId: application.id,
      applicant: applicantName,
      userId: application.userId,
      certificateType: application.type,
      timestamp: application.createdAt
    });

    res.status(201).json(application.get({ plain: true }));
  } catch (error) {
    res.status(500).json({ message: 'Error applying for certificate', error: error.message });
  }
};

exports.getApplication = async (req, res) => {
  console.log('Search request received for ID:', req.params.id);
  try {
    const { id } = req.params;
    let application;
    
    // Check if ID is a valid UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    
    if (uuidRegex.test(id)) {
      console.log('Searching by UUID...');
      application = await Application.findByPk(id, {
        include: [{ model: User, attributes: ['name', 'email'] }]
      });
    } else {
      console.log('Searching by Aadhar...');
      application = await Application.findOne({
        where: { aadharNumber: id },
        include: [{ model: User, attributes: ['name', 'email'] }],
        order: [['appliedDate', 'DESC']]
      });
    }

    if (!application) {
      console.log('Application not found');
      return res.status(404).json({ message: 'Application not found' });
    }

    // Convert to plain object to avoid circular reference issues during serialization
    const applicationData = application.get({ plain: true });
    
    console.log('Application found, sending response:', applicationData.id);
    res.json(applicationData);
  } catch (error) {
    console.error('getApplication Error:', error.message);
    res.status(500).json({ message: 'Error fetching application', error: error.message });
  }
};

exports.listApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({
      include: [{ model: User, attributes: ['name', 'email'] }],
      order: [['appliedDate', 'DESC']]
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error listing applications', error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const application = await Application.findByPk(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    if (remarks) application.remarks = remarks;
    await application.save();

    // Log status update (especially approvals/rejections) to blockchain
    logToBlockchain({
      type: 'CERTIFICATE_STATUS_UPDATE',
      applicationId: application.id,
      newStatus: status,
      remarks: application.remarks,
      timestamp: new Date().toISOString()
    });

    res.json(application.get({ plain: true }));
  } catch (error) {
    res.status(500).json({ message: 'Error updating application status', error: error.message });
  }
};

exports.getCertificate = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['name', 'email'] }]
    });

    if (!application) {
      return res.status(404).json({ message: 'Certificate application not found' });
    }

    if (application.status !== 'Approved') {
      return res.status(400).json({ message: 'Certificate is not yet approved/generated' });
    }

    // Try to get the blockchain audit trail
    let blockchainVerification = null;
    try {
      const axios = require('axios');
      const response = await axios.get(`${process.env.BLOCKCHAIN_URL}/search/${application.id}`);
      // Get the latest block for this application (likely the approval block)
      if (response.data && response.data.length > 0) {
        blockchainVerification = response.data[response.data.length - 1].hash;
      }
    } catch (e) {
      console.error('Blockchain fetch failed for certificate:', e.message);
    }

    res.json({
      ...application.get({ plain: true }),
      verificationHash: blockchainVerification || 'BLOCKCHAIN_AUTH_PENDING'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating certificate record', error: error.message });
  }
};
