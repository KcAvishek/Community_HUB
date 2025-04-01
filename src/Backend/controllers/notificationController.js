const Notification = require('../models/Notification');

exports.createNotification = async (req, res) => {
    try {
        const { type, title, message } = req.body;
        const notification = new Notification({ type, title, message });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};