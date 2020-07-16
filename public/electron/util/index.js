const fs = require('fs');
const util = require('util');
const {FindAllDicData} = require('../data/dic');

async function ReplaceText(path){
    let re = '';
    let replace_word = await FindAllDicData({search:{target: '', word: ''}});


    const readFileFunc = (path, callback) => {

        fs.readFile(path.loadPath, 'utf8', function(err,data){
            if(err){
                console.log('err', err);


                const msg = {
                    flag: false,
                    title: '오류 발생',
                    desc: '원본 파일을 확인해주세요.'
                }

                callback(null, msg);
            }else{
                replace_word.forEach(function(val){
                    re = new RegExp(val.en, "g");
                    data = data.replace(re, val.ko);
                });

                if(fs.existsSync(path.savePath)){
                    const msg = {
                        flag: false,
                        title: '오류 발생',
                        desc: '중복된 이름이 있습니다.'
                    }
                    callback(null, msg);
                }else{
                    fs.writeFile(path.savePath, data, 'utf8', function(err){
                        if(err){
                            console.log('err', err);
                        }else{
                            const msg = {
                                flag: true,
                                title: '번역 성공',
                                desc: '\'' +path.savePath + '\'에 저장되었습니다.'
                            }
                            callback(null, msg);
                        }
                    });
                }
            }
        });
    } 

    const readFile = util.promisify(readFileFunc);

    return readFile(path);
}

exports.ReplaceText = ReplaceText;