var File = require("fs");
var Duong_dan_Thu_muc_Du_lieu = __dirname + "/../database";
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;
var xml2js = require("xml2js");

class POST_METHOD{
    Ban_Tivi(Du_lieu, Tivi_index, So_luong, Don_gia_Ban){
        var Chuoi_XML = new XMLSerializer().serializeToString(Du_lieu);
        Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml");
        
        var Tivi = Du_lieu.getElementsByTagName("Danh_sach_Tivi")[0].getElementsByTagName("Tivi")[Tivi_index];
        var d = new Date();
        var Tien = parseInt(Don_gia_Ban) * parseInt(So_luong);

        // tạo node bán hàng
        var new_Ban_hang = Du_lieu.createElement("Ban_hang");
        new_Ban_hang.setAttribute("Ngay", d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate());
        new_Ban_hang.setAttribute("Don_gia", Don_gia_Ban);
        new_Ban_hang.setAttribute("So_luong", So_luong);
        new_Ban_hang.setAttribute("Tien", Tien);
        Tivi.getElementsByTagName("Danh_sach_Ban_hang")[0].appendChild(new_Ban_hang);
        //cập nhật số lượng tồn
        Tivi.setAttribute("So_luong_Ton", parseInt(Tivi.getAttribute("So_luong_Ton")) - parseInt(So_luong));
        //cập nhật doanh thu
        Tivi.setAttribute("Doanh_thu", parseInt(Tivi.getAttribute("Doanh_thu")) + parseInt(Tien));

        return Du_lieu.documentElement;
    }
    // Tinh_Doanh_thu_Nhan_vien(Nha_hang, Ho_ten, Tien_ban){
    //     for (let index = 0; index < Nha_hang.Danh_sach_Nhan_vien.Nhan_vien_Ban_hang.length; index++) {
    //         if(Nha_hang.Danh_sach_Nhan_vien.Nhan_vien_Ban_hang[index].Ho_Ten.toLowerCase() == Ho_ten){
    //           Nha_hang.Danh_sach_Nhan_vien.Nhan_vien_Ban_hang[index].Doanh_thu += parseInt(Tien_ban);
    //         }
    //     }
    //     return Nha_hang;
    // }
    
    // Cap_nhat_Don_gia_Ban(Du_lieu, Tivi_index, Don_gia){
    //     var Chuoi_XML = new XMLSerializer().serializeToString(Du_lieu);
    //     Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml");
        
    //     var Tivi = Du_lieu.getElementsByTagName("Danh_sach_Tivi")[0].getElementsByTagName("Tivi")[Tivi_index];
    //     //cập nhật đơn giá bán
    //     Tivi.setAttribute("Don_gia_Ban", Don_gia);

    //     return Du_lieu.documentElement;
    // }
}
//=============================
var postMethod = new POST_METHOD();
module.exports = postMethod;