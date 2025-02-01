"use client";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Products } from "../type";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, IconButton, ListItemIcon, ListItemText, MenuItem, Popover } from "@mui/material";
import { useState, MouseEvent } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DataTable({
  products,
  onEdit,
  onDelete,
  setAnchorEl,
  anchorEl,
}: {
  products: Products[];
  onEdit: (product: Products) => void;
  onDelete: (id: string) => void;
  setAnchorEl: (value: HTMLButtonElement | null) => void;
  anchorEl: HTMLButtonElement | null;
}) {
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>, product: Products) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width="12%">Product Name</StyledTableCell>
            <StyledTableCell width="12%">Category</StyledTableCell>
            <StyledTableCell width="10%">Image</StyledTableCell>
            <StyledTableCell width="10%">Price</StyledTableCell>
            <StyledTableCell width="10%">Stock</StyledTableCell>
            <StyledTableCell width="10%">Discount</StyledTableCell>
            <StyledTableCell width="30%">Description</StyledTableCell>
            <StyledTableCell width="6%">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell width="12%" component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell width="12%">{row.category}</StyledTableCell>
              <StyledTableCell width="10%">
                <Avatar alt={row.name} src={row.image} variant="square">
                  <img src="/no-image.jpg" alt="no image" />
                </Avatar>
              </StyledTableCell>
              <StyledTableCell width="10%">{row.price}</StyledTableCell>
              <StyledTableCell width="10%">{row.stock}</StyledTableCell>
              <StyledTableCell width="10%">{row.discount}</StyledTableCell>
              <StyledTableCell width="30%">{row.description}</StyledTableCell>
              <StyledTableCell width="6%">
                <IconButton onClick={(e) => handleClick(e, row)}>
                  <MoreVertIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => selectedProduct && onEdit(selectedProduct)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedProduct) {
              onDelete(selectedProduct._id);
              handleClose();
            }
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Popover>
    </TableContainer>
  );
}
