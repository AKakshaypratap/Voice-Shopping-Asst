const Item = require("../models/item");

exports.testing = async (req, res) => {
    console.log("your request was received");
    res.send("your request was received");
};

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        if(!items){
            return res.status(404).json({ 
                success: false,
                message: "No items found" 
            });
        }
        res.status(200).json({
            success: true,
            items
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

exports.addItem = async (req, res) => {
    try {
        const { name, category, quantity, price } = req.body;
        const existingItem = await Item.findOne({ name });
        if(existingItem){
            const updatedItem = await Item.findOneAndUpdate({ name }, { quantity: existingItem.quantity + quantity }, { new: true });
            return res.status(200).json({
                success: true,
                message: "Item quantity updated successfully",
                item: updatedItem
            });
        }
        const item = new Item({ name, category, quantity, price });
        await item.save();
        res.status(201).json({
            success: true,
            message: "Item added successfully",
            item
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

exports.deleteItembyName = async (req, res) => {
    try {
        const { name } = req.params;
        const item = await Item.findOneAndDelete({ name: { $regex: new RegExp(name, "i") } });
        if(!item){
            return res.status(404).json({
                success: false,
                message: `Item ${name} not found`
            });
        }
        res.status(200).json({
            success: true,
            message: `Item ${name} deleted successfully`,
            item
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

exports.deleteItembyId = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findByIdAndDelete(id);
        if(!item){
            return res.status(404).json({
                success: false,
                message: `Item with ID ${id} not found`
            });
        }
        res.status(200).json({
            success: true,
            message: `Item deleted successfully`,
            item
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, quantity, price } = req.body;
        const item = await Item.findByIdAndUpdate(id, { name, category, quantity, price });
        if(!item){
            return res.status(404).json({
                success: false,
                message: `Item ${name} not found`
            });
        }
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}