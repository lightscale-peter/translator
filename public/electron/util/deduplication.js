

let a = [
    ['a', 'aa'],
    ['a', 'aa'],
    ['b', 'bb'],
    ['b', 'bb'],
    ['b', 'bb'],
    ['c', 'cc'],
    ['d', 'dd'],
    ['d', 'dd'],
    ['a', 'aa'],
];

let b = [];

let flag = true;

a.forEach(function(val){

    b.forEach(function(val2){
        if(val[0] === val2[0]){
            flag = false;
        }
    });
    

    if(flag){
        b.push(val);
    }
    flag = true;
});

console.log('b', b);