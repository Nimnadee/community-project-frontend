"use client";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import PopUp from "./components/PopUp";
import { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useFormik } from "formik";
import { validationSchema } from "./validationSchema";
import axios from "axios";
import SuccessAlert from "./components/Success";
import DataTable from "./components/DataTable";
import { Products } from "./type";
import { productCategories, productNames } from "./components/productOptions";

const baseUrl = "http://localhost:8000";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const initialValuesBefore = {
  name: "",
  image: "",
  imageName: "",
  category: "",
  description: "",
  price: "",
  discount: "",
  stock: "",
};

export default function Product() {
  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useState([]);

  const [initialValues, setInitialValues] = useState(initialValuesBefore);

  const [selectedProductId, setSelectedProductId] = useState<string>();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openSuccessAlert, setOpenSuccessAlert] = useState({ status: false, variant: "success", msg: "" });

  const handleOpenPopup = () => setOpen(true);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("image", reader.result);
        formik.setFieldValue("imageName", file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/products`);
      setProductList(response.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (values: typeof initialValues) => {
    try {
      let response;
      if (selectedProductId) {
        response = await axios.put(`${baseUrl}/products/${selectedProductId}`, values);
      } else {
        response = await axios.post(`${baseUrl}/products`, values);
      }

      setOpenSuccessAlert({
        variant: "success",
        status: true,
        msg: `Product ${selectedProductId ? "updated" : "added"} successfully`,
      });
      setOpen(false);
      formik.resetForm();
      setInitialValues(initialValuesBefore);

      getAllProducts();
    } catch (error) {
      setOpenSuccessAlert({
        status: true,
        msg: "Failed to add product",
        variant: "error",
      });
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: handleFormSubmit,
    enableReinitialize: true,
  });

  const handleClosePopUp = () => {
    setOpen(false);
    formik.resetForm();
    setInitialValues(initialValuesBefore);
    setSelectedProductId("");
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleEdit = (product: Products) => {
    setAnchorEl(null);
    setInitialValues(product as any);
    setOpen(true);
    setSelectedProductId(product._id);
  };

  const handleDelete = async (id: string) => {
    setAnchorEl(null);
    try {
      await axios.delete(`${baseUrl}/products/${id}`);
      setOpenSuccessAlert({
        variant: "success",
        status: true,
        msg: "Product deleted successfully",
      });
      getAllProducts();
    } catch (error) {
      setOpenSuccessAlert({
        status: true,
        msg: "Failed to delete product",
        variant: "error",
      });
      console.error(error);
    }
  };

  return (
    <Box sx={{ width: "100%", px: 3 }}>
      <Stack sx={{ width: "100%" }}>
        <Button variant="contained" sx={{ width: 150, ml: "auto", fontWeight: 700 }} onClick={handleOpenPopup}>
          Add product
        </Button>
      </Stack>

      <Box sx={{ width: "100%", mt: 3 }}>
        <DataTable
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          products={productList}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </Box>
      <PopUp heading="Add product" open={open} onClose={handleClosePopUp} handleClose={handleClosePopUp}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="select-label1">Product</InputLabel>

                <Select
                  name="name"
                  labelId="select-label1"
                  value={formik.values.name}
                  label="Product"
                  onChange={formik.handleChange}
                >
                  {productNames.map((productName, index) => (
                    <MenuItem key={index} value={productName}>
                      {productName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Category</InputLabel>

                <Select
                  name="category"
                  labelId="select-label"
                  value={formik.values.category}
                  label="Category"
                  onChange={formik.handleChange}
                >
                  {formik.values.name ? (
                    productCategories[formik.values.name as keyof typeof productCategories].map((category, index) => (
                      <MenuItem key={index} value={category}>
                        {category}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value=""></MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                rows={2}
                multiline
                fullWidth
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Price"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Discount"
                name="discount"
                value={formik.values.discount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.discount && Boolean(formik.errors.discount)}
                helperText={formik.touched.discount && formik.errors.discount}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Stock"
                name="stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                helperText={formik.touched.stock && formik.errors.stock}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={3}>
            <Box display="flex" alignItems="center" width="100%" gap={2}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload Image
                <VisuallyHiddenInput type="file" onChange={handleImageUpload} accept="image/*" />
              </Button>
              <Typography fontSize="14px" fontWeight={500} fontStyle="italic">
                {formik.values.imageName}
              </Typography>
              <Button
                variant="contained"
                type="submit"
                sx={{ bgcolor: (theme) => theme.palette.success.main, ml: "auto" }}
              >
                {selectedProductId ? "Update" : "Create"}
              </Button>
            </Box>
          </Grid>
        </form>
      </PopUp>

      <SuccessAlert
        open={openSuccessAlert.status}
        severity={openSuccessAlert.variant}
        msg={openSuccessAlert.msg}
        handleClose={() => {
          setOpenSuccessAlert({ status: false, msg: "", variant: "" });
        }}
      />
    </Box>
  );
}
