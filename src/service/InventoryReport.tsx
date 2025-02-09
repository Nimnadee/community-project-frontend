 

export interface InventoryReport {
  _id: string;
  totalItems: number;
  totalCost: number;
  items: {
    id: string;
    item: String;
    quantity: number;
    cost:number;
  }[];
  generatedAt: Date;
}

// Fetch all inventory reports
export async function getAllInventoryReports(): Promise<InventoryReport[]> {
  const url = "http://localhost:5000/reports/inventory";
  const response: Response = await fetch(url, { cache: "no-store" });
  const reports: InventoryReport[] = await response.json();
  return reports;
}

// Fetch an inventory report by ID
export async function getInventoryReportById(id: string): Promise<InventoryReport> {
  const url = `http://localhost:5000/reports/inventory/${id}`;
  const response: Response = await fetch(url, { cache: "no-store" });
  const report: InventoryReport = await response.json();
  return report;
}

// Generate a new inventory report
export async function generateInventoryReport(): Promise<InventoryReport> {
  const url = "http://localhost:5000/reports/inventory/generate";
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
  const report: InventoryReport = await response.json();
  return report;
}

// Delete an inventory report by ID
export async function deleteInventoryReport(id: string): Promise<{ message: string }> {
  const url = `http://localhost:5000/reports/inventory/${id}`;
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
