function Validator() {
  this.errors = {};
}

Validator.prototype.isRequired = function (name, value) {
  if (!value) {
    this.errors[name] = "Vui lòng nhập vào trường này!";
    return false;
  }
  return true;
};

Validator.prototype.taiKhoan = function (name, value) {
  if (!/[0-9]{4-6}$/.test(value)) {
    this.errors[name] = "Nhập từ 4 - 6 ký tự số";
    return false;
  }
  return true;
};

Validator.prototype.hoTen = function (name, value) {
  if (!/[a-zA-Z]$/.test(value)) {
    this.errors[name] = "Tên phải là chữ";
    return false;
  }
  return true;
};

Validator.prototype.hoTen = function (name, value) {
  if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)) {
    this.errors[name] = "Email phải đúng định dạng";
    return false;
  }
  return true;
};

Validator.prototype.matKhau = function (name, value) {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
      this.errors[name] = "Chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
      return false;
    }
    return true;
  };

  Validator.prototype.ngayLam = function (name, value) {
    if (!/  ^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(value)) {
      this.errors[name] = "Định dạng dd/mm//yy";
      return false;
    }
    return true;
  };