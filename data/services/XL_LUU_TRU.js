var File = require("fs");
var Duong_dan_Thu_muc_Du_lieu = __dirname + "/../database";
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;
var xml2js = require("xml2js");

var danhSach_Laptop= [];

class XL_LUU_TRU {
  Doc_Du_lieu() {
    File.readdirSync(Duong_dan_Thu_muc_Du_lieu + '/Laptop/').forEach(file =>{
      var filePath = Duong_dan_Thu_muc_Du_lieu + '/Laptop/' + file;
      var Chuoi_XML = File.readFileSync(filePath, "UTF-8");
      var parser = new xml2js.Parser()
        parser.parseString(Chuoi_XML, function (err, result) {
            danhSach_Laptop.push({'Laptop' : result.Laptop})
        })
    });
    var builder = new xml2js.Builder()
    var Du_lieu = builder.buildObject(danhSach_Laptop)
    console.log("--> DONE XML <--");
    return Du_lieu;
  }
  Doc_Thong_tin_Nha_hang(){
    var ChuoiJSON = File.readFileSync(Duong_dan_Thu_muc_Du_lieu + "/Nha_hang/Nha_hang.json", "UTF-8");
    var Nha_hang = JSON.parse(ChuoiJSON);
    return Nha_hang;
  }
  Ghi_Du_lieu(Du_lieu){
    var Chuoi_XML = new XMLSerializer().serializeToString(Du_lieu)
    File.writeFile(Duong_dan, Chuoi_XML, err => {
      if (err != null) console.log("--> Cannot create file Result.xml");
      else console.log("---> DONE XML <---");
    });
    
  }
  Ghi_Thong_tin_Nha_hang(Nha_hang){
    var Chuoi_JSON = JSON.stringify(Nha_hang);
    File.writeFile(Duong_dan_Thu_muc_Du_lieu + "/Nha_hang/Nha_hang.json", Chuoi_JSON, err=>{
      if (err != null) console.log("--> Cannot create file Result.xml");
      else console.log("---> DONE JSON<---");
    })
  }
}
//=============================
var Xu_ly = new XL_LUU_TRU();
module.exports = Xu_ly;
