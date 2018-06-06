var File = require("fs");
var Duong_dan_Thu_muc_Du_lieu = __dirname + "/../database";
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;
var xml2js = require("xml2js");

class POST_METHOD{
    Doc_Danh_sach_Phieu_ban(){
        var xml = File.readFileSync(Duong_dan_Thu_muc_Du_lieu + "/Phieu_ban/Phieu_ban.xml", "UTF-8");
        return xml;
    }
    Ghi_Phieu_ban(Chuoi_XML, pos, Danh_sach_San_pham){
        //-------------Ghi thêm vào file
        File.open(Duong_dan_Thu_muc_Du_lieu + "/Phieu_ban/Phieu_ban.xml", "r+", function(error, fd) {
            if(error){
                console.log(error.message);
            }
            else{
                File.write(fd, Chuoi_XML, pos, "utf8", function(error, bytesRead, data) {
                    if (error) {
                        console.error("close error:  " + error.message);
                    }else {
                        console.log(data);
                    }
                });
                File.close(fd, function(error) {
                    if (error) {
                        console.error("close error:  " + error.message);
                    } else {
                        console.log("File was closed!");
                    }
                });
            }
        });
    }
    Ban_Laptop(Danh_sach_San_pham){
        var Danh_sach_Phieu_ban = this.Doc_Danh_sach_Phieu_ban();
        var Chuoi_XML = `</Phieu_ban>\n\t<Phieu_ban Ma_so="" Ngay="${Danh_sach_San_pham[0].Ngay}" Ho_ten="${Danh_sach_San_pham[0].Ho_ten}" Dia_chi="${Danh_sach_San_pham[0].Dia_chi}">\n`;
        //Tạo node Phiếu bán
        for (let index = 1; index < Danh_sach_San_pham.length; index++) {
            Chuoi_XML += `\t\t<Laptop Ma_so="${Danh_sach_San_pham[index].Ma_san_pham}" Don_gia_Ban="${Danh_sach_San_pham[index].Don_gia}" So_luong="${Danh_sach_San_pham[index].So_luong}" Doanh_thu="${Danh_sach_San_pham[index].Tien}">\n`
        }
        Chuoi_XML += "\t</Phieu_ban>\n</Danh_sach_Phieu_ban>";
        // Ghi file
        this.Ghi_Phieu_ban(Chuoi_XML, Danh_sach_Phieu_ban.lastIndexOf("</Phieu_ban>"), Danh_sach_San_pham);
        // var Chuoi_XML = new XMLSerializer().serializeToString(Du_lieu);
        // Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml");
        
        // var Tivi = Du_lieu.getElementsByTagName("Danh_sach_Tivi")[0].getElementsByTagName("Tivi")[Tivi_index];
        // var d = new Date();
        // var Tien = parseInt(Don_gia_Ban) * parseInt(So_luong);

        // // tạo node bán hàng
        // var new_Ban_hang = Du_lieu.createElement("Ban_hang");
        // new_Ban_hang.setAttribute("Ngay", d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate());
        // new_Ban_hang.setAttribute("Don_gia", Don_gia_Ban);
        // new_Ban_hang.setAttribute("So_luong", So_luong);
        // new_Ban_hang.setAttribute("Tien", Tien);
        // Tivi.getElementsByTagName("Danh_sach_Ban_hang")[0].appendChild(new_Ban_hang);
        // //cập nhật số lượng tồn
        // Tivi.setAttribute("So_luong_Ton", parseInt(Tivi.getAttribute("So_luong_Ton")) - parseInt(So_luong));
        // //cập nhật doanh thu
        // Tivi.setAttribute("Doanh_thu", parseInt(Tivi.getAttribute("Doanh_thu")) + parseInt(Tien));

        // return Du_lieu.documentElement;
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