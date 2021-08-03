document.getElementById("btnThemNV").addEventListener("click", themNhanVien);
document.getElementById("tableDanhSach").addEventListener("click", delegation);
document.getElementById("btnCapNhat").addEventListener("click", capNhat);
document.getElementById("btnTimNV").addEventListener("click", timKiem);
function Nhanvien(
  taiKhoan,
  hoTen,
  email,
  matKhau,
  ngayLam,
  luongCoBan,
  chucVu,
  gioLam
) {
  this.taiKhoan = taiKhoan;
  this.hoTen = hoTen;
  this.email = email;
  this.matKhau = matKhau;
  this.ngayLam = ngayLam;
  this.luongCoBan = luongCoBan;
  this.chucVu = chucVu;
  this.gioLam = gioLam;
}

Nhanvien.prototype.tongLuong = function () {
  if (this.chucVu == "Sếp") {
    return this.luongCoBan * 3;
  }

  if (this.chucVu == "Trưởng phòng") {
    return this.luongCoBan * 2;
  }

  if (this.chucVu == "Nhân viên") {
    return this.luongCoBan;
  }
};

Nhanvien.prototype.xepLoai = function () {
  if (this.gioLam >= 192) {
    return `Nhân viên xuất sắc`;
  }

  if (this.gioLam >= 176) {
    return `Nhân viên giỏi`;
  }

  if (this.gioLam >= 160) {
    return `Nhân viên khá`;
  }

  return `Nhân viên trung bình`;
};

var dsnv = [];

function themNhanVien() {
  var taiKhoan = document.getElementById("tknv").value;
  var hoTen = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var matKhau = document.getElementById("password").value;
  var ngayLam = document.getElementById("datepicker").value;
  var luongCoBan = +document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucvu").value;
  var gioLam = +document.getElementById("gioLam").value;

  var nhanVien = new Nhanvien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam
  );

  dsnv.push(nhanVien);

  hienThi(dsnv);
  resetForm();
}

function hienThi(dsnv) {
  var tbody = document.getElementById("tableDanhSach");
  var html = "";
  for (let i = 0; i < dsnv.length; i++) {
    html += `
            <tr>
                <td>${dsnv[i].taiKhoan}</td>
                <td>${dsnv[i].hoTen}</td>
                <td>${dsnv[i].email}</td>
                <td>${dsnv[i].ngayLam}</td>
                <td>${dsnv[i].chucVu}</td>
                <td>${dsnv[i].tongLuong()}</td>
                <td>${dsnv[i].xepLoai()}</td>
                <td>
                <button class="btn btn-primary my-1" data-tk ="${
                  dsnv[i].taiKhoan
                }"
                data-action = "select" data-toggle="modal" data-target="#myModal">Cập nhật</button>
                <button class="btn btn-danger" data-tk ="${dsnv[i].taiKhoan}"
                data-action = "delete"">Xóa</button>
                </td>
            </tr>
        `;
  }

  tbody.innerHTML = html;
}

function delegation(event) {
  var taiKhoan = event.target.getAttribute("data-tk");
  var action = event.target.getAttribute("data-action");

  if (action === "select") {
    console.log(action);
    chonNhanVien(taiKhoan);
  }

  if (action === "delete") {
    xoaNhanVien(taiKhoan);
  }
}

function xoaNhanVien(taiKhoan) {
  dsnv = dsnv.filter(function (maTK) {
    return maTK.taiKhoan !== taiKhoan;
  });

  hienThi(dsnv);
}

function chonNhanVien(taiKhoan){
  var nhanVien = dsnv.find(function (maTK) {
    return maTK.taiKhoan === taiKhoan;
  })

  document.getElementById("tknv").value = nhanVien.taiKhoan;
  document.getElementById("name").value = nhanVien.hoTen;
  document.getElementById("email").value = nhanVien.email;
  document.getElementById("password").value = nhanVien.matKhau;
  document.getElementById("datepicker").value = nhanVien.ngayLam;
  document.getElementById("luongCB").value = nhanVien.luongCoBan;
  document.getElementById("chucvu").value = nhanVien.chucVu;
  document.getElementById("gioLam").value = nhanVien.gioLam;

  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").style.display = "none";
}


function capNhat (){
  var taiKhoan = document.getElementById("tknv").value;
  var hoTen = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var matKhau = document.getElementById("password").value;
  var ngayLam = document.getElementById("datepicker").value;
  var luongCoBan = +document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucvu").value;
  var gioLam = +document.getElementById("gioLam").value;

  var nhanVien = new Nhanvien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam
  );

  dsnv = dsnv.map(function (nv){
    if (nv.taiKhoan === taiKhoan) {
        return nhanVien;
    } 

    return nv
  })
  document.getElementById("btnThemNV").style.display = "none";
  hienThi(dsnv);  
}

function resetForm (){
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "Chọn chức vụ";
  document.getElementById("gioLam").value = "";

}

function timKiem(){
  var search = document.getElementById('searchName').value;

  var newDs =  dsnv.filter(function(nv){
    return (nv.xepLoai().toLowerCase().trim().indexOf(search.toLowerCase().trim())) !== -1;
  }) 

  console.log(newDs);
  hienThi(newDs);

  document.getElementById('searchName').value = "";
}