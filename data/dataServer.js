var app = require('http');
// var DOMParser = require("xmldom").DOMParser;
// var XMLSerializer = require("xmldom").XMLSerializer;

var Port = 3002;
var Luu_tru = require("./services/XL_LUU_TRU.js");
var Nghiep_vu = require("./services/XL_NGHIEP_VU");

var Du_lieu = Luu_tru.Doc_Du_lieu();
var Nha_hang = Luu_tru.Doc_Thong_tin_Nha_hang();

app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    switch(req.method) {
        case 'GET':

            switch(req.url){
                case '/Danh_Sach_Tivi':
                    res.writeHeader(200, {'Content-Type': 'text/xml'});
                    
                    var data = Du_lieu;
                    res.end(data);
                    break;

                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'})
                    res.end("Request was not support!!!")
                    break
            }

            console.log('--> Done');
            break
        case 'POST':

            switch(req.url){
                case '/login':
                    // console.log(req.headers)
                    // console.log(req.body)

                    let body = [];
                    req.on('data', (chunk) => {
                        body.push(chunk)
                    }).on('end', () => {
                        body = Buffer.concat(body).toString()

                        // body = body.split('--X-INSOMNIA-BOUNDARY')
                        // console.log(body)
                        // body.splice(0,0)
                        // body.splice(body.size, 1)



                        // var reg = /--X-INSOMNIA-BOUNDARY/gi
                        // body = body.replace(reg,'|')
                        // reg = /Content-Disposition: form-data;/gi
                        // body = body.replace(reg,'|')
                        // reg = /(\\r\\n\\r)/gi
                        // body = body.replace(reg,'&')
                        // console.log(body)
                        // var arrString = body.split('--X-INSOMNIA-BOUNDARY\r\nContent-Disposition: form-data;')
                        //
                        // console.log(arrString)
                    })

                    session.push(101)
                    console.log(session)
                    res.writeHeader(200, {'Content-Type': 'text/plain'})
                    res.end('101')
                    break

                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'})
                    res.end("Request was not support!!!")
                    break
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