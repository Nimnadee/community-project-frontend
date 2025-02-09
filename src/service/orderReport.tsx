import { Product } from "@/service/product";

export interface OrderReport {
  _id: string;
  totalOrder: number;
  totalRevenue: number;
  items: {
    id: string;
    totalPrice: number;
    productCounts: number[];
    products: Product[];
    date: Date;
  }[];
  generatedAt: Date;
}

// Fetch all order reports
export async function getAllOrderReports(): Promise<OrderReport[]> {
  const url = "http://localhost:5000/reports/order";
  const response: Response = await fetch(url, { cache: "no-store" });
  const reports: OrderReport[] = await response.json();
  return reports;
}

// Fetch an order report by ID
export async function getOrderReportById(id: string): Promise<OrderReport> {
  const url = `http://localhost:5000/reports/order/${id}`;
  const response: Response = await fetch(url, { cache: "no-store" });
  const report: OrderReport = await response.json();
  return report;
}

// Generate a new order report
export async function generateOrderReport(): Promise<OrderReport> {
  const url = "http://localhost:5000/reports/order/generate";
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  });
  const response: Response = await fetch(request);
  console.log(response)
  const report: OrderReport = await response.json();
  return report;
}

// Delete an order report by ID
export async function deleteOrderReport(id: string): Promise<{ message: string }> {
  const url = `http://localhost:5000/reports/order/${id}`;
  const request = new Request(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  });
  const response: Response = await fetch(request);
  const result: { message: string } = await response.json();
  return result;
}
