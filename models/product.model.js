const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    name: { type: String },
    image_path: { type: String },
    description: { type: String },
    unit: { type: String },
    price: { type: Number }
}, { timestamps: true });

productSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

const product = mongoose.model('Product', productSchema);
module.exports = product;