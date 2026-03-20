const mongoose = require("mongoose")


const restaurantSchema = new mongoose.Schema({

    restaurantName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    isOpen: {
        type: Boolean,
        default: true
    }
})

const restaurantModel = mongoose.model("Restaurants", restaurantSchema);

module.exports = restaurantModel;