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

})

const Review = mongoose.model('Review', reviewSchema);
export default Review;
