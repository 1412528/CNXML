//*************** Biến dùng chung  ************
var Danh_sach_San_pham=[]
//*************** Biến Cố Khởi động  ************
$(document).ready(function()
{
	"use strict";
	// Đọc danh sách sản phẩm
	Danh_sach_San_pham = Doc_Danh_sach_Mat_hang();

	var stt = 1;

	// Thêm dòng
	$(".add-row").click(function(){
		//Nhập liệu
		var Ho_ten = $("#Th_Ho_ten").val();
		var Dia_chi = $("#Th_Address").val();
		var Ma_so_San_pham = $("#Th_Ma_so_San_pham").val();
		var So_luong = parseInt($("#Th_So_luong").val());

		var San_pham_index = Tim_San_pham(Ma_so_San_pham, Danh_sach_San_pham);
		
		//Kiểm tra
		var Dieu_kien_1 = San_pham_index != -1 && (!isNaN(So_luong) && So_luong > 0 && Ho_ten != "" && Dia_chi != "");    
		if(Dieu_kien_1){
			var So_luong_Ton = parseInt(Danh_sach_San_pham.getElementsByTagName("Laptop")[San_pham_index].getAttribute("So_luong_Ton"));
			var Don_gia = parseInt(Danh_sach_San_pham.getElementsByTagName("Laptop")[San_pham_index].getAttribute("Don_gia_Ban"));
		}
		var Dieu_kien_2 = So_luong_Ton >= So_luong;
		// var Hop_le_2 = false;
		// for (let index = 0; index < Danh_sach_Nhan_vien.Nhan_vien_Ban_hang.length; index++) {
		//     if(Ho_ten == Danh_sach_Nhan_vien.Nhan_vien_Ban_hang[index].Ho_Ten.toLowerCase())
		//         Hop_le_2 = true;
		// }
		if(Dieu_kien_1 && Dieu_kien_2){ // Xử lý Khi Hợp lệ
			var d = new Date();
			var date = d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
			var markup = "<tr><td>" + stt + "</td><td>" + Ho_ten + "</td><td>" + Dia_chi + "</td><td>" + date + "</td><td>" + Ma_so_San_pham + "</td><td>" + So_luong + 	"</td><td>" + Don_gia + "</td><td>" + So_luong*Don_gia + "</td></tr>";
			if(Ho_ten!="" && Dia_chi != "" && Ma_so_San_pham != "" && So_luong != ""){
				$("table tbody").append(markup);
				stt++;		
			}
			$("#Th_Ho_ten").attr("disabled", "disabled");
			$("#Th_Address").attr("disabled", "disabled");
		}
		else{ // Xử lý Khi Không Hợp lệ
			var Chuoi_HTML_Loi = "" 
			// if(!Hop_le_2)
			//     Chuoi_HTML_Loi += "Nhân viên " + Ho_ten + " Không hợp lệ<br>"
			if(Ho_ten == "")
				Chuoi_HTML_Loi = "Họ tên khách hàng không hợp lệ";
			else if(San_pham_index == -1)
				Chuoi_HTML_Loi = "Mã số nhập " + Ma_so_San_pham + " không hợp lệ";
			else if (Dia_chi == "")
				Chuoi_HTML_Loi = "Địa chỉ nhập Không hợp lệ";
			else if (isNaN(So_luong) || So_luong <= 0)
				Chuoi_HTML_Loi = "Số lượng nhập Không hợp lệ";
			else if(Dieu_kien_1 && !Dieu_kien_2)
				Chuoi_HTML_Loi = "Số lượng nhập " + So_luong + " lớn hơn Số lượng tồn " + So_luong_Ton;
			alert(Chuoi_HTML_Loi);
		}
	});
	// Tìm và xóa toàn bộ dòng
	$(".sell_product").click(function(){
		$("table tbody").find('tr').each(function(){
			$(this).remove();
		});
		stt = 1;
    });
});
//*************** Biến Cố Yêu cầu Bán hàng  *************
function Xu_ly_Ban_hang(){
	var Danh_sach_ban = [];
	var Phieu = {
		Ho_ten : $("table tbody").find('tr:eq(1)').find("td:eq(1)").text(),
		Dia_chi : $("table tbody").find('tr:eq(1)').find("td:eq(2)").text(),
		Ngay : $("table tbody").find('tr:eq(1)').find("td:eq(3)").text()
	};
	Danh_sach_ban.push(Phieu);
	$("table tbody").find('tr').each(function(){
		var San_pham = {
			Ma_san_pham : $(this).find("td:eq(4)").text(),
			So_luong : $(this).find("td:eq(5)").text(),
			Don_gia : $(this).find("td:eq(6)").text(),
			Tien : $(this).find("td:eq(7)").text()
		}
		Danh_sach_ban.push(San_pham);
	});
	Ban_hang(Danh_sach_ban);
}
