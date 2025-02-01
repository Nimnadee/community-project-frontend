import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string(),
  price: Yup.string().required("Price is required"),
  discount: Yup.string(),
  stock: Yup.string().required("Stock is required"),
});
