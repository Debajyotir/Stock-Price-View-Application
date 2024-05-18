import StockList from "../Models/StockList.js";


export const getTopStocks = async(req,res) => {
    try {
        const {limit} = req.params;
        var limitNo = Number(limit);
        const maxLimit  = 4223;

        if (isNaN(limitNo)) {
            res.status(400).json({message:'Invalid limit parameter'});
            return;
        }

        if(limitNo>maxLimit){
            limitNo = maxLimit;
        }

        const currDay = "25/01/2024";

        const pipeline = [
            {
            '$match': {
                'date': currDay
            }
            }, {
            '$sort': {
                'high': -1
            }
            }, {
            '$limit': limitNo
            }
        ]

        const topStocks = await StockList.aggregate(pipeline);
        
        res.status(200).json(topStocks);
    } 
    catch (error) {
        res.status(404).json({message:error.message});
    }

}



export const getStockByName = async(req,res) => {
    try {
        const {name} = req.params;
        const currDay = "25/01/2024";

        const pipeline = [
            {
              '$match': {
                'date': currDay, 
                'name': name
              }
            }
        ]

        const stockByName = await StockList.aggregate(pipeline);

        res.status(200).json(stockByName);

    } 
    catch (error) {
        res.status(404).json({message:error.message});
    }

}


export const getHistory = async(req,res) =>{
    try {

        const {code} = req.params;
        const {limit} = req.params;

        var limitNo = Number(limit);
        const maxLimit  = 50;

        if (isNaN(limitNo)) {
            res.status(400).json({message:'Invalid limit parameter'});
            return;
        }

        if(limitNo>maxLimit){
            limitNo = maxLimit;
        }

        const pipeline = [
            {
              '$match': {
                'code': code
              }
            }, {
              '$addFields': {
                'formattedDate': {
                  '$dateFromString': {
                    'dateString': '$date', 
                    'format': '%d/%m/%Y'
                  }
                }
              }
            }, {
              '$sort': {
                'formattedDate': -1
              }
            }, {
              '$limit': limitNo
            }, {
              '$project': {
                'formattedDate': 0
              }
            }
        ]

        const history = await StockList.aggregate(pipeline);

        res.status(200).json(history);
        
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}