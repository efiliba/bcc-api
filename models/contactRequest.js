import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const contactRequestSchema = new Schema({    
    createdDate: { type: 'Date', default: Date.now, required: false },
    name: String,
    email: String,
    request: String,
    responded: Boolean
});

export default mongoose.model('Contact_Request', contactRequestSchema);