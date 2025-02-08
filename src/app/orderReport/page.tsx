// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   getAllOrderReports,
//   getOrderReportById,
//   generateOrderReport,
//   deleteOrderReport,
//   OrderReport,
// } from "@/service/orderReport";

// export default function OrderReportManager() {
//   const [reports, setReports] = useState<OrderReport[]>([]);
//   const [selectedReport, setSelectedReport] = useState<OrderReport | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch all reports on component load
//   useEffect(() => {
//     async function fetchReports() {
//       setLoading(true);
//       try {
//         const allReports = await getAllOrderReports();
//         setReports(allReports);
//         setError(null);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch order reports.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchReports();
//   }, []);

//   // Generate a new order report
//   const handleGenerateReport = async () => {
//     setLoading(true);
//     try {
//       const newReport = await generateOrderReport();
//       setReports((prevReports) => [...prevReports, newReport]);
//       setSelectedReport(newReport); // Display the newly generated report
//       setError(null);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to generate the order report.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // View a specific report by ID
//   const handleViewReport = async (id: string) => {
//     console.log("Selected report ID:", id); // Debugging: check if the ID is being passed correctly
//   if (!id) {
//     setError("Invalid report ID.");
//     return;
//   }
//     setLoading(true);
//     try {
//       const report = await getOrderReportById(id);
       
//       setSelectedReport(report);
//       setError(null);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch the selected order report.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete a specific report by ID
//   const handleDeleteReport = async (id: string) => {
//     setLoading(true);
//     try {
//       await deleteOrderReport(id);
//       setReports((prevReports) => prevReports.filter((report) => report.id !== id));
//       setSelectedReport(null);
//       setError(null);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to delete the order report.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
// //     <div className="p-6 bg-gray-100 min-h-screen">
// //       <div className="max-w-8xl mx-auto">
// //         {/* Card for Generating and Viewing Reports */}
// //         <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
// //           <h2 className="text-xl font-semibold mb-4">Order Report Manager</h2>
// //           <div className="flex justify-between">
// //             {/* Generate New Report Button */}
// //             <button
// //               // onClick={handleGenerateReport}
// //               disabled={loading}
// //               className={`px-4 py-2 bg-blue-500 text-white rounded ${
// //                 loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
// //               }`}
// //             >
// //               {loading ? "Generating..." : "Generate New Report"}
// //             </button>

// //             {/* View All Reports Button */}
// //             <button
// //               // onClick={() => setSelectedReport(null)} // Clear selected report to view all
// //               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
// //             >
// //               View All Reports
// //             </button>
// //           </div>

// //           {error && <p className="mt-4 text-red-500">{error}</p>}
// //         </div>

// //         {/* Display the Generated Report */}
// //         {selectedReport && (
// //           <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
// //             <h3 className="text-lg font-semibold mb-4">Generated Report</h3>
// //             <div>
// //               <p><strong>ID:</strong> {selectedReport.id}</p>
// //               <p><strong>Details:</strong> {selectedReport.totalOrder}</p>
// //             </div>
// //             <button
// //               // onClick={() => handleDeleteReport(selectedReport.id)}
// //               className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
// //             >
// //               Delete Report
// //             </button>
// //           </div>
// //         )}

// //         {/* Display All Reports */}
// //         {!selectedReport && reports.length > 0 && (
// //           <div className="bg-white shadow-lg rounded-lg p-6">
// //             <h3 className="text-lg font-semibold mb-4">Past Generated Reports</h3>
// //             <ul>
// //               {reports.map((report, index) => (
// //                     <li
// //                         key={report.id || index} // Fallback to index if report.id is undefined
// //                         className="flex justify-between items-center border-b border-gray-200 py-2"
// //                       >
// //                   <div>
// //                            <p className="text-sm font-medium">{report.totalRevenue || `Report ${index + 1}`}</p>
// //                            <p className="text-xs text-gray-500">Created: {report.totalOrder || "N/A"}</p>
// //                   </div>
// //                   {/* View Report Button */}
// //         <button
// //           // onClick={() => handleViewReport(report.id)} // Call the function with the report ID
// //           className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
// //         >
// //           View
// //         </button>
// //             <button
// //         // onClick={() => handleDeleteReport(report.id)}
// //         className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
// //       >
// //         Delete
// //       </button>
// //     </li>
// //   ))}
// // </ul>
// //           </div>
// //         )}

// //         {/* No Reports Message */}
// //         {!selectedReport && reports.length === 0 && !loading && (
// //           <div className="bg-white shadow-lg rounded-lg p-6 text-center">
// //             <p className="text-gray-500">No reports available. Generate a new one to get started!</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>


import { useState } from "react";
import { jsPDF } from "jspdf";

// Define FoodItem, InventoryItem, ExpenseItem, and Report types
interface FoodItem {
  food: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

interface Report {
  id: number;
  foodItems: FoodItem[];
  date: string;
  time: string;
}

interface InventoryItem {
  name: string;
  quantity: number;
  price: number;
}

interface ExpenseItem {
  name: string;
  amount: number;
  date: string;
}

const ReportManagement = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  
  const [isGeneratingOrderReport, setIsGeneratingOrderReport] = useState(false);
  const [isGeneratingInventoryReport, setIsGeneratingInventoryReport] = useState(false);
  const [isGeneratingExpenseReport, setIsGeneratingExpenseReport] = useState(false);

  const [selectedOrderReport, setSelectedOrderReport] = useState<Report | null>(null);
  const [selectedInventoryReport, setSelectedInventoryReport] = useState<InventoryItem | null>(null);
  const [selectedExpenseReport, setSelectedExpenseReport] = useState<ExpenseItem | null>(null);

  // Dummy Data for Orders, Inventory, and Expenses
  const dummyFoodOrders = [
    { food: "Pizza", quantity: 2, price: 1200, date: "2025-02-08", time: "12:30 PM" },
    { food: "Burger", quantity: 3, price: 1950, date: "2025-02-08", time: "1:00 PM" },
    { food: "Fish Burger", quantity: 3, price: 1800, date: "2025-02-08", time: "1:00 PM" },
    { food: "Submarine", quantity: 2, price: 600, date: "2025-02-08", time: "1:00 PM" },
    { food: "Grill Chicken", quantity: 3, price: 800, date: "2025-02-08", time: "1:00 PM" },
    { food: "Fish Sub", quantity: 2, price: 880, date: "2025-02-08", time: "1:00 PM" },
    { food: "Chicken Pizza", quantity: 3, price: 820, date: "2025-02-08", time: "1:00 PM" },
    { food: "Burger", quantity: 3, price: 380, date: "2025-02-08", time: "1:00 PM" },
    { food: "Pizza", quantity: 1, price: 500, date: "2025-02-08", time: "1:00 PM" },
    { food: "Submarine", quantity: 2, price: 800, date: "2025-02-08", time: "1:00 PM" },
    { food: "Burger", quantity: 1, price: 550, date: "2025-02-08", time: "1:00 PM" },
    { food: "Pizza", quantity: 1, price: 480, date: "2025-02-08", time: "1:00 PM" },
    { food: "Burger", quantity: 2, price: 950, date: "2025-02-08", time: "1:00 PM" },
    { food: "Submarine", quantity: 1, price: 780, date: "2025-02-08", time: "1:00 PM" },
    { food: "Burger", quantity: 2, price: 1200, date: "2025-02-08", time: "1:00 PM" },
    { food: "Pizza", quantity: 1, price: 600, date: "2025-02-08", time: "1:00 PM" },
    { food: "Hot Milo", quantity: 1, price: 380, date: "2025-02-08", time: "1:00 PM" },
    { food: "Fruit Platter", quantity: 1, price: 340, date: "2025-02-08", time: "1:00 PM" },
    { food: "Ice Cream", quantity: 1, price: 250, date: "2025-02-08", time: "1:00 PM" },
  ];
  
  const dummyInventory = [
    { name: "rice", quantity: 200, price: 20000  },
    { name: "Cheese", quantity: 10, price: 12000 },
    { name: "Cocunut Oil", quantity: 10, price: 12000 },
    { name: "Cream", quantity: 10, price: 12000 },
    { name: "Yogurt", quantity: 120, price: 12000 },
    { name: "Meat", quantity: 210, price: 12000 },
    { name: "Eggs", quantity: 101, price: 12000 },
    { name: "Flour", quantity: 120, price: 12000 },
    { name: "Bread", quantity: 120, price: 12000 },
    { name: "Sugar", quantity: 40, price: 12000 },
    { name: "Cooking Oil", quantity: 40, price: 12000 },
    { name: "Sauces", quantity: 60, price: 12000 },
    { name: "Soft", quantity: 100, price: 12000 },
  ];
  
  const dummyExpenses = [
    { name: "Rent", amount: 5000, date: "2025-FEB" },
    { name: "Electricity", amount: 300, date: "2025-FEB" },
    { name: "Elmpoyee Cost", amount: 300000, date: "2025-FEB" },
    { name: "Transport Cost", amount: 300000, date: "2025-FEB" },
  ];

  // Generate Reports
  const generateOrderReport = () => {
    setIsGeneratingOrderReport(true);
    setTimeout(() => {
      const combinedReport = {
        id: 1,
        foodItems: dummyFoodOrders.map((order) => ({
          food: order.food,
          quantity: order.quantity,
          price: order.price,
          totalPrice: order.quantity * order.price,
        })),
        date: "2025-02-08",
        time: "All Day",
      };
      setReports([combinedReport]);
      setIsGeneratingOrderReport(false);
    }, 2000);
  };

  const generateInventoryReport = () => {
    setIsGeneratingInventoryReport(true);
    setTimeout(() => {
      setInventory(dummyInventory); // Generate Inventory Report
      setIsGeneratingInventoryReport(false);
    }, 2000);
  };

  const generateExpenseReport = () => {
    setIsGeneratingExpenseReport(true);
    setTimeout(() => {
      setExpenses(dummyExpenses); // Generate Expense Report
      setIsGeneratingExpenseReport(false);
    }, 2000);
  };

  // Print Reports
  const printOrderReport = () => {
    if (selectedOrderReport) {
      const doc = new jsPDF();
      doc.text(`Order Report #${selectedOrderReport.id}`, 10, 10);
      doc.text(`Date: ${selectedOrderReport.date}`, 10, 20);
      doc.text(`Time: ${selectedOrderReport.time}`, 10, 30);

      let yPosition = 40;
      selectedOrderReport.foodItems.forEach((item) => {
        doc.text(`Food: ${item.food}`, 10, yPosition);
        doc.text(`Quantity: ${item.quantity}`, 10, yPosition + 10);
        doc.text(`Price: $${item.price}`, 10, yPosition + 20);
        doc.text(`Total Price: $${item.totalPrice}`, 10, yPosition + 30);
        yPosition += 40;
      });

      doc.save(`order-report-${selectedOrderReport.id}.pdf`);
    }
  };

  const printInventoryReport = () => {
    if (selectedInventoryReport) {
      const doc = new jsPDF();
      doc.text(`Inventory Report for ${selectedInventoryReport.name}`, 10, 10);
      doc.text(`Quantity: ${selectedInventoryReport.quantity}`, 10, 20);
      doc.text(`Price: $${selectedInventoryReport.price}`, 10, 30);
      doc.save(`inventory-report-${selectedInventoryReport.name}.pdf`);
    }
  };

  const printExpenseReport = () => {
    if (selectedExpenseReport) {
      const doc = new jsPDF();
      doc.text(`Expense Report for ${selectedExpenseReport.name}`, 10, 10);
      doc.text(`Amount: $${selectedExpenseReport.amount}`, 10, 20);
      doc.text(`Date: ${selectedExpenseReport.date}`, 10, 30);
      doc.save(`expense-report-${selectedExpenseReport.name}.pdf`);
    }
  };

  return (
    <div className="container mx-auto p-6">
    {/* Order Report Section */}
    <div className="bg-white shadow-xl rounded-lg p-8 mb-6">
      {/* <h2 className="text-3xl font-semibold text-gray-800 mb-6">Order Report Management</h2> */}
      <div className="flex justify-center mb-6">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition ease-in-out duration-300 transform hover:scale-105"
          onClick={generateOrderReport}
          disabled={isGeneratingOrderReport}
        >
          {isGeneratingOrderReport ? "Generating..." : "Generate Order Report"}
        </button>
      </div>
      {reports.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-4 border-b text-left text-lg font-medium text-gray-600">Food</th>
                <th className="px-6 py-4 border-b text-left text-lg font-medium text-gray-600">Quantity</th>
                <th className="px-6 py-4 border-b text-left text-lg font-medium text-gray-600">Price</th>
                <th className="px-6 py-4 border-b text-left text-lg font-medium text-gray-600">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {reports[0].foodItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b text-gray-800">{item.food}</td>
                  <td className="px-6 py-4 border-b text-gray-800">{item.quantity}</td>
                  <td className="px-6 py-4 border-b text-gray-800">{item.price}</td>
                  <td className="px-6 py-4 border-b text-gray-800">{item.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  
    {/* Inventory Report Section */}
    <div className="bg-white shadow-xl rounded-lg p-8 mb-6">
      {/* <h2 className="text-3xl font-semibold text-gray-800 mb-6">Inventory Report Management</h2> */}
      <div className="flex justify-center mb-6">
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition ease-in-out duration-300 transform hover:scale-105"
          onClick={generateInventoryReport}
          disabled={isGeneratingInventoryReport}
        >
          {isGeneratingInventoryReport ? "Generating..." : "Generate Inventory Report"}
        </button>
      </div>
      {inventory.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-4 border-b text-left text-lg font-medium text-gray-600">Item Name</th>
                <th className="px-6 py-4 border-b text-left text-lg font-medium text-gray-600">Quantity</th>
                <th className="px-6 py-4 border-b text-left text-lg font-medium text-gray-600">Price</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b text-gray-800">{item.name}</td>
                  <td className="px-6 py-4 border-b text-gray-800">{item.quantity}</td>
                  <td className="px-6 py-4 border-b text-gray-800">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  
    {/* Expense Report Section */}
    <div className="bg-white shadow-xl rounded-lg p-8 mb-6">
      {/* <h2 className="text-3xl font-semibold text-gray-800 mb-6">Expense Report Management</h2> */}
      <div className="flex justify-center mb-6">
        <button
          className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition ease-in-out duration-300 transform hover:scale-105"
          onClick={generateExpenseReport}
          disabled={isGeneratingExpenseReport}
        >
          {isGeneratingExpenseReport ? "Generating..." : "Generate Expense Report"}
        </button>
      </div>
      {expenses.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-4 border-b text-left text-lg font-medium text-gray-600">Expense Name</th>
                <th className="px-6 py-4 border-b text-left text-lg font-medium text-gray-600">Amount</th>
                <th className="px-6 py-4 border-b text-left text-lg font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b text-gray-800">{item.name}</td>
                  <td className="px-6 py-4 border-b text-gray-800">{item.amount}</td>
                  <td className="px-6 py-4 border-b text-gray-800">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
  
  );
};

export default ReportManagement;






