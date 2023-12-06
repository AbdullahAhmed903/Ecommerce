import multer from "multer";

export const fileValidation = {
  image: ["image/png", "image/jpeg", "image/gif", "image/avif"],
  pdf: ["application/pdf"],
};

export const Mymulter = (customValidation = fileValidation.image) => {
  const storage = multer.diskStorage({});
  function fileFilter(req, file, cb) {
    if (customValidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb("in-valid format", false);
      throw new Error("in-valid format");
    }
  }
  const upload = multer({ fileFilter, storage });
  return upload;
};
