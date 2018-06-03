"use strict";
var app = require("http");
var fs = require("fs");

var Port = 3000;
var Xu_ly_Tham_so = require("querystring");

app.createServer((req, res) => {
    console.log(`${req.method} URL: ${req.url}`);
    
    var req_url;
    if(req.url === "/")
      req_url = "/views/customer/index.html";
    else if(req.url === "/employee")
      req_url = "/views/employee/index.html";
    else if(req.url === "/employee/sell_product")
      req_url = "/views/employee/sell_product.html";
    else if(req.url === "/admin")
      req_url = "/views/admin/index.html";
    else if(req.url === "/admin/product")
      req_url = "/views/admin/product.html";
    else
      req_url = req.url;
    
    // Lưu ý: sau khi res nội dung của index.html về client thì ở file HTML sẽ có những
    //       request yêu cầu load nội dung của Resource (cụ thể ở đây là file js/script.js và img/favicon.ico)
    //       nên function này sẽ được gọi lại (callback) nhiều lần (cụ thể coi log ở dòng code thứ 6)
    
    // Xử lý phần header res sẽ gửi về Client
    var file_extension = req_url.lastIndexOf(".");
    
    var header_type = (file_extension == -1 && req.url != '/') ? "text/plain" : { '/' : 'text/html',
                                                                                  '.html' : 'text/html',
                                                                                  '.ico' : 'image/x-icon',
                                                                                  '.jpg' : 'image/jpeg',
                                                                                  '.png' : 'image/png',
                                                                                  '.gif' : 'image/gif',
                                                                                  '.css' : 'text/css',
                                                                                  '.js' : 'text/javascript',
                                                                                  '.woff2':'text/css',
                                                                                  '.woff':'text/css',
                                                                                  '.svg':'text/css',
                                                                                  '.eot':'text/css',
                                                                                  '.ttf':'text/css',
                                                                                  '.map':'application/octet-stream'
                                                                                }[req_url.substr(file_extension)];

    // Đọc file theo req gửi từ Client lên (lưu ý, phần này sẽ được call nhiều lần để đọc các file Resource)
    fs.readFile(__dirname + req_url, (err, data) => {
      if (err) {
        // Xử lý phần tìm không thấy resource ở Server
        console.log("==> Error: " + err);
        console.log("==> Error 404: file not found " + req.url);

        // Set Header của res thành 404 - Not found (thông báo lỗi hiển thị cho Client --> coi trong phần console của   Browser nếu có lỗi)
        res.writeHead(404, "Not found");
        res.end();
      } else {
        // Set Header cho res (phần header_type đã được xử lý tính toán ở dòng code thứ 16 và 17)
        res.setHeader("Content-type", header_type);

        res.end(data);
      }
    });
}).listen(Port, err => {
  if (err != null) console.log("==> Error: " + err);
  else console.log("Server is starting at port " + Port);
});

// NodeJs_Dich_vu.createServer((Yeu_cau, Dap_ung) => {
//   var Chuoi_Nhan = "";
//   var Dia_chi_Xu_ly = Yeu_cau.url.replace("/", "");
//   var Tham_so = Xu_ly_Tham_so.parse(Dia_chi_Xu_ly.replace("?", ""));
//   var Ma_so_Xu_ly = Tham_so.Ma_so_Xu_ly;
//   var Chuoi_Kq = "";
//   Yeu_cau.on("data", chunk => {
//     Chuoi_Nhan += chunk;
//   });
//   Yeu_cau.on("end", () => {
//     if (Ma_so_Xu_ly == "Doc_Du_lieu") {
//       // if(checkAuth(Yeu_cau.headers) === true){
//       // Chuoi_Kq = new XMLSerializer().serializeToString(Du_lieu);
//       Chuoi_Kq = Du_lieu;
//       // }
//     } else if (Ma_so_Xu_ly == "Nhap_Tivi") {
//       var Tivi_index = Tham_so.Tivi_index;
//       var So_luong = Tham_so.So_luong;
//       var Don_gia_Nhap = parseInt(
//         DS_Tivi.getElementsByTagName("Tivi")[Tivi_index].getAttribute(
//           "Don_gia_Nhap"
//         )
//       );

//       Du_lieu = Nghiep_vu.Nhap_Tivi(
//         Du_lieu,
//         Tivi_index,
//         So_luong,
//         Don_gia_Nhap
//       );
//       Luu_tru.Ghi_Du_lieu(Du_lieu);
//       DS_Tivi = Nghiep_vu.Cap_nhat_DS_Tivi(
//         DS_Tivi,
//         Tivi_index,
//         So_luong,
//         null,
//         "Nhập Tivi"
//       );

//       Chuoi_Kq = new XMLSerializer().serializeToString(DS_Tivi);
//     } else if (Ma_so_Xu_ly == "Ban_Tivi") {
//       var Ho_ten = Tham_so.Ho_ten;
//       var Tivi_index = Tham_so.Tivi_index;
//       var So_luong = Tham_so.So_luong;
//       var Don_gia_Ban = parseInt(
//         DS_Tivi.getElementsByTagName("Tivi")[Tivi_index].getAttribute(
//           "Don_gia_Ban"
//         )
//       );
//       var Tien_ban = Don_gia_Ban * So_luong;

//       Du_lieu = Nghiep_vu.Ban_Tivi(Du_lieu, Tivi_index, So_luong, Don_gia_Ban);
//       Luu_tru.Ghi_Du_lieu(Du_lieu);
//       DS_Tivi = Nghiep_vu.Cap_nhat_DS_Tivi(
//         DS_Tivi,
//         Tivi_index,
//         So_luong,
//         Don_gia_Ban,
//         "Bán Tivi"
//       );

//       Nha_hang = Nghiep_vu.Tinh_Doanh_thu_Nhan_vien(Nha_hang, Ho_ten, Tien_ban);
//       Luu_tru.Ghi_Thong_tin_Nha_hang(Nha_hang);

//       Chuoi_Kq = new XMLSerializer().serializeToString(DS_Tivi);
//     } else if (Ma_so_Xu_ly == "Cap_nhat_Don_gia_Nhap") {
//       var Tivi_index = Tham_so.Tivi_index;
//       var Don_gia = Tham_so.Don_gia;

//       Du_lieu = Nghiep_vu.Cap_nhat_Don_gia_Nhap(Du_lieu, Tivi_index, Don_gia);
//       Luu_tru.Ghi_Du_lieu(Du_lieu);
//       DS_Tivi = Nghiep_vu.Cap_nhat_DS_Tivi(
//         DS_Tivi,
//         Tivi_index,
//         null,
//         Don_gia,
//         "Giá nhập"
//       );

//       Chuoi_Kq = new XMLSerializer().serializeToString(DS_Tivi);
//     } else if (Ma_so_Xu_ly == "Cap_nhat_Don_gia_Ban") {
//       var Tivi_index = Tham_so.Tivi_index;
//       var Don_gia = Tham_so.Don_gia;

//       Du_lieu = Nghiep_vu.Cap_nhat_Don_gia_Ban(Du_lieu, Tivi_index, Don_gia);
//       Luu_tru.Ghi_Du_lieu(Du_lieu);
//       DS_Tivi = Nghiep_vu.Cap_nhat_DS_Tivi(
//         DS_Tivi,
//         Tivi_index,
//         null,
//         Don_gia,
//         "Giá bán"
//       );

//       Chuoi_Kq = new XMLSerializer().serializeToString(DS_Tivi);
//     } else if (Ma_so_Xu_ly == "Doc_Danh_sach_Nhan_vien") {
//       var Danh_sach_NV = Nha_hang.Danh_sach_Nhan_vien;
//       Chuoi_Kq = JSON.stringify(Danh_sach_NV);
//     } else if (Ma_so_Xu_ly == "Doc_Doanh_thu_Nhan_vien") {
//       var Ho_ten = Tham_so.Ho_ten;
//       var Doanh_thu_NV = 0;
//       for (
//         let index = 0;
//         index < Nha_hang.Danh_sach_Nhan_vien.Nhan_vien_Ban_hang.length;
//         index++
//       ) {
//         if (
//           Nha_hang.Danh_sach_Nhan_vien.Nhan_vien_Ban_hang[
//             index
//           ].Ho_Ten.toLowerCase() == Ho_ten
//         ) {
//           Doanh_thu_NV =
//             Nha_hang.Danh_sach_Nhan_vien.Nhan_vien_Ban_hang[index].Doanh_thu;
//         }
//       }
//       Chuoi_Kq = Doanh_thu_NV.toString();
//     } else if (Ma_so_Xu_ly == "...") {
//       Chuoi_Kq = "....";
//     } else {
//       Chuoi_Kq = "Không có Mã số Xử lý " + Ma_so_Xu_ly + " này";
//     }

//     Dap_ung.setHeader("Access-Control-Allow-Origin", "*");
//     // Dap_ung.setHeader("Access-Control-Allow-Headers","uid")
//     Dap_ung.end(Chuoi_Kq);
//   });
// }).listen(Port, err => {
//   if (err != null) console.log("==> Error: " + err);
//   else console.log("Server is starting at port " + port);
// });
