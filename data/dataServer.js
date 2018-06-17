var app = require('http');
// var DOMParser = require("xmldom").DOMParser;
// var XMLSerializer = require("xmldom").XMLSerializer;

var Port = 3002;
var getMethod = require("./services/getMethod.js");
var postMethod = require("./services/postMethod.js");

var Danh_Sach_Laptop;
// var Danh_Sach_Phieu_ban = 
// var Nha_hang = getMethod.Doc_Thong_tin_Nha_hang();

app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    switch(req.method) {
        case 'GET':
            switch(req.url){
                case '/Danh_Sach_Laptop':
                    res.writeHeader(200, {'Content-Type': 'text/xml'});
                    Danh_Sach_Laptop = getMethod.Doc_Danh_Sach_Laptop();
                    res.end(Danh_Sach_Laptop);
                    break;

                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'});
                    res.end("Request was not support!!!");
                    break;
            }

            console.log('--> Done');
            break;

        case 'POST':
            
            switch(req.url){
                case '/Ban_Laptop':
                    var body = [];
                    req.on('data', (chunk) => {
                        body.push(chunk)
                    }).on('end', () => {
                        body = Buffer.concat(body).toString();
                        var Danh_sach_San_pham = JSON.parse(body);

                        postMethod.Ban_Laptop(Danh_sach_San_pham);
                    });
                    setTimeout(() => {
                        Danh_Sach_Laptop = getMethod.Doc_Danh_Sach_Laptop();
                        res.writeHeader(200, {'Content-Type': 'text/xml', 'Access-Control-Allow-Origin' : '*'});
                        res.end(Danh_Sach_Laptop);
                    }, 3000);
                    
                    break;
                case '/Cap_nhat_Laptop':
                    var body = [];
                    req.on('data', (chunk) => {
                        body.push(chunk)
                    }).on('end', () => {
                        body = Buffer.concat(body).toString();
                        var San_pham = JSON.parse(body);
                        
                        postMethod.Cap_nhat_Laptop(San_pham);
                    });
                    setTimeout(() => {
                        Danh_Sach_Laptop = getMethod.Doc_Danh_Sach_Laptop();
                        // console.log(Danh_Sach_Laptop);
                        res.writeHeader(200, {'Content-Type': 'text/xml', 'Access-Control-Allow-Origin' : '*'});
                        res.end(Danh_Sach_Laptop);
                    }, 3000);
                    
                    break;
                case '/login':
                    // console.log(req.headers)
                    // console.log(req.body)

                    var body = [];
                    req.on('data', (chunk) => {
                        body.push(chunk)
                    }).on('end', () => {
                        body = Buffer.concat(body).toString()
                        
                    })

                    session.push(101)
                    console.log(session)
                    res.writeHeader(200, {'Content-Type': 'text/plain'})
                    res.end('101')
                    break

                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'});
                    res.end("Request was not support!!!");
                    break;
            }
            break
        case 'PUT':
            break
        case 'DELETE':
            break
    }
}).listen(Port, (err) => {
    if(err != null)
        console.log('==> Error: ' + err)
    else
        console.log('Server is starting at port ' + Port)
})