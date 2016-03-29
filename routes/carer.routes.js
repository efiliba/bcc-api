import Express from 'express';
import * as CarerController from '../controllers/carer.controller';
const router = Express.Router();

router.route('/carers').get(CarerController.getCarers);
router.route('/carer').get(CarerController.getCarer);
router.route('/saveCarer').post(CarerController.saveCarer);

router.post('/avatar', CarerController.saveAvatar);

export default router;