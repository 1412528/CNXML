//************ Xử lý Thể hiện ***************/
function Tao_Chuoi_HTML_Danh_sach_Mat_hang(Danh_sach) {
  
  var Dia_chi_Media = "../Media/"
  var Th_Danh_sach = document.createElement("div")
  // Th_Danh_sach.className = "row"

  for (var i = 0; i < Danh_sach.getElementsByTagName("Laptop").length; i++) {
    var Laptop = Danh_sach.getElementsByTagName("Laptop")[i]
    var Ten = Laptop.getAttribute("Ten")
    var Ma_so = Laptop.getAttribute("Ma_so")
    var Don_gia_Ban = parseInt(Laptop.getAttribute("Don_gia_Ban"))
    var Trang_thai = Laptop.getAttribute("Trang_thai_Con_hang")
    var Th_Trang_thai
    if(Trang_thai === "false")
      Th_Trang_thai = "Hết hàng"
    else if(Trang_thai == null || Trang_thai == "true"){
      Th_Trang_thai = "Còn hàng"
    }

    var Th_Hinh_div = document.createElement("div")
    Th_Hinh_div.className = "product_image d-flex flex-column align-items-center justify-content-center"
    var Th_Hinh_img = document.createElement("img")
    Th_Hinh_img.src = `${Dia_chi_Media}/${Ma_so}.jpg`
    Th_Hinh_div.appendChild(Th_Hinh_img)

    var Th_Thong_tin = document.createElement("div")
    Th_Thong_tin.className = `product_content`
    var Th_Gia_Ban = document.createElement("div")
    Th_Gia_Ban.className = "product_price"
    Th_Gia_Ban.innerHTML = `${Don_gia_Ban.toLocaleString("vi")}`
    var Th_Ten = document.createElement("div")
    Th_Ten.className = "product_name"
    Th_Ten.innerHTML = `${Ten}`
    Th_Thong_tin.appendChild(Th_Gia_Ban)
    Th_Thong_tin.appendChild(Th_Ten)
    // Th_Thong_tin.style.cssText = `text-align:left`
    // Th_Thong_tin.innerHTML = `${Ten}
    //                 <br />Đơn giá Bán 
    //                 ${Don_gia_Ban.toLocaleString("vi")}
    //                 <br/>Trạng thái: ${Th_Trang_thai}`
    var Th_border = document.createElement("div")
    Th_border.className = "product_border"

    var Th_Laptop = document.createElement("div")
    Th_Laptop.className = `product_item is_new`
    Th_Laptop.style.cssFloat = "left"
    Th_Laptop.appendChild(Th_border)
    Th_Laptop.appendChild(Th_Hinh_div)
    Th_Laptop.appendChild(Th_Thong_tin)

    Th_Danh_sach.appendChild(Th_Laptop)
  }
  var Chuoi_HTML=Th_Danh_sach.outerHTML
  return Chuoi_HTML
}
//************** Xử lý Nghiệp vụ ***********
function Tra_cuu_Mat_hang(Chuoi_Tra_cuu, Danh_sach) {
  Chuoi_Tra_cuu = Chuoi_Tra_cuu.toUpperCase()
  var Tai_lieu = new DOMParser().parseFromString("<Danh_sach_Laptop /", "text/xml")
  
  var Danh_sach_Kq = Tai_lieu.documentElement
  for (var i = 0; i < Danh_sach.getElementsByTagName("Laptop").length; i++) {
    var Tivi = Danh_sach.getElementsByTagName("Laptop")[i]
    var Ten = Tivi.getAttribute("Ten").toUpperCase()
    if (Ten.indexOf(Chuoi_Tra_cuu) >= 0) 
      Danh_sach_Kq.appendChild(Tai_lieu.importNode(Tivi, true))
  }
  
  return Danh_sach_Kq
}

// ************** Xử lý Lưu trữ *********** 
function Doc_Danh_sach_Mat_hang() { 
  var Dia_chi_Dich_vu="http://localhost:3001"
  var Tham_so="Danh_sach_Mat_hang"
  var Dia_chi_Xu_ly=`${Dia_chi_Dich_vu}/${Tham_so}`
  var Xu_ly_HTTP = new XMLHttpRequest()
  Xu_ly_HTTP.open("GET",  Dia_chi_Xu_ly, false)
  // Xu_ly_HTTP.setRequestHeader('uid', '101');
  Xu_ly_HTTP.send()
  var Chuoi_XML = Xu_ly_HTTP.responseText
  var Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml").documentElement
  return Du_lieu
}


