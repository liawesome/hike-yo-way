import mongoose from "mongoose";
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema(
    {   
        userId: {
            type: String
        },
        username:{
            type: String,
            required: true,
            unique: true
        },
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        password:{
            type: String,
            required: true,
            unique: true
        },

        created_at:{
            type: Date, 
            default: Date.now
        },
        completed_hikes: [{
            trail: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Trail' },
            date_completed: Date,
            rating: Number
          }],
        descirption: [{
            input_text: String,
            created_at: { 
                type: Date, 
                default: Date.now 
            }
        }]

    }
);

userSchema.pre('save', async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8);
    }

});

const User  = mongoose.model("User", userSchema);
export default User;



