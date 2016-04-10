const config = {
    mongoURL: process.env.MONGO_URL || 'mongodb://bcc:bcc@ds064628.mlab.com:64628/bcc',
    port: process.env.PORT || 8001
};

export default config;

export const mongoURL = config.mongoURL;
export const projectId = 'bcc-api';
export const keyFilename = 'keyFile.json';