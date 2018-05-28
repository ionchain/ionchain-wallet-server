var fs = require('fs');

module.exports = {
    readfileSync:function(path){
        var data = fs.readFileSync(path, 'utf-8');
        return data;
    },
    readfile:function (path, recall) {
        fs.readFile(path, function (err, data) {
            if (err) {
                console.log(err);
                recall(err.toString());
            } else {
                console.log(data.toString());
                recall(data);
            }

            console.log('同步读取文件方法执行完毕');
        });
    },
    readImg:function(path, response){
        fs.readFile(path, 'binary', function (err,file) {
            if (err){
                console.log(err);
                return;
            } else {
                response.write(file, 'binary');
                response.end();
            }
        });
    },
    writeFile:function (path, data) {
        fs.writeFile(path, JSON.stringify(data), {flag:'w',encoding:'utf-8',mode:'0666'}, function (err) {
            if (err){
                throw err;
            }
        });
    },
    writeFileSync:function (path,data) {
        fs.writeFileSync(path,data);
        console.log('同步写文件完成');
    }
}