const fs = require('fs');
const {FindAllDicData} = require('../data/dic');

async function ReplaceText(path){

    console.log('path11', path);
    let re = '';
    let replace_word = await FindAllDicData({search:{target: '', word: ''}});
    let result = true;

     fs.readFile(path.loadPath, 'utf8', function(err,data){
        if(err){
            console.log('여기다 여기!!!!!');
            console.log('err', err);
            result = false;
        }else{
            replace_word.forEach(function(val){
                re = new RegExp(val.en, "g");
                data = data.replace(re, val.ko);
            });
    
            fs.writeFile(path.savePath, data, 'utf8', function(err){
                if(err){
                    console.log('err', err);
                }
            });
        }
    });

    return result;
}

exports.ReplaceText = ReplaceText;