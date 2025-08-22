import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['email', 'sms', 'push', 'web'],
        required: true
    },
    title: String,
    message: String,
    status: {
        type: String,
        enum: ['sent', 'pending', 'failed'],
        default: 'pending'
    },
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);
