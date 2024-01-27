import mongoose from "mongoose";

const FavouriteListSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    favList:{
        type:[String],
        default:[],
    }
});


const FavouriteList = mongoose.model("FavouriteList",FavouriteListSchema);

export default FavouriteList;