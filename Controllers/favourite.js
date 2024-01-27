import StockList from "../Models/StockList.js";
import FavouriteList from "../Models/FavouriteList.js"

export const addToFav = async(req,res) =>{
    try {
        const {userId, favoriteStock} = req.body;
        const currDay = "25/01/2024"

        if (!userId || !favoriteStock) {
            res.status(400).json({ message: 'Both userId and favoriteStock are required fields' });
            return;
        }

        const validElement = await StockList.findOne({code:favoriteStock,date:currDay});

        if(!validElement){
            res.status(400).json({message:`The Stock is not a valid stock for ${currDay}`});
            return;
        }

        const existingFavorite = await FavouriteList.findOne({ userId });

        if(existingFavorite){
            if (existingFavorite.favList.includes(favoriteStock)) {
                return res.status(400).json({ message: 'Element already in the favorite list' });
            }
            else{
                existingFavorite.favList.push(favoriteStock);
                const updatedFavorite = await FavouriteList.updateOne(
                    {userId},
                    {favList:existingFavorite.favList}
                )
                res.status(201).json(existingFavorite);
                return;
            }
        }

        const newFavorite = new FavouriteList({
            userId,
            favList: [favoriteStock], 
        });

        const savedFavorite = await newFavorite.save();

        res.status(201).json(savedFavorite);

    } catch (error) {
        res.status(404).json({message:error.message});
    }
    
}



export const getFav = async(req,res) => {
    try {
        const {userId} = req.params;

        const user = await FavouriteList.findOne({ userId });

        if(!user){
            res.status(400).json({message:"userId don't exist"});
            return;
        }

        const pipeline = [
            {
              '$match': {
                'date': '25/01/2024', 
                'code': {
                  '$in': user.favList
                }
              }
            }
        ]

        const fav = await StockList.aggregate(pipeline);

        res.status(200).json(fav);


    } catch (error) {
        res.status(404).json({message:error.message});
    }
}



export const removeFev = async(req,res) => {
    try {
        const {userId, favoriteStock} = req.body;

        if (!userId || !favoriteStock) {
            res.status(400).json({ message: 'Both userId and favoriteStock are required fields' });
            return;
        }

        const user = await FavouriteList.findOne({ userId });

        if(!user){
            res.status(400).json({message:"userId don't exist"});
            return;
        }

        if(!user.favList.includes(favoriteStock)){
            res.status(400).json({message:`code : ${favoriteStock} stock don't exist in your favourite list`});
            return;
        }

        const newFavList = user.favList.filter(item => item !== favoriteStock);

        const updatedFavorite = await FavouriteList.updateOne(
            {userId},
            {favList:newFavList}
        )
        res.status(201).json(newFavList);


    } catch (error) {
        res.status(404).json({message:error.message});
    }
}