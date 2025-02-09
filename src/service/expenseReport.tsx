 

export interface ExpensesReport {
    _id: string;
    totalItems: number;
    totalCost: number;
    items: {
      id: string;
      type: String;
      cost:number;
    }[];
    generatedAt: Date;
  }
  
  // Fetch all expenses reports
  export async function getAllExpensesReports(): Promise<ExpensesReport[]> {
    const url = "http://localhost:5000/reports/expenses";
    const response: Response = await fetch(url, { cache: "no-store" });
    const reports: ExpensesReport[] = await response.json();
    return reports;
  }
  
  // Fetch an expenses report by ID
  export async function getExpensesReportById(id: string): Promise<ExpensesReport> {
    const url = `http://localhost:5000/reports/expenses/${id}`;
    const response: Response = await fetch(url, { cache: "no-store" });
    const report: ExpensesReport = await response.json();
    return report;
  }
  
  // Generate a new expenses report
  export async function generateExpensesReport(): Promise<ExpensesReport> {
    const url = "http://localhost:5000/reports/expenses/generate";
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
    const report: ExpensesReport = await response.json();
    return report;
  }
  
  // Delete an expenses report by ID
  export async function deleteExpensesReport(id: string): Promise<{ message: string }> {
    const url = `http://localhost:5000/reports/expenses/${id}`;
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
  