import slugify from "slugify";
import CloudinaryMulter from "../../../service/CloudinaryMulter.js";
import { asyncHandler } from "../../../service/asyncHandler.js";
import brandModel from "../../../../DB/model/Brand.model.js";

export const addBrand = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new Error("Image is required", { cause: 400 }));
  } else {
    const { name } = req.body;
    const { secure_url, public_id } = await CloudinaryMulter.uploader.upload(
      req.file.path,
      { folder: `E-commerce/Brand/${name}` }
    );
    const brand = await brandModel.create({
      name,
      slug: slugify(name),
      image: secure_url,
      imagePublicId: public_id,
      createdBy: req.user._id,
    });
    return brand
      ? res.status(200).json({ message: "done", brand })
      : next(new Error("Fail to add new brand", { cause: 400 }));
  }
});

export const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.file) {
    const { secure_url, public_id } = await CloudinaryMulter.uploader.upload(
      req.file.path,
      { folder: `E-commerce/Brand` }
    );
    req.body.image = secure_url;
    req.body.imagePublicId = public_id;
  }
  req.body.updatedBy = req.user._id;
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  const brand = await brandModel.findByIdAndUpdate({ _id: id }, req.body,{new:true});
  if (brand) {
    if (req.file) {
      await CloudinaryMulter.uploader.destroy(brand.imagePublicId);
    }
    return res.status(200).json({ message: "done", brand });
  } else {
    await CloudinaryMulter.uploader.destroy(req.body.imagePublicId);
    return next(new Error("Fail to update this brand", { cause: 400 }));
  }
});

export const deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findByIdAndDelete({ _id: id });
  return brand
    ? res.status(200).json({ message: "done" })
    : next(new Error("in-valid id", { cause: 400 }));
});



export const brandProduct = asyncHandler(async (req, res, next) => {
  const brandList = await brandModel.find({}).populate([
    {
      path: "Brandproduct",
    },
  ]);
  return brandList
    ? res.status(201).json({ message: "done", brandList })
    : res.status(201).json({ message: "NO Brand To Show" });
});



export const brandProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brandList = await brandModel.findById({ _id: id }).populate([
    {
      path: "Brandproduct",
    },
  ]);
  return brandList
    ? res.status(201).json({ message: "done", brandList })
    : res.status(201).json({ message: "NO Brand To Show" });
});
