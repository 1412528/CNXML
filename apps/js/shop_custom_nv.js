$(document).ready(function()
{
	"use strict";
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
		var Dieu_kien_1 = San_pham_index != -1 && (!isNaN(So_luong) && So_luong > 0);    
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
