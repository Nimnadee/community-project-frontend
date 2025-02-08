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
//     <Grid>d</Grid>
    
//   );
// }
