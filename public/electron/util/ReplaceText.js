const fs = require('fs');
const {FindAllDicData, FindOneDicData, InsertDicDate, updateOneDicData, deleteOneDicData} = require('../data/dic');

async function ReplaceText(path){
    let re = '';
    let replace_word = await FindAllDicData();
    // console.log('replace_word', replace_word);

    fs.readFile(path, 'utf8', function(err,data){
        if(err){
            console.log('err', err);
        }

        replace_word.forEach(function(val){
            re = new RegExp(val.en, "g");
            data = data.replace(re, val.ko);
        });

        fs.writeFile(path, data, 'utf8', function(err){
            if(err){
                console.log('err', err);
            }
        });
    });

    console.log('호출됨');

    // console.log('FindAllDicData', await FindAllDicData());
    // await InsertDicDate({ko: "test", en: "test"});
    // console.log('asdfg', await FindOneDicData({ko: "test"}));
    // await updateOneDicData({ _id: "5ef4263ea6694b3b5b357748", en: 'test1', ko: 'test1' });
    // await deleteOneDicData("5ef4263ea6694b3b5b357748");
    // console.log('asdfg', await FindOneDicData({_id: "5ef4263ea6694b3b5b357748"}));
}

exports.ReplaceText = ReplaceText;