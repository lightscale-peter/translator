const fs = require('fs');
const {JSDOM} = require('jsdom');

function SortText(path){

    let temp_array = [];
    let temp_string = '';
    let id_array = [];

    let fileData = fs.readFileSync(path, 'utf8');
    let dom = new JSDOM(fileData);
    let document = dom.window.document;

    document.querySelectorAll('section.features').forEach(function(val){
        id_array.push('#' + val.id);
    });

    id_array.forEach(function(id){
        document.querySelectorAll(`${id} ul li`).forEach(function(val){
            temp_array.push(val.textContent);
        });    

        temp_array = temp_array.sort();
        temp_array.forEach(function(val){
            temp_string += '<li>' + val + '</li>';
        });

        document.querySelectorAll(`${id} ul`)[0].innerHTML = temp_string;
        temp_array = [];
        temp_string = '';
    });

    fs.writeFileSync(path, dom.serialize(), 'utf8');

    console.log('SortText 완료');
}

exports.SortText = SortText;