import { Router } from "express";
import { createSubscription } from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import { getSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.use(authorize);

subscriptionRouter.get('/', (req, res) => res.send({ title: 'Get all subscriptions' }));

subscriptionRouter.get('/:id', (req, res) => res.send({ title: 'Get all subscriptions' }));

subscriptionRouter.post('/', createSubscription);

subscriptionRouter.put('/:id', (req, res) => res.send({ title: 'Get all subscriptions' }));

subscriptionRouter.delete('/:id', (req, res) => res.send({ title: 'Get all subscriptions' }));

subscriptionRouter.get('/user/:id', getSubscriptions);

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: 'Get all subscriptions' }));

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({ title: 'Get all subscriptions' }));

export default subscriptionRouter;