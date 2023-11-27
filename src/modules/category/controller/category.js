import CloudinaryMulter from "../../../service/CloudinaryMulter.js";
import { asyncHandler } from "../../../service/asyncHandler.js";
import categoryModel from "../../../../DB/model/Category.model.js";
import slugify from "slugify";
import productModel from "../../../../DB/model/Product.model.js";

export const createCategory = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    next(new Error("please upload image", { cause: 400 }));
  } else {
    const { name } = req.body;
    const { secure_url, public_id } = await CloudinaryMulter.uploader.upload(
      req.file.path,
      {
        folder: `E-commerce/Category/${name}`,
      }
    );
    const category = await categoryModel.create({
      name,
      createdBy: req.user,
      slug: slugify(name),
      imagePublicId: public_id,
      image: secure_url,
    });
    category
      ? res.status(200).json({ message: "done", category })
      : next(Error("fail to add newCategory", { cause: 500 }));
  }
});

export const categoryProduct = asyncHandler(async (req, res, next) => {
  const category = await categoryModel.find({}).populate([
    {
      path: "product",
    },
  ]);
  category
    ? res.json({ message: "done", category })
    : next(Error("there is no Category And Products"));
});

export const categoryProductbyid = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.find({ _id: id }).populate([
    {
      path: "product",
    },
  ]);
  category
    ? res.json({ message: "done", category })
    : next(Error("there is no Category And Products"));
});
