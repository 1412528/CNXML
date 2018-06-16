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
    Ghi_Phieu_ban(Chuoi_XML, pos){
        //-------------Ghi thêm vào file
        File.open(Duong_dan_Thu_muc_Du_lieu + "/Phieu_ban/Phieu_ban.xml", "r+", function(error, fd) {
            if(error){
                console.log(error.message);
            }
            else{
                // var bytesRead = Buffer.byteLength(Chuoi_XML, 'utf8');
                File.writeSync(fd, Chuoi_XML, pos, "utf8");
                // , function(error, data) {
                //     if (error) {
                //         console.error("close error:  " + error.message);
                //     }else {
                //         console.log(data);
                //     }
                // });
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
        var pos = Danh_sach_Phieu_ban.lastIndexOf("</Danh_sach_Phieu_ban>");
        var Chuoi_XML = `\t<Phieu_ban Ma_so="" Ngay="${Danh_sach_San_pham[0].Ngay}" Ho_ten="${Danh_sach_San_pham[0].Ho_ten}" Dia_chi="${Danh_sach_San_pham[0].Dia_chi}" Tong_Doanh_thu="${Danh_sach_San_pham[0].Tong_Doanh_thu}">\n`;
        // Tạo node Phiếu bán
        for (let index = 1; index < Danh_sach_San_pham.length; index++) {
            Chuoi_XML += `\t\t<Laptop Ma_so="${Danh_sach_San_pham[index].Ma_san_pham}" Don_gia_Ban="${Danh_sach_San_pham[index].Don_gia}" So_luong="${Danh_sach_San_pham[index].So_luong}" Doanh_thu="${Danh_sach_San_pham[index].Tien}">\n`;
            // Cập nhật laptop
            this.Cap_nhat_Laptop_da_ban(Danh_sach_San_pham[index]);
            
        }
        Chuoi_XML += "\t</Phieu_ban>\n</Danh_sach_Phieu_ban>";
        // Ghi phiếu bán
        //this.Ghi_Phieu_ban(Chuoi_XML, pos);
        
    }
    Cap_nhat_Laptop_da_ban(San_pham){
        var laptop = File.readFileSync(Duong_dan_Thu_muc_Du_lieu + `/Laptop/${San_pham.Ma_san_pham}.xml`, "UTF-8");
        var parser = new xml2js.Parser();
        parser.parseString(laptop, function (err, result) {
            result.Laptop.$.So_luong_Ton = parseInt(result.Laptop.$.So_luong_Ton) - parseInt(San_pham.So_luong);
            result.Laptop.$.Doanh_thu = parseInt(result.Laptop.$.Doanh_thu) + parseInt(San_pham.Tien);
            
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(result);
            File.writeFileSync(Duong_dan_Thu_muc_Du_lieu + `/Laptop/${San_pham.Ma_san_pham}.xml`, xml);
        });
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