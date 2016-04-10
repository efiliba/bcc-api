import multer from 'multer';
import gcloud from 'gcloud';
import stream from 'stream';
import sanitizeHtml from 'sanitize-html';
import Carer from '../models/carer';
import {projectId, keyFilename} from '../config';

export const getCarers = (req, res) => 
    Carer.find().exec((err, carers) => 
        err ? res.status(500).send(err) : res.json({carers})
    );

export const getCarer = (req, res) =>
    Carer.findOne({ _id: req.query.id}).exec((err, carer) => 
        err ? res.status(500).send(err) : res.json({carer})
    );

export const saveAvatar = (req, res) => {
    const upload = multer({ 
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 100000
        },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.startsWith('image')) {
                cb(new Error('MIME type not image'));
            } else {
                cb(null, true);                 // Accept the file
            }
        }
    }).any();

    upload(req, res, (err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            const bucket = gcloud({projectId, keyFilename}).storage().bucket('bestcc');
            const bucketFile = bucket.file('images/' + req.files[0].fieldname);
            var bufferStream = new stream.PassThrough();
            bufferStream.end(req.files[0].buffer);
            bufferStream
                .pipe(bucketFile.createWriteStream({
                    validation: false,
                    resumable: false,
//                    metadata: metadata,
                    gzip: true
                }))
                .on('error', (err) => res.status(500).send(err))
                .on('finish', () => res.status(201).send('Created'));
        }
    });
};

export const saveCarer = (req, res) => {
	//console.log("req", req);

    const newCarer = new Carer(req.body.carer);

    // Sanitise inputs
//    newCarer.name = sanitizeHtml(newCarer.name);
    //    newCarer.email = sanitizeHtml(newCarer.email);

    newCarer.avatar = stringify(newCarer.avatar);

console.log('--------------- saving carer: _' + newCarer + '_');

    newCarer.save((err, saved) => {
        if (err) {
            console.log('============ERROR: _' + err + '_');

            res.status(500).send(error);
        }
        res.json({ carer: saved });
    });
};

const replacer = (key, value) => 
    value instanceof FileList ? Array.from(value).map(file => file.name).join(', ') || 'No Files Selected' : value;


const stringify = (values) => JSON.stringify(values, replacer, 2);