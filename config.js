const config = {
    mongoURL: process.env.MONGO_URL || 'mongodb://bcc:bcc@ds064628.mlab.com:64628/bcc',
    port: process.env.PORT || 80,
    avatarPath: 'https://storage.googleapis.com/bestcc/images/'
};

export default config;

export const mongoURL = config.mongoURL;
export const avatarPath = config.avatarPath;