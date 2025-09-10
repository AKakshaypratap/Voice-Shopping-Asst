const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: "uncategorized",
    },
    quantity: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;