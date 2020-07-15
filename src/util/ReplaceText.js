const fs = require('fs');

function ReplaceText(){

    // let re = '';
    // let replace_word = FindAllDicData();
    // console.log('replace_word', replace_word);

    fs.readFile('./sample/test/ios/index/html', 'utf8', function(err, data){
        if(err){
            console.log('err', err);
        }

        console.log('data', data);

        // replace_word.forEach(function(val){
        //     re = new RegExp(val.en, "g");
        //     data = data.replace(re, val.ko);
        // });

        // fs.writeFile(path, data, 'utf8', function(err){
        //     if(err){
        //         console.log('err', err);
        //     }
        // });
    });
}

exports.ReplaceText = ReplaceText;