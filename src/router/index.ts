import { Router, Request, Response } from 'express';
import v1Router from './v1';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP' });
});

router.use('/api/v1', v1Router);

export default router;