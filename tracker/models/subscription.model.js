import {Schema, model} from 'mongoose';

const subscriptionSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: 3,
        maxLength: 100
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0
    },
    currency:{
        type: String,
        enum: ['USD', 'EUR', 'GBP'],
        default: 'USD'
    },
    frequency: {
        type: String,
        enum: ['daily', 'monthly', 'yearly'],
        default: 'monthly'
    },
    category:{
        type: String,
        enum: ['health', 'entertainment', 'education', 'finance', 'other'],
        default: 'other',
        required: [true, 'Category is required']
    },
    paymentMethod:{
        type: String,
        required: [true, 'Payment method is required'],
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate:{
        type: Date,
        required: [true, 'Start date is required'],
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date cannot be in the past'
            },
        },
    renewalDate:{
        type: Date,
        required: [true, 'End date is required'],
        validate: {
            validator: (value)=> value > this.startDate,
            message: 'End date cannot be before start date',
        }
        },
    user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required'],
            index: true
    }
}, {timestamps: true});

subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate){
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);

        if(this.renewalDate < new Date()){
            this.status = 'expired';
        }
        next();
    }
});

const Subscription = model('Subscription', subscriptionSchema);
export default Subscription;
