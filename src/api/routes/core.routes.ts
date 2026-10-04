import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares';
import { db } from '../../db';
import { employees, jobs, candidates, payroll, performanceGoals, hrAudits, trainingManuals } from '../../db/schema';
import { logger } from '../../utils/logger';

const router = Router();

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Retrieve a list of employees
 *     responses:
 *       200:
 *         description: A list of employees.
 */
router.get('/employees', async (req, res, next) => {
  try {
    const list = await db.select().from(employees);
    res.json(list);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Retrieve a list of jobs
 *     responses:
 *       200:
 *         description: A list of jobs.
 */
router.get('/jobs', async (req, res, next) => {
  try {
    const list = await db.select().from(jobs);
    res.json(list);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /candidates:
 *   get:
 *     summary: Retrieve a list of candidates
 *     responses:
 *       200:
 *         description: A list of candidates.
 */
router.get('/candidates', async (req, res, next) => {
  try {
    const list = await db.select().from(candidates);
    res.json(list);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /payroll:
 *   get:
 *     summary: Retrieve a list of payroll records
 *     responses:
 *       200:
 *         description: A list of payroll records.
 */
router.get('/payroll', async (req, res, next) => {
  try {
    const list = await db.select().from(payroll);
    res.json(list);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /hr-audits:
 *   get:
 *     summary: Retrieve a list of hr audits
 *     responses:
 *       200:
 *         description: A list of hr audits.
 */
router.get('/hr-audits', async (req, res, next) => {
  try {
    const list = await db.select().from(hrAudits);
    res.json(list);
  } catch (error) {
    next(error);
  }
});

export default router;
