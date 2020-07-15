const fs = require('fs');
const {FindAllDicData} = require('../data/dic');

async function ReplaceText(path){

    console.log('path11', path);
    let re = '';
    let replace_word = await FindAllDicData({search:{target: '', word: ''}});

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
}

exports.ReplaceText = ReplaceText;