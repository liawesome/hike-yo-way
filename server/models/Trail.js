import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    }, 
    name:{
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min:1,
        max:5,
        required: true
    },
    comment: String,
    date:{
       type: Date, 
       default: Date.now
    }
});

const trailSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String, 
        required: true
    }, 
    location:{
        type: String,
        required: true
    }, 
    position:{
        lat: { type: Number },
        lng: { type: Number }
    }, 
    numberOfVisitors: String, 
    features: [String], 
    image: {
        type: String, 
        required: false
    },
    difficulty: String,
    length: Number,
    elevation_gain: Number,
    avg_rating: {
        type: Number
    },
    estimated_time: Number,
    description: String,
    reviews: [reviewSchema]
});

const Trail = mongoose.model("Trail", trailSchema);
export default Trail;