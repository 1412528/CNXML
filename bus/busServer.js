var app = require('http');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var Port = 3001;
var session = [];

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
                case '/Danh_sach_Mat_hang':
                    var Dia_chi_Dich_vu="http://localhost:3002";
                    var Tham_so="Danh_Sach_Laptop";
                    var Dia_chi_Xu_ly=`${Dia_chi_Dich_vu}/${Tham_so}`;
                    var Xu_ly_HTTP = new XMLHttpRequest();
                    Xu_ly_HTTP.open("GET",  Dia_chi_Xu_ly, false);
                    Xu_ly_HTTP.send();
                    var data = Xu_ly_HTTP.responseText;
                    console.log(data);
                    
                    res.writeHeader(200, {'Content-Type': 'text/xml', 'Access-Control-Allow-Origin' : '*'});
                    res.end(data);
                    break;

                // case '/CuaHang':
                    //     if(checkAuth(req.headers) === true){
                    //         res.writeHeader(200, {'Content-Type': 'text/xml'})
                    //         var data =  getMethod.get_CuaHang()
                    //         res.end(data)
                    //     }
                    //     else {
                    //         res.writeHeader(404, {'Content-Type': 'text/plain'})
                    //         res.end("Request was not support!!!")
                    //     }
                    //     break

                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'})
                    res.end("Request was not support!!!")
                    break
            }
            break
        case 'POST':
            switch(req.url){
                case '/Ban_hang':
                    // console.log(req.headers);
                    // console.log(req.body);
                    if(checkAuth(req.headers) === true){
                        res.writeHeader(200, {'Content-Type': 'text/xml'})
                        var data =  getMethod.get_CuaHang()
                        res.end(data)
                    }
                    else {
                        var body = [];
                        req.on('data', (chunk) => {
                            body.push(chunk)
                        }).on('end', () => {
                            body = Buffer.concat(body).toString();

                            var Dia_chi_Dich_vu="http://localhost:3002";
                            var Tham_so="Ban_Laptop";
                            var Dia_chi_Xu_ly=`${Dia_chi_Dich_vu}/${Tham_so}`;
                            var Xu_ly_HTTP = new XMLHttpRequest();
                            Xu_ly_HTTP.open("POST",  Dia_chi_Xu_ly, false)
                            Xu_ly_HTTP.setRequestHeader('Content-Type', 'application/json');
                            Xu_ly_HTTP.send(body);
                            var ds_Laptop = Xu_ly_HTTP.responseText;
                            // console.log(ds_Laptop);
                            res.writeHeader(200, {'Content-Type': 'text/xml', 'Access-Control-Allow-Origin' : '*'});
                            res.end(ds_Laptop);
                        });
                    }
                    
                    break;
                case '/Cap_nhat_Mat_hang':                    
                    var body = [];
                    req.on('data', (chunk) => {
                        body.push(chunk)
                    }).on('end', () => {
                        body = Buffer.concat(body).toString();
                        // console.log(JSON.parse(body));
                        
                        var Dia_chi_Dich_vu="http://localhost:3002";
                        var Tham_so="Cap_nhat_Laptop";
                        var Dia_chi_Xu_ly=`${Dia_chi_Dich_vu}/${Tham_so}`;
                        var Xu_ly_HTTP = new XMLHttpRequest();
                        Xu_ly_HTTP.open("POST",  Dia_chi_Xu_ly, false)
                        Xu_ly_HTTP.setRequestHeader('Content-Type', 'application/json');
                        Xu_ly_HTTP.send(body);
                        var ds_Laptop = Xu_ly_HTTP.responseText;
                        res.writeHeader(200, {'Content-Type': 'text/xml', 'Access-Control-Allow-Origin' : '*'});
                        res.end(ds_Laptop);
                    })
                    break;

                case '/login':                    
                    var body = [];
                    req.on('data', (chunk) => {
                        body.push(chunk)
                    }).on('end', () => {
                        body = Buffer.concat(body).toString();
                        var user = JSON.parse(body);
                        
                        var Dia_chi_Dich_vu="http://localhost:3002";
                        var Tham_so="Danh_sach_Nhan_vien";
                        var Dia_chi_Xu_ly=`${Dia_chi_Dich_vu}/${Tham_so}`;
                        var Xu_ly_HTTP = new XMLHttpRequest();
                        Xu_ly_HTTP.open("GET",  Dia_chi_Xu_ly, false)
                        Xu_ly_HTTP.send();
                        var data = Xu_ly_HTTP.responseText;
                        var ds_Nhan_vien = JSON.parse(data);
                        
                        for (let i = 0; i < ds_Nhan_vien.Danh_sach_Nhan_vien.length; i++) {
                            if(ds_Nhan_vien.Danh_sach_Nhan_vien[i].Ten_Dang_nhap === user.uid && ds_Nhan_vien.Danh_sach_Nhan_vien[i].Mat_khau === user.pass)
                            {
                                user.permission = ds_Nhan_vien.Danh_sach_Nhan_vien[i].Permission;
                                session.push(user);
                                console.log(session);

                                
                            }
                        }

                    });
                    res.writeHeader(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*'});
                    res.end(JSON.stringify(session.permission));      
                    // res.writeHeader(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin' : '*'});
                    // res.end();
                    break;

                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'})
                    res.end("Request was not support!!!")
                    break
            }
            break
        case 'OPTIONS':
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
            res.end();
            break;
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