import mongoose from "mongoose";

const StockListSchema = mongoose.Schema({
    date:{
        type:String,
        required:true,
    },
    code:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    open:{
        type:Number,
        required:true,
    },
    high:{
        type:Number,
        required:true,
    },
    low:{
        type:Number,
        required:true,
    },
    close:{
        type:Number,
        required:true,
    }
});


const StockList = mongoose.model("StockList",StockListSchema);

export default StockList;