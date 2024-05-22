const ProductCategory = require("../../models/product-category.model")
const systemConfig = require("../../config/system")
const createTreeHelper = require("../../helpers/createTree.helper");

// [GET] /admin/product-category/
module.exports.index = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false
    });

    res.render("admin/pages/product-category/index", {
        pageTitle: "Trang danh mục sản phẩm",
        records: records
    });
}

// [GET] /admin/product-category/create/
module.exports.create = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false
    });
    const newRecords = createTreeHelper(records);

    res.render("admin/pages/product-category/create", {
        pageTitle: "Thêm mới danh mục sản phẩm",
        records: newRecords
    });
}

// [POST] /admin/product-category/create/
module.exports.createPost = async(req, res) => {
    if(req.body.position){
        req.body.position = parseInt(req.body.position);
    }
    else{
        let count = await ProductCategory.countDocuments();
        req.body.position = count + 1;
    }

    const record = new ProductCategory(req.body);
    await record.save();

    res.redirect(`/${systemConfig.prefixAdmin}/product-category`)
}

// [GET] /admin/product-category/edit/:id/
module.exports.edit = async (req, res) => {
    try {
        const find = ({
            deleted: false,
            _id : req.params.id
        });
        const data = await ProductCategory.findOne(find);
    
        const records = await ProductCategory.find({
            deleted: false
        });
        const newRecords = createTreeHelper(records);
        console.log(data);
        res.render("admin/pages/product-category/edit", {
            pageTitle: "Chỉnh sửa danh mục sản phẩm",
            records: newRecords,
            data: data
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/product-category`);
    }
}

// [PATCH]/admin/product-category/edit/:id/
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position);

    try {
        const record = await ProductCategory.updateOne({_id : id}, req.body);
        req.flash("success", "Cập nhật danh mục thành công!");
    } catch (error) {
        req.flash("error", "Cập nhật dnah mục không thành công!");
    };
    res.redirect("back");
}    