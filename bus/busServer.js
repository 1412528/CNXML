var app = require('http');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var Port = 3001;
var session = [101];

function checkAuth(headers) {
  var uid = headers.uid;
  for (var i = 0; i < session.length; i++) {
    if (uid == session[i]) {
      return true;
    }
  }
  return false;
}

app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    switch(req.method) {
        case 'GET':
            switch(req.url){
                case '/CuaHang':
                    if(checkAuth(req.headers) === true){
                        res.writeHeader(200, {'Content-Type': 'text/xml'})
                        var data =  getMethod.get_CuaHang()
                        res.end(data)
                    }
                    else {
                        res.writeHeader(404, {'Content-Type': 'text/plain'})
                        res.end("Request was not support!!!")
                    }
                    break

                case '/Danh_sach_Mat_hang':
                    // console.log("Đã nhận request");
                    // res.end();
                    var Dia_chi_Dich_vu="http://localhost:3002";
                    var Tham_so="Danh_Sach_Tivi";
                    var Dia_chi_Xu_ly=`${Dia_chi_Dich_vu}/${Tham_so}`;
                    var Xu_ly_HTTP = new XMLHttpRequest();
                    Xu_ly_HTTP.open("GET",  Dia_chi_Xu_ly, false);
                    Xu_ly_HTTP.send();
                    var data = Xu_ly_HTTP.responseText;
                    
                    res.writeHeader(200, {'Content-Type': 'text/xml', 'Access-Control-Allow-Origin' : '*'});
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