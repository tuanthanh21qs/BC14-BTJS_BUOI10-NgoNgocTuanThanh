document.getElementById("btnThemNV").addEventListener("click", themNhanVien);
document.getElementById("tableDanhSach").addEventListener("click", xoaNhanVien);

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
  hienThi();
}

function hienThi() {
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
                    <button class="btn btn-danger" data-tk ="${dsnv[i].taiKhoan}">Xóa</button>
                </td>
            </tr>
        `;
  }

  tbody.innerHTML = html;
}

function xoaNhanVien(event){
    var taiKhoan = event.target.getAttribute('data-tk');   

    dsnv = dsnv.filter(function(maTK){
        return maTK.taiKhoan !== taiKhoan; 
    })

    hienThi();
}