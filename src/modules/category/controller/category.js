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

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const searchCategory = await categoryModel.findById({ _id: id });
  if (!searchCategory) {
    return next(new Error("Category not found", { cause: 404 }));
  } else {
    const _id = req.user;
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    if (req.file) {
      const { secure_url, public_id } = await CloudinaryMulter.uploader.upload(
        req.file.path,
        { folder: `E-commerce/Category/${searchCategory.name}` }
      );
      (req.body.image = secure_url), (req.body.imagePublicId = public_id);
    }
    req.body.updatedBy = _id;
    const category = await categoryModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    if (category) {
      await CloudinaryMulter.uploader.destroy(searchCategory.imagePublicId);
      res.status(200).json({ message: "done", category });
    } else {
      return next(
        new Error(`fail to update  Category with  ID ${searchCategory._id}`, {
          cause: 400,
        })
      );
    }
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

export const categoryProductName = asyncHandler(async (req, res, next) => {
  const { categoryName } = req.query;
  console.log(categoryName);
  const category = await categoryModel
    .findOne({ name: categoryName })
    .populate([
      {
        path: "product",
      },
    ]);
  category
    ? res.json({ message: "done", category })
    : next(Error("there is no Category "));
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
