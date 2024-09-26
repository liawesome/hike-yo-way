import express from 'express'
import Trail from "../models/Trail.js"
import User from '../models/User.js'
import fs from "fs"

const router = express.Router();

function readTrailData(){
    try{
        const data = fs.readFileSync("./data/mock.json", "utf-8");
        return JSON.parse(data)
    }catch(error){
        console.log('Error reading data');
    }
}

async function initializeDefaultTrails(){
    try{
        // await Trail.deleteMany({});
        const trailsData = readTrailData();
        await Trail.insertMany(trailsData);
        console.log('Default trails initialized');
    }catch(error){
        console.log('error loading the trails')
    }
    
}
initializeDefaultTrails();


router.get("/", async(_req, res)=>{
    try{
        const data = await Trail.find().limit(3);
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({ error: 'Error fetching trails' });
    }
})

router.get('/:id', async (req, res) => {
    try {
      const trail = await Trail.findById(req.params.id);
      if (!trail) {
        return res.status(404).json(
            { error: 'Trail not found'});
      }
      res.json(trail);
} catch (error) {
      res.status(500).json({ error: 'Error getting trail' });
    }
});
  

// post to new trail to original database


// for review 
router.post('/:trailId/reviews', async (req, res) => {
    try {
        const { userId, rating, comment } = req.body;
        const trailId = req.params.trailId;
        
        const [trail, user] = await Promise.all([
            Trail.findById(trailId),
            User.findById(userId)
        ]);
    
        if (!trail || !user) {
            return res.status(404).json({ error: 'Trail or User not found' });
        }
  
        const newReview = new Review({
            trail: trail._id,
            rating,
            comment
        });
  
        await newReview.save();

        const reviews = await Review.find({ trail: trail._id });
        const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

        trail.avg_rating = Number(averageRating.toFixed(2));
        await trail.save();

        res.status(201).json({
            message: 'Review added successfully',
            trail: {
              ...trail.toObject(),
              averageRating: trail.avg_rating
            }
        });
    } catch(error){
        res.status(500).json({ error: 'Error adding review' });
    }
});

export default router;