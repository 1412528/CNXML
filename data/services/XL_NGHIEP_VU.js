var xml2js = require("xml2js");
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer=require("xmldom").XMLSerializer

class XL_NGHIEP_VU{
    Tinh_Doanh_thu_Nhan_vien(Nha_hang, Ho_ten, Tien_ban){
        for (let index = 0; index < Nha_hang.Danh_sach_Nhan_vien.Nhan_vien_Ban_hang.length; index++) {
            if(Nha_hang.Danh_sach_Nhan_vien.Nhan_vien_Ban_hang[index].Ho_Ten.toLowerCase() == Ho_ten){
              Nha_hang.Danh_sach_Nhan_vien.Nhan_vien_Ban_hang[index].Doanh_thu += parseInt(Tien_ban);
            }
        }
        return Nha_hang;
    }
    Tao_Danh_Sach_Tivi(Du_lieu){
        // Du_lieu.removeChild(Du_lieu.getElementsByTagName("Cua_hang")[0]);
        // for (let index = 0; index < Du_lieu.getElementsByTagName("Tivi").length; index++) {
        //     var Tivi = Du_lieu.getElementsByTagName("Danh_sach_Tivi")[0].getElementsByTagName("Tivi")[index];
        //     Tivi.removeChild(Tivi.getElementsByTagName("Danh_sach_Ban_hang"));
        //     Tivi.removeChild(Tivi.getElementsByTagName("Danh_sach_Nhap_hang"));
        // }
        // console.log(new XMLSerializer().serializeToString(Du_lieu))
        // return Du_lieu;
        var Chuoi_XML;
        var parser = new xml2js.Parser();
        parser.parseString(Du_lieu, function(err, result) {
            if (err) {
                console.log(err.message);
            } 
            else {
                delete result.Du_lieu.Cua_hang;
                for (let index = 0; index < result.Du_lieu.Danh_sach_Tivi[0].Tivi.length; index++) {
                    var Tivi = result.Du_lieu.Danh_sach_Tivi[0].Tivi[index];
                    delete Tivi.Danh_sach_Ban_hang;
                    delete Tivi.Danh_sach_Nhap_hang;
                }
                var builder = new xml2js.Builder();
                Chuoi_XML = builder.buildObject(result);
            }
        });
        console.log("Done")
        return new DOMParser().parseFromString(Chuoi_XML, "text/xml").documentElement;
    }
    Cap_nhat_DS_Tivi(DS_Tivi, Tivi_index, So_luong, Don_gia, Nghiep_vu){
        var Chuoi_XML;
        var parser = new xml2js.Parser();
        parser.parseString(DS_Tivi, function(err, result) {
            if (err) {
                console.log(err.message);
            } 
            else {
                var Tien_Ban = parseInt(Don_gia) * parseInt(So_luong);

                if(Nghiep_vu == "Bán Tivi"){
                    //cập nhật số lượng tồn
                    var sl = parseInt(result.Du_lieu.Danh_sach_Tivi[0].Tivi[Tivi_index].$.So_luong_Ton) - parseInt  (So_luong);
                    result.Du_lieu.Danh_sach_Tivi[0].Tivi[Tivi_index].$.So_luong_Ton = sl;
                    //cập nhật doanh thu
                    var dt = parseInt(result.Du_lieu.Danh_sach_Tivi[0].Tivi[Tivi_index].$.Doanh_thu) + Tien_Ban;
                    result.Du_lieu.Danh_sach_Tivi[0].Tivi[Tivi_index].$.Doanh_thu = dt;
                }
                else if(Nghiep_vu == "Nhập Tivi"){
                    //cập nhật số lượng tồn
                    if(isNaN(result.Du_lieu.Danh_sach_Tivi[0].Tivi[Tivi_index].$.So_luong_Ton))
                        result.Du_lieu.Danh_sach_Tivi[0].Tivi[Tivi_index].$.So_luong_Ton = So_luong;
                    else{
                        var sl = parseInt(result.Du_lieu.Danh_sach_Tivi[0].Tivi[Tivi_index].$.So_luong_Ton) + parseInt  (So_luong);
                        result.Du_lieu.Danh_sach_Tivi[0].Tivi[Tivi_index].$.So_luong_Ton = sl;
                    }
                }
                else if(Nghiep_vu == "Giá bán"){
                    //cập nhật đơn giá bán
                    result.Du_lieu.Danh_sach_Tivi[0].Tivi[Tivi_index].$.Don_gia_Ban = Don_gia
                }
                else if(Nghiep_vu == "Giá nhập"){
                    //cập nhật đơn giá bán
                    result.Du_lieu.Danh_sach_Tivi[0].Tivi[Tivi_index].$.Don_gia_Nhap = Don_gia
                }
                var builder = new xml2js.Builder();
                Chuoi_XML = builder.buildObject(result);
            }
        });
        DS_Tivi = new DOMParser().parseFromString(Chuoi_XML, "text/xml").documentElement;
        return DS_Tivi;
    }
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
    Nhap_Tivi(Du_lieu, Tivi_index, So_luong, Don_gia_Nhap){
        var Chuoi_XML = new XMLSerializer().serializeToString(Du_lieu);
        Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml");
        
        var Tivi = Du_lieu.getElementsByTagName("Danh_sach_Tivi")[0].getElementsByTagName("Tivi")[Tivi_index];
        var d = new Date();
        var Tien = parseInt(Don_gia_Nhap) * parseInt(So_luong);

        // tạo node bán hàng
        var new_Ban_hang = Du_lieu.createElement("Nhap_hang");
        new_Ban_hang.setAttribute("Ngay", d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate());
        new_Ban_hang.setAttribute("Don_gia", Don_gia_Nhap);
        new_Ban_hang.setAttribute("So_luong", So_luong);
        new_Ban_hang.setAttribute("Tien", Tien);
        Tivi.getElementsByTagName("Danh_sach_Nhap_hang")[0].appendChild(new_Ban_hang);
        //cập nhật số lượng tồn
        if(isNaN(Tivi.getAttribute("So_luong_Ton")))
            Tivi.setAttribute("So_luong_Ton", So_luong);
        else
            Tivi.setAttribute("So_luong_Ton", parseInt(Tivi.getAttribute("So_luong_Ton")) + parseInt(So_luong));

        return Du_lieu.documentElement;
    }
    Cap_nhat_Don_gia_Nhap(Du_lieu, Tivi_index, Don_gia){
        var Chuoi_XML = new XMLSerializer().serializeToString(Du_lieu);
        Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml");
        
        var Tivi = Du_lieu.getElementsByTagName("Danh_sach_Tivi")[0].getElementsByTagName("Tivi")[Tivi_index];Du_lieu.getElementsByTagName("Danh_sach_Tivi")[0].getElementsByTagName("Tivi")[Tivi_index];
        //cập nhật đơn giá bán
        Tivi.setAttribute("Don_gia_Nhap", Don_gia);

        return Du_lieu.documentElement;
    }
    Cap_nhat_Don_gia_Ban(Du_lieu, Tivi_index, Don_gia){
        var Chuoi_XML = new XMLSerializer().serializeToString(Du_lieu);
        Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml");
        
        var Tivi = Du_lieu.getElementsByTagName("Danh_sach_Tivi")[0].getElementsByTagName("Tivi")[Tivi_index];
        //cập nhật đơn giá bán
        Tivi.setAttribute("Don_gia_Ban", Don_gia);

        return Du_lieu.documentElement;
    }
}
//=============================
var Xu_ly = new XL_NGHIEP_VU();
module.exports = Xu_ly;