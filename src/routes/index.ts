import { Router, Request, Response } from 'express';

import webRoute from './web';

const router = Router();

router.use('/api/v1/web', webRoute);
router.get('/', (req: Request, res: Response) => res.send('Welcome to Project'));

export default router;
