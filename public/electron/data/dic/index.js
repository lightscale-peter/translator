const { MongoClient, ObjectId } = require("mongodb");
// mongo "mongodb+srv://cluster0-zfgjs.mongodb.net/replaceHtml" --username dbUser

const url = "mongodb+srv://dbUser:1234qwer@cluster0-zfgjs.mongodb.net/replaceHtml?retryWrites=true&w=majority";
const client = new MongoClient(url);
let db = '';
let col = '';


async function connectDBB(){
    await client.connect(); 
    db = client.db("replaceHtml");
    col = db.collection("dic");
    console.log('DB connected');
}

async function closeDBB(){
    await client.close();
    console.log('DB CLOSE');
}


async function FindAllDicData(args){

    let result = [];

    if(client.isConnected() === false){
        await connectDBB();
    }

    let findText = {};

    if(args.search.target !== '' && args.search.word !== ''){
        findText = {
            [args.search.target]: {$regex: args.search.word, $options: "i"}
        }
    }
    

    

    if(!args.sort) args.sort = {"_id": -1};

    if(args.limit){
        (await col.find(findText).sort(args.sort).limit(args.limit).toArray()).forEach(function(val, index){
            result.push({
                ...val,
                _id: val._id.toString(),
                date: val._id.getTimestamp()
            });
        });
    }else{
        (await col.find(findText).sort(args.sort).toArray()).forEach(function(val, index){
            result.push({
                ...val,
                _id: val._id.toString(),
                date: val._id.getTimestamp()
            });
        });
    }

    return result;
}



async function UpdateOneDicData(args){

    if(client.isConnected() === false){
        await connectDBB();
    }

    await col.updateOne({_id: ObjectId(args._id)}, {$set: {ko: args.ko, en: args.en}}, function(err, res){
        if(err){
            console.log('fail updateOne');
            throw err;
        }else{
            console.log('success updateOne');
        } 
    });
}






async function DeleteOneDicData(args){

    if(client.isConnected() === false){
        await connectDBB();
    }

    await col.deleteOne({_id: ObjectId(args._id)}, function(err, res){
        if(err) throw err;
        console.log('deleteOne Success');
    });
}






async function InsertDicDate(args){

    if(client.isConnected() === false){
        await connectDBB();
    }

    if(args.en !== '' && args.ko !== ''){
        col.insertOne({en: args.words.en, ko: args.words.ko}, function(err, res){
            if(err) throw err
            console.log("insertOne success");
        });
    }

    // if(Array.isArray(args) && args.length > 1){
    //     col.insertMany(args, function(err, res){
    //         if(err) throw err
    //         console.log("insertMany success", res.insertedCount);
    //     });
    // }else{
    //     col.insertOne(args, function(err, res){
    //         if(err) throw err
    //         console.log("insertOne success");
    //     });
    // }
}




exports.FindAllDicData = FindAllDicData;
exports.UpdateOneDicData = UpdateOneDicData;
exports.DeleteOneDicData = DeleteOneDicData;
exports.InsertDicDate = InsertDicDate;
exports.closeDBB = closeDBB;



