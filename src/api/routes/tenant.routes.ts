import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares';
import { db } from '../../db';
import { companies, departments, locations, users, roles } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { logger } from '../../utils/logger';

const router = Router();

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Retrieve a list of companies
 *     responses:
 *       200:
 *         description: A list of companies.
 */
router.get('/companies', async (req, res, next) => {
  try {
    const list = await db.select().from(companies);
    res.json(list);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a new company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               industry:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/companies', [
  body('name').isString().notEmpty(),
  body('industry').optional().isString(),
], validate, async (req: any, res: any, next: any) => {
  try {
    const { name, industry } = req.body;
    const inserted = await db.insert(companies).values({ name, industry }).returning();
    logger.info(`Company created: ${inserted[0].id}`);
    res.status(201).json(inserted[0]);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /departments:
 *   post:
 *     summary: Create a department
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyId:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/departments', [
  body('companyId').isUUID().notEmpty(),
  body('name').isString().notEmpty(),
], validate, async (req: any, res: any, next: any) => {
  try {
    const { companyId, name } = req.body;
    const inserted = await db.insert(departments).values({ companyId, name }).returning();
    res.status(201).json(inserted[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
