const Product = require("../../models/product.model")

// [GET] /products/
module.exports.index = async (req, res) => {
    const products = await Product
        .find({
            status: "active",
            deleted: false
        })
        .sort({ position: "desc" });

    for(const item of products){
        item.newPrice = (item.price * (100 - item.discountPercentage)/100).toFixed(0);
    }
    res.render("client/pages/products/index", {
        pageTitle: "Trang danh sách sản phẩm",
        products: products
    });
}

// [GET] /products/detail/:slug
module.exports.detail = async (req, res) => {
    const slug = req.params.slug;

    const product = await Product.findOne({
        slug: slug,
        deleted: false,
        status: "active"
    });
    if(product){
        res.render("client/pages/products/detail", {
            pageTitle: `Chi tiết sản phẩm ${product.title}`,
            product: product
        });
    }
    else{
        res.redirect("/");
    }
}