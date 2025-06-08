import { Router, Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import { LogController } from './log.controller';

const router = Router();
const logController = Container.get(LogController);

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction): Promise<any> => fn(req, res, next).catch(next);

router.post('/', asyncHandler((req, res) => logController.create(req, res)));
router.get('/', asyncHandler((req, res) => logController.findAll(req, res)));
router.get('/level/:level', asyncHandler((req, res) => logController.findByLevel(req, res)));
router.get('/:id', asyncHandler((req, res) => logController.findById(req, res)));

export default router;
