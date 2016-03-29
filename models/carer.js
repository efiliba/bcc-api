import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const carerSchema = new Schema({
    name: String,
    avatarFileName: String,
    profile: String,
    interests: String,
    address: {
        street: String,
        suburb: String,
        state: String,
        postcode: String,
    },
    phone: String,
    email: String,
    qualifications: [String],
    preferences: [String],
    services: [String],
    availability : [{
        hours: String
    }],
    approved: Boolean
});

export default mongoose.model('Carer', carerSchema);