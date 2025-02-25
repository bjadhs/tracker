import {Router} from 'express';
import {createSubscription} from '../controllers/subscription.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({title: 'GET all subscription'});
});
subscriptionRouter.get("/:id", (req, res) => {
  res.send({title: 'GET subscription by id'});
}); 
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.put("/:id", (req, res) => {
  res.send({title: 'UPDATE subscription by id'});
});
subscriptionRouter.delete("/:id", (req, res) => {
  res.send({title: 'DELETE subscription by id'});
});
subscriptionRouter.get('/user/:id', (req, res) => {
    res.send({title: 'GET subscription by user id'});
    });
subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({title: 'CANCEL subscription by id'});
    });
subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({title: 'GET upcoming renewals'});
    });

export default subscriptionRouter;