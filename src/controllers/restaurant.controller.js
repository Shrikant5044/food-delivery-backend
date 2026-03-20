
const restaurentModel = require("../models/restaurant.model")


const addRestaurant = async (req, res) => {

    try {

        const { restaurantName, address, isOpen } = req.body;

        if (!restaurantName || !address) {
            return res.status(400).json({ message: "All Fields Are Required to fill" })
        }

        await restaurentModel.create({
            restaurantName: restaurantName,
            address: address,
            owner: req.userId,
            isOpen: isOpen
        })

        res.status(201).json({ message: "Restaurant Added in System" })

    } catch (err) {
        res.status(500).json({ message: "Server Error" })
    }




}

const viewRestaurants = async (req, res) => {

    try {

        const restaurants = await restaurentModel.find()


        res.status(200).json({
            message: "All Restaurants Fetched Sucessfully",
            restaurants
        })


    } catch (err) {

        res.status(500).json({ message: "Server Error" })

    }
}

const getMyRestaurant = async (req, res) => {

    try {
        const MyRestaurant = await restaurentModel.find({ owner: req.userId })



        res.status(200).json({ message: "Your Restaurant Fetched Successfully", MyRestaurant })



    } catch (err) { res.status(500).json({ message: "Server Error" }) }

}

const deleteMyRestaurant = async (req, res) => {

    try {

        const restaurantid = req.params.restaurantid
        const myRestaurant = await restaurentModel.findOneAndDelete({ _id: restaurantid, owner: req.userId })

        if (!myRestaurant) {
            return res.status(404).json({ message: "Restaurant Not Found" })
        }


        res.status(200).json({ message: "Restaurant Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
}

const updateRestaurant = async (req, res) => {

    try {
        const id = req.params.restaurantid;

        const { name, address } = req.body;

        if (!id) {
            return res.status(400).json({ message: "id missing " })
        }

        const restaurant = restaurentModel.findById(id)

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant Not Found" })
        }

        let updatedata = {}

        if (name !== undefined) { updatedata.name = name }
        if (price !== undefined) { updatedata.price = price }


        await restaurentModel.findByIdAndUpdate(id, updatedata)

       res.status(200).json({ message: "Restaurant Updated Successfuly" })


    } catch (err) {
        res.status(500).json({ message: "Server Error" })
    }


}






module.exports = { addRestaurant, viewRestaurants, getMyRestaurant, deleteMyRestaurant ,updateRestaurant}

