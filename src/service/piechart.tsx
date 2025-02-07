import { Order } from "@/service/order";

export interface ProductSales {
  productName: string;
  percentage: number;
}

export function calculateProductSalesPercentage(orders: Order[]): ProductSales[] {
  const today = new Date().toISOString().split("T")[0];

  const productCounts: { [key: string]: number } = {};
  let totalProductsSold = 0;

  // Filter today's orders and aggregate product counts
  orders
  .filter(order => {
    const orderDate = new Date(order.date); // Ensure it's a Date object
    return orderDate.toISOString().split("T")[0] === today;
  })
    .forEach(order => {
      order.products.forEach((product, index) => {
        const productName = product.name; // Assuming `Product` has a `name` field
        const count = order.productCounts[index] || 0;

        productCounts[productName] = (productCounts[productName] || 0) + count;
        totalProductsSold += count;
      }); 
    });
    

  // Calculate percentages
  return Object.entries(productCounts).map(([productName, count]) => ({
    productName,
    percentage: (count / totalProductsSold) * 100,
    
  }));
  console.log(productCounts);
}
