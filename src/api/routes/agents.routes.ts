import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares';
import { OrchestratorAgent } from '../../agents/OrchestratorAgent';
import { logger } from '../../utils/logger';

const router = Router();

let orchestrator: OrchestratorAgent | null = null;
try {
  orchestrator = new OrchestratorAgent();
  logger.info("AI Orchestrator Agent initialized.");
} catch (err) {
  logger.error("AI Orchestrator: Failed to initialize. Details:", err);
}

/**
 * @swagger
 * /agents/orchestrate:
 *   post:
 *     summary: Orchestrate an AI Agent request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *               context:
 *                 type: object
 *     responses:
 *       200:
 *         description: Executed AI task
 */
router.post('/agents/orchestrate', [
  body('prompt').isString().notEmpty(),
], validate, async (req: any, res: any, next: any) => {
  try {
    if (!orchestrator) {
       return res.status(503).json({ error: "Agent Orchestrator not configured (check GEMINI_API_KEY)." });
    }

    const { prompt, context } = req.body;
    const response = await orchestrator.processRequest(prompt, context || {});
    
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
