import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares';
import { db } from '../../db';
import { companyMemory } from '../../db/schema';
import { logger } from '../../utils/logger';

const router = Router();

/**
 * @swagger
 * /memory:
 *   post:
 *     summary: Save company context to memory engine
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyId:
 *                 type: string
 *               memoryType:
 *                 type: string
 *               content:
 *                 type: string
 *               metadata:
 *                 type: object
 *     responses:
 *       201:
 *         description: Context saved
 */
router.post('/memory', [
  body('companyId').isUUID().notEmpty(),
  body('memoryType').isString().notEmpty(),
  body('content').isString().notEmpty(),
  body('metadata').optional().isObject(),
], validate, async (req: any, res: any, next: any) => {
  try {
    const { companyId, memoryType, content, metadata } = req.body;
    const inserted = await db.insert(companyMemory)
      .values({ companyId, memoryType, content, metadata })
      .returning();
    logger.info(`Memory saved for company ${companyId}`);
    res.status(201).json(inserted[0]);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /memory/{companyId}:
 *   get:
 *     summary: Get company context
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Array of memories
 */
router.get('/memory/:companyId', async (req, res, next) => {
  try {
    const list = await db.query.companyMemory.findMany({
      where: (mem, { eq }) => eq(mem.companyId, req.params.companyId)
    });
    res.json(list);
  } catch (error) {
    next(error);
  }
});

export default router;
