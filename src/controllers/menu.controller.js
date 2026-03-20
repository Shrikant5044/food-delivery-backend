const menuModel = require("../models/menu-card.model");
const restaurantModel = require("../models/restaurant.model");



const additem = async (req, res) => {

    try {

        const { name, price, category } = req.body;
        const restaurantid = req.params.restaurantid;


        if (!name || price === undefined || !category || !restaurantid) {
            return res.status(400).json({ message: "All fields are required " })
        }

        const restaurant = await restaurantModel.findOne({ _id: restaurantid })

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant Not Found " })
        }



        if (req.userId != restaurant.owner.toString()) {
            return res.status(403).json({ message: "Unauthorized" })
        }

        await menuModel.create({
            name: name,
            price: price,
            category: category,
            restaurant: restaurantid
        })

        res.status(201).json({ message: "Item added to the menu" })



    } catch (err) {
        res.status(500).json({ message: "Server Error" })
    }


}

const viewitems = async (req, res) => {

    try {

        const restaurantid = req.params.restaurantid;

        const items = await menuModel.find({ restaurant: restaurantid }).select(-"__v")

        res.status(200).json({ message: "Menu :", items })
    } catch (err) {
        res.status(500).json({ message: "Server Error" })
    }


}

const deleteitem = async (req, res) => {
    try {

        const itemid = req.params.id;

        const item = await menuModel.findOne({ _id: itemid })

        if (!item) {
            return res.status(404).json({ message: "Item does not exist" })
        }

        const restaurantId = item.restaurant

        const restaurant = await restaurantModel.findById(restaurantId)

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant does not exist" })
        }

        if (restaurant.owner.toString() != req.userId) {
            return res.status(403).json("Item cant be removed")
        }

        await menuModel.findByIdAndDelete(itemid)



        res.status(200).json({ message: "Item Deleted from DB" })



    } catch (err) { res.status(500).json({ message: "Server Error" }) }
}

const updateitem = async (req, res) => {

    try {

        const itemid = req.params.id;

        const { name, price, category } = req.body;

        const item = await menuModel.findOne({ _id: itemid })

        if (!item) {
            return res.status(404).json({ message: "Item does not exist" })
        }

        const restaurantId = item.restaurant

        const restaurant = await restaurantModel.findById(restaurantId)

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant does not exist" })
        }

        if (restaurant.owner.toString() != req.userId) {
            return res.status(403).json("Item cant be Updated")
        }


        let updatedata = {};

        if (name !== undefined) { updatedata.name = name }
        if (price !== undefined) { updatedata.price = price }
        if (category !== undefined) { updatedata.category = category }

        if(Object.keys(updatedata).length === 0)
        { return res.status(400).json({ message: "At least One Field isRequiredTo update" }) }

        await menuModel.findByIdAndUpdate(itemid, updatedata);


        res.status(200).json({ message: "Item Updated In DB" })



    } catch (err) { res.status(500).json({ message: "Server Error" }) }


}


module.exports = { additem, viewitems, deleteitem, updateitem }