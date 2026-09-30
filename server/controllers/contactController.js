const ContactSubmission = require('../models/ContactSubmission');

const getSubmissions = async (req, res) => {
  const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
  res.json(submissions);
};

const createSubmission = async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const submission = await ContactSubmission.create({ name, email, subject, message });
  res.status(201).json(submission);
};

const markAsRead = async (req, res) => {
  const submission = await ContactSubmission.findById(req.params.id);
  if (submission) {
    submission.read = true;
    await submission.save();
    res.json(submission);
  } else {
    res.status(404).json({ message: 'Submission not found' });
  }
};

const deleteSubmission = async (req, res) => {
  const submission = await ContactSubmission.findById(req.params.id);
  if (submission) {
    await submission.deleteOne();
    res.json({ message: 'Submission removed' });
  } else {
    res.status(404).json({ message: 'Submission not found' });
  }
};

module.exports = { getSubmissions, createSubmission, markAsRead, deleteSubmission };
