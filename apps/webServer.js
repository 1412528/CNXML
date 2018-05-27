'use strict'
var NodeJs_Dich_vu = require("http")
var Luu_tru=require("../3-Doi_tuong_va_Xu_ly/XL_LUU_TRU.js")
var Nghiep_vu=require("../3-Doi_tuong_va_Xu_ly/XL_NGHIEP_VU.js")
var Port = 1000
var Xu_ly_Tham_so = require('querystring')
var DOMParser=require("xmldom").DOMParser
var XMLSerializer=require("xmldom").XMLSerializer

var Du_lieu = Luu_tru.Doc_Du_lieu()
//var Nha_hang = Luu_tru.Doc_Thong_tin_Nha_hang()
//var DS_Tivi = Nghiep_vu.Tao_Danh_Sach_Tivi(Du_lieu)

var session = [101]

function checkAuth(headers){
    var uid = headers.uid
    for(var i = 0; i < session.length; i++){
        if(uid == session[i]){
            return true
        }
    }
    return false
}

var Dich_vu = NodeJs_Dich_vu.createServer((Yeu_cau, Dap_ung) =>
{
  var Chuoi_Nhan = "" 
  var Dia_chi_Xu_ly = Yeu_cau.url.replace("/","")
  var Tham_so = Xu_ly_Tham_so.parse(Dia_chi_Xu_ly.replace("?",""))
  var Ma_so_Xu_ly=Tham_so.Ma_so_Xu_ly
  var Chuoi_Kq=""
  Yeu_cau.on('data', (chunk) => {Chuoi_Nhan += chunk})
  Yeu_cau.on('end', () => {
    if (Ma_so_Xu_ly == "Doc_Du_lieu"){
      // if(checkAuth(Yeu_cau.headers) === true){
        // Chuoi_Kq = new XMLSerializer().serializeToString(Du_lieu);
        Chuoi_Kq = Du_lieu;
      // }
    }
    else if(Ma_so_Xu_ly == "Nhap_Tivi"){
      var Tivi_index = Tham_so.Tivi_index
      var So_luong = Tham_so.So_luong
      var Don_gia_Nhap = parseInt(DS_Tivi.getElementsByTagName("Tivi")[Tivi_index].getAttribute("Don_gia_Nhap"));

      Du_lieu = Nghiep_vu.Nhap_Tivi(Du_lieu, Tivi_index, So_luong, Don_gia_Nhap)
      Luu_tru.Ghi_Du_lieu(Du_lieu)
      DS_Tivi = Nghiep_vu.Cap_nhat_DS_Tivi(DS_Tivi, Tivi_index, So_luong, null, "Nhập Tivi")

      Chuoi_Kq = new XMLSerializer().serializeToString(DS_Tivi) 
    }
    else if(Ma_so_Xu_ly == "Ban_Tivi"){
      var Ho_ten = Tham_so.Ho_ten
      var Tivi_index = Tham_so.Tivi_index
      var So_luong = Tham_so.So_luong
      var Don_gia_Ban = parseInt(DS_Tivi.getElementsByTagName("Tivi")[Tivi_index].getAttribute("Don_gia_Ban"));
      var Tien_ban = Don_gia_Ban * So_luong;
      
      Du_lieu = Nghiep_vu.Ban_Tivi(Du_lieu, Tivi_index, So_luong, Don_gia_Ban)
      Luu_tru.Ghi_Du_lieu(Du_lieu)
      DS_Tivi = Nghiep_vu.Cap_nhat_DS_Tivi(DS_Tivi, Tivi_index, So_luong, Don_gia_Ban, "Bán Tivi")
      
      Nha_hang = Nghiep_vu.Tinh_Doanh_thu_Nhan_vien(Nha_hang, Ho_ten, Tien_ban)
      Luu_tru.Ghi_Thong_tin_Nha_hang(Nha_hang)

      Chuoi_Kq = new XMLSerializer().serializeToString(DS_Tivi)
    }
    else if(Ma_so_Xu_ly == "Cap_nhat_Don_gia_Nhap"){
      var Tivi_index = Tham_so.Tivi_index
      var Don_gia = Tham_so.Don_gia
      
      Du_lieu = Nghiep_vu.Cap_nhat_Don_gia_Nhap(Du_lieu, Tivi_index, Don_gia)
      Luu_tru.Ghi_Du_lieu(Du_lieu)
      DS_Tivi = Nghiep_vu.Cap_nhat_DS_Tivi(DS_Tivi, Tivi_index, null, Don_gia, "Giá nhập")

      Chuoi_Kq = new XMLSerializer().serializeToString(DS_Tivi) 
    }
    else if(Ma_so_Xu_ly == "Cap_nhat_Don_gia_Ban"){
      var Tivi_index = Tham_so.Tivi_index
      var Don_gia = Tham_so.Don_gia
      
      Du_lieu = Nghiep_vu.Cap_nhat_Don_gia_Ban(Du_lieu, Tivi_index, Don_gia)
      Luu_tru.Ghi_Du_lieu(Du_lieu)
      DS_Tivi = Nghiep_vu.Cap_nhat_DS_Tivi(DS_Tivi, Tivi_index, null, Don_gia, "Giá bán")
      
      Chuoi_Kq = new XMLSerializer().serializeToString(DS_Tivi) 
    }
    else if(Ma_so_Xu_ly == "Doc_Danh_sach_Nhan_vien"){
      var Danh_sach_NV = Nha_hang.Danh_sach_Nhan_vien;
      Chuoi_Kq = JSON.stringify(Danh_sach_NV);
    }
    else if(Ma_so_Xu_ly == "Doc_Doanh_thu_Nhan_vien"){
      var Ho_ten = Tham_so.Ho_ten;
      var Doanh_thu_NV = 0;
      for (let index = 0; index < Nha_hang.Danh_sach_Nhan_vien.Nhan_vien_Ban_hang.length; index++) {
        if(Nha_hang.Danh_sach_Nhan_vien.Nhan_vien_Ban_hang[index].Ho_Ten.toLowerCase() == Ho_ten){
          Doanh_thu_NV = Nha_hang.Danh_sach_Nhan_vien.Nhan_vien_Ban_hang[index].Doanh_thu;
        }
      }
      Chuoi_Kq = Doanh_thu_NV.toString();
    }
    else if (Ma_so_Xu_ly=="..."){
      Chuoi_Kq="...." 
    }
    else {
      Chuoi_Kq="Không có Mã số Xử lý "+  Ma_so_Xu_ly + " này"
    }

    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
    // Dap_ung.setHeader("Access-Control-Allow-Headers","uid")
    Dap_ung.end(Chuoi_Kq); 
    
  })

})

Dich_vu.listen(Port);