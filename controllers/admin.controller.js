import ContactRequest from '../models/contactRequest';
import sanitizeHtml from 'sanitize-html';

export const saveContactRequest = (req, res) => {
    //if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    //    return res.status(403).end();
    //}
	const newContact = new ContactRequest(req.body.contactRequest);

    // Sanitise inputs
    newContact.name = sanitizeHtml(newContact.name);
    newContact.email = sanitizeHtml(newContact.email);
    newContact.request = sanitizeHtml(newContact.request);
    
    newContact.save((err, saved) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json({ ContactRequest: saved });
    });
};