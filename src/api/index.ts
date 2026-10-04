import { Router } from 'express';
import tenantRoutes from './routes/tenant.routes';
import memoryRoutes from './routes/memory.routes';
import agentRoutes from './routes/agents.routes';
import coreRoutes from './routes/core.routes';

const apiRouter = Router();

apiRouter.use('/', tenantRoutes);
apiRouter.use('/', memoryRoutes);
apiRouter.use('/', agentRoutes);
apiRouter.use('/', coreRoutes);

export default apiRouter;
