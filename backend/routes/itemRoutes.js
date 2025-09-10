const express = require("express");
const router = express.Router();
const { testing, getAllItems, addItem, deleteItembyName, deleteItembyId } = require("../controller/itemController");


router.get("/", testing);
router.get("/list", getAllItems);
router.post("/add", addItem);
router.delete("/remove/:name", deleteItembyName);
router.delete("/delete/:id", deleteItembyId);

module.exports = router;