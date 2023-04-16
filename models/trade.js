const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
    name: { type: String, required: [true, 'The title is required'] },
    category: { type: String, required: [true, 'The category is required'] },
    owner: { type: String, required: [true, 'The owner is required'] },
    details: {
        type: String, required: [true, 'The details about this item are required'],
        minLength: [10, 'The details should have at least 10 characters']
    },
    status: {type: String, required: [true, 'The status is required']},
    image: { type: String, required: [true, 'The image URL is required'] }
});


module.exports = mongoose.model('Trade', tradeSchema);