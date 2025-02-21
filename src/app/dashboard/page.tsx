"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getAllOrders, Order } from "@/service/order";
import { MoreVert as MoreVertIcon} from "@mui/icons-material";
import { getAllProducts, Product } from "@/service/product";
import { getAllinventory, Inventory } from "@/service/inventory";
import { PieChart, Pie, Cell, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { calculateProductSalesPercentage, ProductSales } from "@/service/piechart";
import { BarChart,BarChartProps } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { datasets, valueFormatter } from "./orderdata";
import { relative } from "path";
import { LineChart } from '@mui/x-charts/LineChart';
// import { dataset, valueFormatter } from '../dataset/weather';



const DashboardPage: React.FC = () => {
  const [totalOrders, setTotalOrders] = useState<number>(28);
  const [totalRevenue, setTotalRevenue] = useState<number>(8450);
  const [productCount, setProductCount] = useState<number>(0);
  const [InventoryCount, setInventoryCount] = useState<number>(0);
  // const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [product, setProducts] = useState<Product[]>([]);
  const [inventory, setInventories] = useState<Inventory[]>([]);
  const [menuState, setMenuState] = useState<{ anchorEl: HTMLElement | null; cardType: string | null }>({
    anchorEl: null,
    cardType: null,
  });
  ////////////////////////////////////////////// Dummy - Line - Graph /////////////////////////////////////////////////////
  // const [timeFilter, setTimeFilter] = useState<"daily" | "monthly" | "yearly">("daily");
  // const data = [
  //   { date: "2025-02-01", value: 10 },
  //   { date: "2025-02-02", value: 15 },
  //   { date: "2025-02-03", value: 12 },
  //   { date: "2025-02-10", value: 20 },
  //   { date: "2025-03-01", value: 30 },
  // ];

  // const filterData = () => {
  //   if (timeFilter === "daily") {
  //     return data;
  //   } else if (timeFilter === "monthly") {
  //     const groupedByMonth = data.reduce((acc, item) => {
  //       const month = item.date.slice(0, 7); // Extract YYYY-MM
  //       acc[month] = (acc[month] || 0) + item.value;
  //       return acc;
  //     }, {});
  //     return Object.keys(groupedByMonth).map((month) => ({
  //       date: month,
  //       value: groupedByMonth[month],
  //     }));
  //   } else if (timeFilter === "yearly") {
  //     const groupedByYear = data.reduce((acc, item) => {
  //       const year = item.date.slice(0, 4); // Extract YYYY
  //       acc[year] = (acc[year] || 0) + item.value;
  //       return acc;
  //     }, {});
  //     return Object.keys(groupedByYear).map((year) => ({
  //       date: year,
  //       value: groupedByYear[year],
  //     }));
  //   }
  // };

  // const filteredData = filterData();
  const dataset = [
    { name: 'January', code: '19', gdp: 4 },
    { name: 'January', code: '20', gdp: 5 },
    { name: 'January', code: '21', gdp: 9},
    { name: 'January', code: '22', gdp: 7},
    { name: 'January', code: '23', gdp: 2 },
    { name: 'January', code: '24', gdp: 0 },
    { name: 'January', code: '25', gdp: 3 },
    { name: 'January', code: '26', gdp: 2 },
    { name: 'January', code: '27', gdp: 4 },
    { name: 'January', code: '28', gdp: 2 },
    { name: 'January', code: '29', gdp: 7 },
    { name: 'January', code: '30', gdp: 3 },
    { name: 'January', code: '31', gdp: 2 },
    { name: 'February', code: '1', gdp: 9 },
    { name:  'February', code: '2', gdp: 1 },
    { name:  'February', code: '3', gdp: 4 },
    { name:  'February', code: '4', gdp: 2 },
    { name:  'February', code: '5', gdp: 2 },
    { name:  'February', code: '6', gdp: 2 },
    { name:  'February', code: '7', gdp: 1 },
    
  ];
  
  const chartParams: BarChartProps = {
    yAxis: [
      {
        label: 'Orders',
      },
    ],
    series: [
      {
        label: 'Orders',
        dataKey: 'gdp',
        valueFormatter: (v) =>
          new Intl.NumberFormat('en-US', {
            compactDisplay: 'short',
            notation: 'compact',
          }).format((v || 0) * 1),
      },
    ],
    slotProps: { legend: { hidden: true } },
    dataset,
    width: 550,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-10px, 0)',
      },
    },
  };
  
   
  const [isProductListOpen, setIsProductListOpen] = useState(false);
  const [isInventoryListOpen, setIsInventoryListOpen] = useState(false);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
 
  const [productSales, setProductSales] = useState<ProductSales[]>([]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement> , cardType: string) => {
    setMenuState({ anchorEl: event.currentTarget, cardType });
  };

  const handleMenuClose = () => {
    setMenuState({ anchorEl: null, cardType: null });
  };
  const handleRevenue = (timeframe: string) => {
    switch (timeframe) {
      case "Today":
        setTotalRevenue(8450);
        break;
      case "This Week":
        setTotalRevenue(125050);
        break;
      case "This Month":
        setTotalRevenue(850345);
        break;
      default:
        setTotalRevenue(20100);
        break;
    }
    handleMenuClose(); // Close the menu after selection
  };
  const handleOrders = (timeframe: string) => {
    switch (timeframe) {
      case "Today":
        setTotalOrders(28);
        break;
      case "This Week":
        setTotalOrders(172);
        break;
      case "This Month":
        setTotalOrders(201);
        break;
      default:
        setTotalOrders(211);
        break;
    }
    handleMenuClose(); // Close the menu after selection
  };


  const handleOpenProductList = () => {
    setIsProductListOpen(true);
  };
  
  const handleCloseProductList = () => {
    setIsProductListOpen(false);
  };

  const handleOpenInventoryList = () => {
    setIsInventoryListOpen(true);
  };
  
  const handleCloseInventoryList = () => {
    setIsInventoryListOpen(false);
  };
  

  // const handleDateFilter = (filterType: string) => {
  //   const now = new Date();
  //   let date;

  //   switch (filterType) {
  //     case "Today":
  //       date = now;
  //       setTotalOrders(95);
  //       break;
  //     case "This Week":
  //       date = new Date(now.setDate(now.getDate() - now.getDay()));
  //       setTotalOrders(905); 
  //       break;
  //     case "This Month":
  //       date = new Date(now.getFullYear(), now.getMonth(), 1); 
  //       setTotalOrders(2650);
     
  //       break;
  //     default:
  //       return;
  //   }

  //   setSelectedDate(date);
  //   handleMenuClose();
  // };
  
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders: Order[] = await getAllOrders();
        const sales = calculateProductSalesPercentage(orders);
        setProductSales(sales);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders: Order[] = await getAllOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const fetchInventories: Order[] = await getAllOrders();
        setOrders(fetchInventories);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchInventories();
  }, []);

  // useEffect(() => {
  //   if (selectedDate) {
  //     const filteredOrders = orders.filter((order) => {
  //       const orderDate = new Date(order.date);  
  //       return (
  //         orderDate.getFullYear() === selectedDate.getFullYear() &&
  //         orderDate.getMonth() === selectedDate.getMonth() &&
  //         orderDate.getDate() === selectedDate.getDate()
  //       );
  //     });

  //     setTotalOrders(filteredOrders.length);
  //     const revenue = filteredOrders.reduce((acc, order) => acc + order.totalPrice, 0);
  //     setTotalRevenue(revenue);
  //   }
  // }, [selectedDate, orders]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts: Product[] = await getAllProducts();  
        setProducts(fetchedProducts);
        setProductCount(fetchedProducts.length);  
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const fetchedInventory: Inventory[] = await getAllinventory();  
        setInventories(fetchedInventory);
        setInventoryCount(fetchedInventory.length);  
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchInventory();
  }, []);
  const chartSetting = {
    yAxis: [
      {
        label: 'Total Orders',
      },
    ],
    width: 550,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-10px, 0)',
      },
    },
  };
  

  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box p={4}>
        <Grid container spacing={5} direction={{ xs: "column", sm: "row"  }} wrap="nowrap" justifyContent="space-between" alignItems="stretch">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "88%", minWidth: "280px" }} style={{ background: '#e5e9f0' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                <img 
                  src="/icons/order.png" 
                  alt="Total Orders" 
                  style={{ width: '40px', height: '40px' }} 
                />
                  <IconButton onClick={(event) => handleMenuOpen(event, "TotalOrders")}>
                      <MoreVertIcon />
                 </IconButton>
                </Box>
                <Typography variant="h6" mt={2} sx={{ color: '#1392D3', margin: '5px 0', fontWeight: 'bold' ,fontSize:'1.3rem'}}>
                  Total Orders
                </Typography>
                <Typography variant="h4" mt={1} sx={{ fontSize: '1.2rem', fontWeight:'bold' }}>
                  {totalOrders}
                </Typography>
                <Menu
                  anchorEl={menuState.anchorEl}
                  open={Boolean(menuState.anchorEl) && menuState.cardType === "TotalOrders"}
                  onClose={handleMenuClose}
                >
                  {/* <MenuItem onClick={() => handleDateFilter("Today")}>Today</MenuItem>
                  <MenuItem onClick={() => handleDateFilter("This Week")}>
                    This Week
                  </MenuItem>
                  <MenuItem onClick={() => handleDateFilter("This Month")}>
                    This Month
                  </MenuItem> */}
                  <MenuItem onClick={() => handleOrders("Today")}>Today</MenuItem>
                  <MenuItem onClick={() => handleOrders("This Week")}>
                    This Week
                  </MenuItem>
                  <MenuItem onClick={() => handleOrders("This Month")}>
                    This Month
                  </MenuItem>
                </Menu>
              </CardContent>
            </Card>
          </Grid>

          {/* Total Revenue Card */}
          <Grid item xs={12} sm={6} md={4} sx={{
    '&:hover .hover-card': {
      transform: 'scale(1.03)', // Slightly enlarge the card
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Add a shadow effect
    },
  }}
>
            <Card sx={{ height: "88%", minWidth: "270px" }} style={{ background: '#e5e9f0' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                <img 
                  src="/icons/doller.png" 
                  alt="Total Orders" 
                  style={{ width: '40px', height: '40px' }} 
                />
                  <IconButton onClick={(event) => handleMenuOpen(event, "TotalRevenue")}>
                      <MoreVertIcon />
                 </IconButton>
                </Box>
                <Typography variant="h6" mt={2} sx={{ color: '#1392D3', margin: '5px 0', fontWeight: 'bold', fontSize:'1.3rem'}}>
                  Total Revenue
                </Typography>
                <Typography variant="h4" mt={1} sx={{ fontSize: '1.2rem', fontWeight:'bold' }}>
                 Rs : {totalRevenue.toFixed(2)}
                </Typography>
                <Menu
                  anchorEl={menuState.anchorEl}
                  open={Boolean(menuState.anchorEl) && menuState.cardType === "TotalRevenue"}
                  onClose={handleMenuClose}
                >
                  {/* <MenuItem onClick={() => handleDateFilter("Today")}>Today</MenuItem>
                  <MenuItem onClick={() => handleDateFilter("This Week")}>
                    This Week
                  </MenuItem>
                  <MenuItem onClick={() => handleDateFilter("This Month")}>
                    This Month
                  </MenuItem> */}
                   <MenuItem onClick={() => handleRevenue("Today")}>Today</MenuItem>
                  <MenuItem onClick={() => handleRevenue("This Week")}>
                    This Week
                  </MenuItem>
                  <MenuItem onClick={() => handleRevenue("This Month")}>
                    This Month
                  </MenuItem>
                </Menu>
              </CardContent>
            </Card>
          </Grid>

         {/* Total Product Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "88%",minWidth: "270px" }} style={{ background: '#e5e9f0' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                <img 
                  src="/icons/product.png" 
                  alt="Total Orders" 
                  style={{ width: '43px', height: '43px' }} 
                />
                  <IconButton onClick={(event) => handleMenuOpen(event, "TotalProducts")}>
                      <MoreVertIcon />
                 </IconButton>
                </Box>
                <Typography variant="h6" mt={2} sx={{color: '#1392D3', margin: '5px 0', fontWeight: 'bold',fontSize:'1.3rem' }}>
                  Total Products
                </Typography>
                <Typography variant="h4" mt={1} sx={{ fontSize: '1.2rem', fontWeight:'bold' }}>
                  {productCount}
                </Typography>
                <Menu
                  anchorEl={menuState.anchorEl}
                  open={Boolean(menuState.anchorEl) && menuState.cardType === "TotalProducts"}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => {handleMenuClose(); handleOpenProductList();}}>Product List</MenuItem>
                </Menu>
              </CardContent>
            </Card>
            <Dialog open={isProductListOpen} onClose={handleCloseProductList} fullWidth>
               <DialogTitle>Product List</DialogTitle>
               <DialogContent>
                   {inventory.length > 0 ? (
                 <Table>
                     <TableHead>
                       <TableRow>
                          <TableCell><strong>Product</strong></TableCell>
                          <TableCell><strong>Price</strong></TableCell>
                      </TableRow>
                     </TableHead>
              <TableBody>
                  {product.map((item) => (
                   <TableRow key={item.id}>
                   <TableCell>{item.name}</TableCell>
                   <TableCell>{item.price}</TableCell>
                   </TableRow>
                  ))}
              </TableBody>
          </Table>
               ) : (
               <Typography>No products available.</Typography>
              )}
                </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseProductList} color="primary">
                  Close
                    </Button>
               </DialogActions>
               </Dialog>
          </Grid>

          {/* Total Inventory Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "88%" ,minWidth: "270px"}} style={{ background: '#e5e9f0' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                <img 
                  src="/icons/box.png" 
                  alt="Total Orders" 
                  style={{ width: '40px', height: '40px' }} 
                />
                  <IconButton onClick={(event) => handleMenuOpen(event, "TotalInventory")}>
                      <MoreVertIcon />
                 </IconButton>
                </Box>
                <Typography variant="h6" mt={2} sx={{color: '#1392D3', margin: '5px 0', fontWeight: 'bold',fontSize:'1.3rem' }}>
                   Inventory Items
                </Typography>
                <Typography variant="h4" mt={1} sx={{ fontSize: '1.2rem', fontWeight:'bold' }}>
                  {InventoryCount}
                </Typography>
                <Menu
                  anchorEl={menuState.anchorEl}
                  open={Boolean(menuState.anchorEl) && menuState.cardType === "TotalInventory"}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => {handleMenuClose(); handleOpenInventoryList();}}>Inventory List</MenuItem>
                </Menu>
              </CardContent>
            </Card>
            <Dialog open={isInventoryListOpen} onClose={handleCloseInventoryList} fullWidth>
               <DialogTitle>Inventory List</DialogTitle>
               <DialogContent>
                   {inventory.length > 0 ? (
                 <Table>
                     <TableHead>
                       <TableRow>
                          <TableCell><strong>Item</strong></TableCell>
                          <TableCell><strong>Quantity</strong></TableCell>
                      </TableRow>
                     </TableHead>
              <TableBody>
                  {inventory.map((item) => (
                   <TableRow key={item.id}>
                   <TableCell>{item.item}</TableCell>
                   <TableCell>{item.quantity}</TableCell>
                   </TableRow>
                  ))}
              </TableBody>
          </Table>
              ) : (
             <Typography>No products available.</Typography>
              )}
           </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseInventoryList} color="primary">
                  Close
                    </Button>
               </DialogActions>
               </Dialog>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid>
        <Grid  sx={{ backgroundColor: '#f0f0f0' ,borderRadius:10, padding:1 ,left:-300,position:'relative',top:-25 }}>
           
          <Typography sx={{color: '#00072D', margin: '40px 0', fontWeight: 'bold',fontSize:'1.3rem' }}>
            Total Orders Per week
          </Typography>
        <BarChart 
          dataset={datasets}
          xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
         series={[
        { dataKey: 'week1', label: 'Week1', valueFormatter },
        { dataKey: 'week2', label: 'Week2', valueFormatter },
        { dataKey: 'week3', label: 'Week3', valueFormatter },
        { dataKey: 'week4', label: 'Week4', valueFormatter },
        ]}
         {...chartSetting}
        />
        </Grid>
        
          
          <Grid sx={{ backgroundColor: '#f0f0f0' ,borderRadius:10, padding:1 ,left:300,position:'relative', top:-450}}>
          <Typography sx={{color: '#00072D', margin: '40px 0', fontWeight: 'bold',fontSize:'1.3rem' }}>
            Total Orders Per Day
          </Typography>
          <BarChart
              xAxis={[
            {
             scaleType: 'band',
             dataKey: 'code',
             valueFormatter: (code, context) =>
             context.location === 'tick'
              ? code
              : `Date: ${dataset.find((d) => d.code === code)?.name} (${code})`,
        },
      ]}
      {...chartParams}
    />
          </Grid>
        </Grid>
        
      </Box>
     
    </LocalizationProvider>
    
  );
};

export default DashboardPage;
