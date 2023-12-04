import slugify from "slugify";
import { asyncHandler } from "../../../service/asyncHandler.js";
import categoryModel from "../../../../DB/model/Category.model.js";
import CloudinaryMulter from "../../../service/CloudinaryMulter.js";
import productModel from "../../../../DB/model/Product.model.js";

const populate = [
  {
    path: "createdBy",
    select: "userName email phone Role",
  },
  {
    path: "updatedBy",
    select: "userName email phone Role",
  },
  {
    path: "categoryId",
  },
  {
    path: "brandId",
  },
  {
    path: "review",
  },
];

export const addprodcut = asyncHandler(async (req, res, next) => {
  if (!req.files?.length) {
    next(new Error("images is required"));
  } else {
    const { name, price, discount, amount, brandId, categoryId, description } =
      req.body;
    const findCategory = await categoryModel.findOne({ _id: categoryId });
    if (!findCategory) {
      return next(new Error("Category is not found", { cause: 400 }));
    } else {
      if (name) {
        req.body.slug = slugify(name);
      }
      req.body.stock = amount;
      if (req.body.discount) {
        req.body.finalPrice = price - price * ((discount || 0) / 100);
      }
      const images = [];
      const imagePublicId = [];
      for (const file of req.files) {
        const { secure_url, public_id } =
          await CloudinaryMulter.uploader.upload(file.path, {
            folder: `E-commerce/prodcut/${name}`,
          });
        images.push(secure_url);
        imagePublicId.push(public_id);
      }
      req.body.images = images;
      req.body.imagePublicIds = imagePublicId;
      req.body.createdBy = req.user._id;
      const product = await productModel.create(req.body);
      res.status(200).json({ message: "done", product });
    }
  }
});

export const getproductByname = asyncHandler(async (req, res, next) => {
  const { key } = req.query;
  const product = await productModel
    .find({ name: key })
    .populate([{ path: "categoryId" }]);
  res.status(200).json({ message: "done", product });
});

export const getproductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const product = await productModel
    .findById({ _id: id })
    .populate([{ path: "categoryId" }]);
  res.status(200).json({ message: "done", product });
});

export const updateproduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findById({ _id: id });
  if (!product) {
    next(new Error("In-valid product Id"));
  } else {
    const { name, price, amount, description, discount } = req.body;
    const { categoryname } = req.query;
    if (name) {
      req.body.slug = slugify(name);
    }
    if (amount) {
      const checkStock = amount - product.soldItem;
      checkStock > 0 ? (req.body.stock = checkStock) : (req.body.stock = 0);
    }
    if (price && discount) {
      req.body.finalPrice = price - price * (discount / 100);
    } else if (price) {
      req.body.finalPrice = price - price * (product.discount / 100);
    } else if (discount) {
      req.body.finalPrice = product.price - product.price * (discount / 100);
    }
    req.body.updatedBy = req.user._id;
    if (categoryname) {
      const category = await categoryModel.findOne({ name: categoryname });
      if (!category) {
        next(new Error("in-valid name or not exist"));
      } else {
        req.body.categoryId = category._id;
      }
    }
    if (req.files.length) {
      const images = [];
      const imagePublicIds = [];
      for (const file of req.files) {
        const { secure_url, public_id } =
          await CloudinaryMulter.uploader.upload(file.path, {
            folder: `OnlineCommerce/products/${name}`,
          });
        images.push(secure_url);
        imagePublicIds.push(public_id);
      }
      req.body.imagePublicIds = imagePublicIds;
      req.body.images = images;
    }
    const updateProduct = await productModel.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    if (updateProduct) {
      for (const imageID of product.imagePublicIds) {
        await CloudinaryMulter.uploader.destroy(imageID);
      }
      return res.status(200).json({ message: "Done", updateProduct });
    } else {
      return next(
        new Error(`fail to update  product with  ID : ${product._id}`, {
          cause: 400,
        })
      );
    }
  }
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete({ _id: id });
  product
    ? res.status(200).json({ message: "done" })
    : next(Error("in-valid id or product not deleted"));
});

export const productList = asyncHandler(async (req, res, next) => {
  const List = await productModel
    .find({ stock: { $gt: 0 } })
    .populate(populate);
  return res.status(200).json({ message: "done", List });
});

export const getBestSellingProducts = asyncHandler(async (req, res, next) => {
  const result = await productModel.aggregate([
    {
      $group: {
        _id: "$_id",
        totalQuantitySold: { $sum: "$soldItem" },
      },
    },
    {
      $sort: { totalQuantitySold: -1 },
    },
    {
      $limit: 15,
    },
  ]);
  const bestSellingProductIds = result.map((item) => item._id);

  const bestSellingProducts = await productModel.find({
    _id: { $in: bestSellingProductIds },
    soldItem: { $ne: 0 },
  });
  res.status(200).json({ message: "done", bestSellingProducts });
});

export const getProductsByHighestDiscount = asyncHandler(
  async (req, res, next) => {
    const result = await productModel
      .find({ discount: { $ne: 0 } })
      .sort({ discount: -1 })
      .limit(15);
    if (!result) {
      return next(new Error("there is no Discounted products", { cause: 404 }));
    } else {
      res.status(200).json({ message: "done", result });
    }
  }
);
