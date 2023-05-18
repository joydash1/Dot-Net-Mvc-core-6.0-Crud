$(document).ready(function () {
    ShowOderListData();
    SubTotal();
    $('#UpdateButton').hide();
});
function ShowOderListData() {
    $.ajax({
        url: '/OrderInventory/GetAllOrderList',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, status, xhr) {
            var tableData = '';
            $.each(result, function (index, item) {
                tableData += '<tr>';
                tableData += '<td class="d-none" id="raw_">' + item.id + '</td>';
                tableData += '<td class="name">' + item.c_Name + '</td>';
                tableData += '<td>' + item.p_Name + '</td>';
                tableData += '<td>' + item.order_Qty + '</td>';
                tableData += '<td>' + item.c_Address + '</td>';
                tableData += '<td>' + item.unitPrice + '</td>';
                tableData += '<td>' + item.discount + '</td>';
                tableData += '<td>' + item.totalPrice + '</td>';
                tableData += '<td class="d-none">' + item.order_Date + '</td>';
                tableData += '<td><a href="#" class="btn btn-warning" onclick="Edit(' + item.id + ')"><i class="fas fa-edit"></i></a>&nbsp;||&nbsp;<a href="#" class="btn btn-danger" onclick="Delete(' + item.id + ')"><i class="fa-solid fa-trash"></i></a></td>';
                tableData += '</tr>';
            });
            $("#OrderListBody").append(tableData);
        },
        error: function () {
            alert("Data Can't Get");
        }
    })
}
function Edit(id) {

    $.ajax({
        type: "GET",
        url: '/OrderInventory/Edit?id' + id,
        data: { "id": id },
        contentType: 'application/json;charset=utf-8;',
        dataType: 'json',
        success: function (data) {
            $('#exampleModal').modal('show');
            $("#OrderId").val(data.id);
            $("#ClientName").val(data.c_Name);
            $("#ProductName").val(data.p_Name);
            $("#OrderQuantity").val(data.order_Qty);
            $("#ClientAddress").val(data.c_Address);
            $("#UnitPrice").val(data.unitPrice);
            $("#DiscountPrice").val(data.discount);
            $("#TotalPrice").val(data.totalPrice);
            //$("#OrderDate").val(dat.order_Date);
            $("#OrderDate").attr("value", getDateByParameter(data.order_Date));
            $('#UpdateButton').show();
            $('#SaveBtn').hide();
        },
        error: function (ex) {
            //alert("Can't save");
        }
    });
}
function Delete(id) {
    debugger;
    var x = confirm("Are you sure,You want to delete This Record?");
    if (x == true) {
        $.ajax({
            url: '/OrderInventory/Delete?id' + id,
            type: "Post",
            data: { "id": id },
            dataType: 'json',
            success: function (data) {
                alert('Row delete successfully');
                //ShowOderListData();
            },
            error: function () {
                alert("Can't delete data");
            }
        });
    }
}
//Addorder
function AddOrder() {

    var OrderObj = {
        C_Name: $("#ClientName").val(),
        P_Name: $("#ProductName").val(),
        Order_Qty: $("#OrderQuantity").val(),
        C_Address: $("#ClientAddress").val(),
        UnitPrice: $("#UnitPrice").val(),
        Discount: $("#DiscountPrice").val(),
        TotalPrice: $("#TotalPrice").val(),
        Order_Date: $("#OrderDate").val()
    }
    $.ajax({
        url: '/OrderInventory/Create',
        type: "POST",
        dataType: 'json',
        data: OrderObj,
        success: function (data) {
            alert('Save Successfully');
            //ShowOderListData();
            Clear();
        },
        error: function (ex) {
            alert("Can't save");
        }
    });
}
function Clear() {
    $("#ClientName").val(''),
        $("#ProductName").val(''),
        $("#OrderQuantity").val(''),
        $("#ClientAddress").val(''),
        $("#UnitPrice").val(''),
        $("#DiscountPrice").val(''),
        $("#TotalPrice").val(''),
        $("#OrderDate").val('')
}
function SubTotal() {
    var Total = 0;
    var qty = $("#OrderQuantity").val();
    var price = $("#UnitPrice").val();
    var discount = $("#DiscountPrice").val();
    Total = qty * price - discount;
    $("#TotalPrice").val(Total);
}
function getDateByParameter(dateParameter) {
    let date = new Date(dateParameter);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    return (year + "-" + month + "-" + day);
};

function UpdatOrder() {
    var UpdateObj = {
        ID: $("#OrderId").val(),
        C_Name: $("#ClientName").val(),
        P_Name: $("#ProductName").val(),
        Order_Qty: $("#OrderQuantity").val(),
        C_Address: $("#ClientAddress").val(),
        UnitPrice: $("#UnitPrice").val(),
        Discount: $("#DiscountPrice").val(),
        TotalPrice: $("#TotalPrice").val(),
        Order_Date: $("#OrderDate").val()
    }
    $.ajax({
        type: "POST",
        url: '/OrderInventory/Update',
        data: UpdateObj,
        dataType: 'json',
        success: function (data) {
            alert('Update Successfully');
            //ShowOderListData();
            Clear();
        },
        error: function (ex) {
            alert("Can't save");
        }
    });
}