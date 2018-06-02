$(document).ready(function()
{
	"use strict";
	var stt = 1;
	// Thêm dòng
	$(".add-row").click(function(){
		var name = $("#Th_Ho_ten").val();
		var date = $("#Th_Ngay").val();
		var id = $("#Th_Ma_so_Tivi").val();
		var num = $("#Th_So_luong").val();
		var markup = "<tr><td>" + stt + "</td><td>" + name + "</td><td>" + date + "</td><td>" + id + "</td><td>" + num + 	"</td><td>" + num + "</td><td>" + num + "</td></tr>";
		$("table tbody").append(markup);
		stt++;
	});
	// Tìm và xóa toàn bộ dòng
	$(".sell_product").click(function(){
		$("table tbody").find('tr').each(function(){
			$(this).remove();
		});
		stt = 1;
    });
});