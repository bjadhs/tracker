import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req,res, next) =>{
    try{
        const subs = await Subscription.create({
            ...req.body,
            user: req.user._id
        })
        res.status(201).json({success: true, data: subs})
    }catch(err){
        next(err)
    }
}

// {
//     "name": "Netflex",
//     "price":25,
//     "currency":"USD",
//     "frequency":"daily",
//     "category": "health",
//     "paymentMethod":"stripe",
//     "status": "active",
//     "startDate":"2024-02-01T00:00:00:000Z"
    
//   }