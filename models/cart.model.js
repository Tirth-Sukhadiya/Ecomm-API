const mongoose = require('mongoose');

let cartSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number }
}, { timestamps: true });

cartSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

const cart = mongoose.model('Cart', cartSchema);
module.exports = cart;