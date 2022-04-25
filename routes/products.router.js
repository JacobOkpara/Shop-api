const { Router } = require("express");
const {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  getSingleProduct,
} = require("../controllers/products.controller");
const { verifyToken } = require("../middlewares/verifyToken");

const productRouter = Router();

productRouter.route("/").get(verifyToken, getAllProducts).post(createProduct);
productRouter
  .route("/:productId")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = productRouter;
