var app = require('http');
// var DOMParser = require("xmldom").DOMParser;
// var XMLSerializer = require("xmldom").XMLSerializer;

var Port = 3002;
var getMethod = require("./services/getMethod.js");
var postMethod = require("./services/postMethod.js");

var Du_lieu = getMethod.Doc_Du_lieu();
// var Nha_hang = getMethod.Doc_Thong_tin_Nha_hang();

app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    switch(req.method) {
        case 'GET':
            switch(req.url){
                case '/Danh_Sach_Laptop':
                    res.writeHeader(200, {'Content-Type': 'text/xml'});
                    var data = Du_lieu;
                    res.end(data);
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
                        // console.log(JSON.parse(body)[1].Ho_ten);
                        var Danh_sach_San_pham = JSON.parse(body);
                        
                    })
                
                    res.writeHeader(200, {'Content-Type' : 'text/plain', 'Access-Control-Allow-Origin' : '*'});
                    res.end("");
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