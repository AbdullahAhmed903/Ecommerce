export const findone = async ({
  model,
  filter = {},
  select = "",
  populate = []
}={}) => {
  const result = await model.findOne(filter).select(select).populate(populate);
  return result;
};
