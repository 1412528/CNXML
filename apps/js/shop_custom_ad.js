//*************** Biến dùng chung  ************
var Danh_sach_San_pham=[]
var Tong_Doanh_thu = 0;
//*************** Biến Cố Khởi động  ************
$(document).ready(function()
{
	"use strict";
	// Đọc danh sách sản phẩm
	Danh_sach_San_pham = Doc_Danh_sach_Mat_hang();
	
	var stt = 1;

    for (var i = 0; i < Danh_sach_San_pham.getElementsByTagName("Laptop").length; i++) {
        var Laptop = Danh_sach_San_pham.getElementsByTagName("Laptop")[i]
        var Ten = Laptop.getAttribute("Ten")
        var Ma_so = Laptop.getAttribute("Ma_so")
        var Don_gia_Ban = Laptop.getAttribute("Don_gia_Ban")
        var So_luong = Laptop.getAttribute("So_luong_Ton")
        var Doanh_thu = Laptop.getAttribute("Doanh_thu")
		var Trang_thai = Laptop.getAttribute("Trang_thai")
		
        var markup = "<tr><td>" + stt + "</td><td>" + Ma_so + "</td><td>" + Ten + "</td><td>" + So_luong + 	"</td><td>" + Don_gia_Ban + "</td><td>" + Doanh_thu + "</td><td>" + Trang_thai + "</td><td>" + "<i class='fas fa-edit btn_update'></i>" + "</td></tr>";
		$("table tbody").append(markup);
		stt++;		
    }
	
	var id, price, status; 
	$('#list').on('click', 'i', function(){
		id = $(this).closest('tr').find('td:eq(1)').text();
		price = $(this).closest('tr').find('td:eq(4)').text();
		status = $(this).closest('tr').find('td:eq(6)').text();
		$('#Th_update_Price').val(price);
		$('#Th_update_Status').val(status);

		$('.update_product').addClass('show_box');
        $('.cover').addClass('show_box');
	});

	$('.close_form_update, .cover').click(function (e) { 
        e.preventDefault();
        $('.update_product').removeClass('show_box');
        $('.cover').removeClass('show_box');
    });
    $('.save_form_update').click(function (e) { 
        e.preventDefault();
		// thực hiện request
		price = $("#Th_update_Price").val();
		status = $("#Th_update_Status").val();
		Danh_sach_San_pham = Cap_nhat_San_pham(id, price,status);

        $('.update_product').removeClass('show_box');
		$('.cover').removeClass('show_box');
		location.reload();
	});
	
	// Thêm dòng
	// $(".add-row").click(function(){
	// 	//Nhập liệu
	// 	var Ho_ten = $("#Th_Ho_ten").val();
	// 	var Dia_chi = $("#Th_Address").val();
	// 	var Ma_so_San_pham = $("#Th_Ma_so_San_pham").val();
	// 	var So_luong = parseInt($("#Th_So_luong").val());

	// 	var San_pham_index = Tim_San_pham(Ma_so_San_pham, Danh_sach_San_pham);
		
		
	// });
	// // Tìm và xóa toàn bộ dòng
	// $(".sell_product").click( function(){
	// 	$("table tbody").find('tr').each(function(){
	// 		$(this).remove();
	// 	});
	// 	stt = 1;
	// 	Tong_Doanh_thu = 0;
	// 	$("#Th_Tong_cong").text(Tong_Doanh_thu);
	// 	$("#Th_Ho_ten").attr("disabled", false);
	// 	$("#Th_Address").attr("disabled", false);
	// 	$("#Th_Ho_ten").attr("value", "");
	// 	$("#Th_Address").attr("value", "");	
	// 	$("#Th_Ma_so_San_pham").attr("value", "");
	// 	$("#Th_So_luong").attr("value", "");
    // });
});
//*************** Biến Cố Yêu cầu Bán hàng  *************
// function Xu_ly_Ban_hang(){
// 	var Danh_sach_ban = [];
// 	var Phieu = {
// 		Ho_ten : $("table tbody").find('tr:eq(1)').find("td:eq(1)").text(),
// 		Dia_chi : $("table tbody").find('tr:eq(1)').find("td:eq(2)").text(),
// 		Ngay : $("table tbody").find('tr:eq(1)').find("td:eq(3)").text(),
// 		Tong_Doanh_thu: Tong_Doanh_thu
// 	};
// 	Danh_sach_ban.push(Phieu);
// 	$("table tbody").find('tr').each(function(){
// 		var San_pham = {
// 			Ma_san_pham : $(this).find("td:eq(4)").text(),
// 			So_luong : $(this).find("td:eq(5)").text(),
// 			Don_gia : $(this).find("td:eq(6)").text(),
// 			Tien : $(this).find("td:eq(7)").text()
// 		}
// 		Danh_sach_ban.push(San_pham);
// 	});
// 	Danh_sach_San_pham = Ban_hang(Danh_sach_ban);
// }
