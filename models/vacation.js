/**
 * Created by home on 2016/12/31.
 */
var mongoose = require('mongoose');

var vacationSchema = mongoose.Schema({
    name: String,
    slug: String,
    category: String,
    sku: String,
    priceInCents: String,
    tags: [String],
    inSeason: Boolean,
    available: Boolean,
    requiresWaiver: Boolean,
    maximumGuests: Number,
    notes: String,
});

vacationSchema.methods.getDisplayPrice = () => {
    return '$' + (this.priceInCents / 100).toFixed(2);
};

module.exports = mongoose.model('vacation', vacationSchema);

