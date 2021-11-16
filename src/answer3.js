const fs = require('fs');
const readline = require('readline');

var sum = 0;

const readInterface = readline.createInterface({
    input: fs.createReadStream('file.txt'),    
});

readInterface.on('line', function(line) {    
    let row = line.split(',');    
    if(!isNaN(parseInt(row[2]))){        
        sum += parseInt(row[2])
    }    
});

setTimeout(()=>{
    console.log(sum);
},1000)
