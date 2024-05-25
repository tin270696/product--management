// [GET] /admin/trash-can/
module.exports.trashCan = async (req, res) => {
    res.render("admin/pages/trash-can", {
        pageTitle: "Thùng rác"
    })
}