import csvtojson from 'csvtojson';
import StockList from "../Models/StockList.js"


// const csvFilePath = "EQ200124.CSV"


// function getType(value) {
//     return Object.prototype.toString.call(value).slice(8, -1);
//   }



// const arr1 = ["18/01/2024","17/01/2024","16/01/2024","15/01/2024","12/01/2024","11/01/2024","10/01/2024","09/01/2024","08/01/2024","05/01/2024","04/01/2024","03/01/2024","02/01/2024","01/01/2024"];
// const arr2 = ["EQ180124.CSV","EQ170124.CSV","EQ160124.CSV","EQ150124.CSV","EQ120124.CSV","EQ110124.CSV","EQ100124.CSV","EQ090124.CSV","EQ080124.CSV","EQ050124.CSV","EQ040124.CSV","EQ030124.CSV","EQ020124.CSV","EQ010124.CSV"]

// const arr1 = ["01/12/2023","04/12/2023","05/12/2023","06/12/2023","07/12/2023","08/12/2023","11/12/2023","12/12/2023","13/12/2023","14/12/2023","15/12/2023","18/12/2023","19/12/2023","20/12/2023","21/12/2023","22/12/2023","26/12/2023","27/12/2023","28/12/2023","29/12/2023"]
// const arr2 = ["EQ011223.CSV","EQ041223.CSV","EQ051223.CSV","EQ061223.CSV","EQ071223.CSV","EQ081223.CSV","EQ111223.CSV","EQ121223.CSV","EQ131223.CSV","EQ141223.CSV","EQ151223.CSV","EQ181223.CSV","EQ191223.CSV","EQ201223.CSV","EQ211223.CSV","EQ221223.CSV","EQ261223.CSV","EQ271223.CSV","EQ281223.CSV","EQ291223.CSV"]


// const arr1 = ["30/11/2023","29/11/2023","28/11/2023","24/11/2023","23/11/2023","22/11/2023","21/11/2023","20/11/2023","17/11/2023","16/11/2023","15/11/2023"]
// const arr2 = ["EQ301123.CSV","EQ291123.CSV","EQ281123.CSV","EQ241123.CSV","EQ231123.CSV","EQ221123.CSV","EQ211123.CSV","EQ201123.CSV","EQ171123.CSV","EQ161123.CSV","EQ151123.CSV"]


// for(let i=0;i<11;i++){
//     convert(arr1[i],arr2[i]);
// }


const convert = async(date,csvFilePath) => {
    try {
        const jsonObj = await csvtojson().fromFile(csvFilePath);
        for(const obj of jsonObj){
            const newStock = new StockList({
                date,
                code:obj.SC_CODE,
                name:obj.SC_NAME,
                open:parseFloat(obj.OPEN),
                high:parseFloat(obj.HIGH),
                low:parseFloat(obj.LOW),
                close:parseFloat(obj.CLOSE)
            })
            console.log(newStock);
            break;
            // await newStock.save();
        }
        console.log("Success" + date);
    } catch (error) {
        console.error('Error:', error);
    }
    
}

export default convert;


