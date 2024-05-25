const md5 = require("md5");

const Account = require("../../models/accounts.model");
const systemConfig = require("../../config/system");

// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
    res.render("admin/pages/auth/login", {
        pageTitle: "Trang đăng nhập"
    });
}

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Account.findOne({
        email: email,
        deleted: false
    });

    if(!user) {
        res.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }

    if(md5(password) != user.password) {
        res.flash("error", "Sai mật khẩu!");
        res.redirect("back");
        return;
    }

    if(user.status != "active") {
        res.flash("error", "Tài khoản đã bị khóa!");
        res.redirect("back");
        return;
    }

    res.cookie("token", user.token);
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
}