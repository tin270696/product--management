const md5 = require("md5");

const Account = require("../../models/accounts.model");
const Role = require("../../models/role.model");

const generateHelper = require("../../helpers/generate.helper");
const systemConfig = require("../../config/system");

// [GET] /admin/account/index/
module.exports.index = async (req, res) =>  {
    const find = {
        deleted: false
    };

    const records = await Account.find(find);

    for(const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false
        });

        record.roleTitle = role.title;
    }

    res.render("admin/pages/accounts/index", {
        pageTitle: "Danh sách tài khoản",
        records: records
    })
}

// [GET] /admin/account/create/
module.exports.create = async (req, res) => {
    const find = {
        deleted: false
    }
    const roles = await Role.find(find);



    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo tài khoản",
        roles: roles
    })
}

// [POST] /admin/account/create/
module.exports.createPost = async (req, res) => {
    req.body.password = md5(req.body.password);
    req.body.token = generateHelper.generateRandomString(30);

    const account = new Account(req.body);
    await account.save();

    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}