import Express from 'express';
import * as ContactRequest from '../controllers/admin.controller';
const router = Express.Router();

router.route('/saveContactRequest').post(ContactRequest.saveContactRequest);

export default router;