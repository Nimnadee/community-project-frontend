
"use client"
import { deleteInventoryReport, generateInventoryReport, InventoryReport } from "@/service/InventoryReport";
import { deleteOrderReport, generateOrderReport, getAllOrderReports, OrderReport } from "@/service/orderReport";
import { button } from "@nextui-org/theme";
import { jsPDF } from "jspdf";
import React, { useState, useEffect } from "react";
 
 

const OrderReports: React.FC = () => {
  const [reports, setReports] = useState<OrderReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<OrderReport | null>(null);
  const [inventoryreports, setInventoryReports] = useState<InventoryReport[]>([]);
  const [selectedInventoryReport, setSelectedInventoryReport] = useState<InventoryReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleReports, setVisibleReports] = useState(5); // Number of reports to display initially

  const handleShowMore = () => {
    setVisibleReports(prev => prev + 5); // Show 5 more reports on click
  };

  const handleShowLess = () => {
    setVisibleReports(5); // Show the first 5 reports on click
  };

  useEffect(() => {
    async function fetchReports() {
      try {
        setLoading(true);
        const fetchedReports = await getAllOrderReports();
        setReports(fetchedReports);
      } catch (err) {
        setError("Failed to fetch reports.");
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Generate a new report
  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      const newReport = await generateOrderReport();
      alert("New report generated successfully!");
      setReports((prevReports) => [newReport, ...prevReports]);
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReport = async (id: string) => {
    if (confirm("Are you sure you want to delete this report?")) {
      try {
        setLoading(true);
        await deleteOrderReport(id);
        alert("Report deleted successfully!");
        setReports((prevReports) => prevReports.filter((report) => report._id !== id));
      } catch (error) {
        console.error("Error deleting report:", error);
        alert("Failed to delete report.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Generate a new report
  const handleGenerateInventoryReport = async () => {
    try {
      setLoading(true);
      const newReport = await generateInventoryReport();
      alert("New report generated successfully!");
      setInventoryReports((prevReports) => [newReport, ...prevReports]);
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInventoryReport = async (id: string) => {
    if (confirm("Are you sure you want to delete this report?")) {
      try {
        setLoading(true);
        await deleteInventoryReport(id);
        alert("Report deleted successfully!");
        setInventoryReports((prevReports) => prevReports.filter((report) => report._id !== id));
      } catch (error) {
        console.error("Error deleting report:", error);
        alert("Failed to delete report.");
      } finally {
        setLoading(false);
      }
    }
  };
  // useEffect(() => {
  //   async function fetchReports() {
  //     try {
  //       setLoading(true);
  //       const fetchedReports = await getAllOrderReports();
  //       setReports(fetchedReports);
  //     } catch (err) {
  //       setError("Failed to fetch reports.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchReports();
  // }, []);

  // if (loading) return <p>Loading reports...</p>;
  // if (error) return <p className="text-red-500">{error}</p>;

  // // Generate a new report
  // const handleGenerateReport = async () => {
  //   try {
  //     setLoading(true);
  //     const newReport = await generateOrderReport();
  //     alert("New report generated successfully!");
  //     setReports((prevReports) => [newReport, ...prevReports]);
  //   } catch (error) {
  //     console.error("Error generating report:", error);
  //     alert("Failed to generate report.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleDeleteReport = async (id: string) => {
  //   if (confirm("Are you sure you want to delete this report?")) {
  //     try {
  //       setLoading(true);
  //       await deleteOrderReport(id);
  //       alert("Report deleted successfully!");
  //       setReports((prevReports) => prevReports.filter((report) => report._id !== id));
  //     } catch (error) {
  //       console.error("Error deleting report:", error);
  //       alert("Failed to delete report.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  const handlePrintAsPDF = () => {
    if (!selectedReport) {
      alert("No report selected.");
      return;
    }
  
    const doc = new jsPDF();
    doc.setFontSize(8);  // Decreased font size for better fitting
  
    // Add title and other report details
    doc.setFontSize(10);
    doc.text(`Report ID: ${selectedReport._id}`, 20, 20);
    doc.text(`Date: ${new Date(selectedReport.generatedAt).toLocaleDateString()}`, 20, 30);
    doc.text(`Time: ${new Date(selectedReport.generatedAt).toLocaleTimeString()}`, 20, 40);
  
    // Add Total Orders and Total Revenue
    doc.setFontSize(8);  // Decreased font size for content
    let yOffset = 50;
    doc.text(`Total Orders: ${selectedReport.totalOrder}`, 20, yOffset);
    yOffset += 6;  // Reduced space
    doc.text(`Total Revenue: Rs. ${selectedReport.totalRevenue.toFixed(2)}`, 20, yOffset);
    yOffset += 10; // Reduced space before listing items
  
    // Add each item to the PDF
    selectedReport.items.forEach((item) => {
      // Check if space is available for the next item, if not, add a page break
      if (yOffset + 20 > doc.internal.pageSize.height) {
        doc.addPage();
        yOffset = 20; // Reset Y position after page break
      }
  
      doc.text(`Order ID: ${item.id}`, 20, yOffset);
      yOffset += 6;
  
      item.products.forEach((product, index) => {
        if (yOffset + 8 > doc.internal.pageSize.height) {
          doc.addPage();
          yOffset = 20; // Reset Y position after page break
        }
  
        doc.text(`Product: ${product.name} | Count: ${item.productCounts[index]} | Price: Rs. ${product.price.toFixed(2)}`, 20, yOffset);
        yOffset += 6;  // Reduced space between rows
      });
  
      // Add Total Price for the item
      doc.text(`Total Price: Rs. ${item.totalPrice.toFixed(2)}`, 20, yOffset);
      yOffset += 6;
      doc.text(`Date: ${new Date(item.date).toLocaleString()}`, 20, yOffset);
      yOffset += 10;  // Add space before the next item
    });
  
    // Save the document as a PDF
    doc.save('report.pdf');
  };
  
  
  
  


  return (
    <div className="p-4 bg-green-100 rounded-xl w-full max-w-7xl mx-auto">
    {!selectedReport ? (
      <>
        <h1 className="text-xl font-bold mb-4">ORDER REPORTS</h1>
        <button
          className="m-3 p-2 bg-green-500 text-white font-bold rounded-lg font-bold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          onClick={() => handleGenerateReport()}
        >
          New Report
        </button>
        <ul className="space-y-2">
          {reports.slice(0, visibleReports).map((report) => (
            <li key={report._id} className="border p-2 rounded-md bg-blue-50">
            <div className="relative w-full flex justify-between items-center">
              <button
                className="text-sm text-blue-800 hover:underline font-semibold max-w-5xl text-left"
                onClick={() => setSelectedReport(report)}
              >
                {`Report ID: ${report._id} | Date: ${new Date(report.generatedAt).toLocaleDateString()} | Time: ${new Date(report.generatedAt).toLocaleTimeString()}`}
              </button>
              <button
                className="absolute w-32 top-1/2 right-2 transform -translate-y-1/2 p-1 bg-red-500 rounded-lg text-white font-bold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 ml-5"
                onClick={() => handleDeleteReport(report._id)}
              >
                Delete
              </button>
            </div>
          </li>
          ))}
        </ul>

        {/* Show More / Show Less Buttons */}
        {visibleReports < reports.length && (
          <button
            className="m-3 p-2 bg-blue-500 rounded-lg text-white font-bold font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleShowMore}
          >
            Show More
          </button>
        )}
        {visibleReports > 5 && (
          <button
            className="m-3 p-2 bg-gray-500 rounded-lg text-white font-bold"
            onClick={handleShowLess}
          >
            Show Less
          </button>
        )}
      </>
    ) : (
      <div className="mt-4 bg-yellow-50 p-5 rounded-lg">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
          onClick={() => setSelectedReport(null)}
        >
          Back to Report List
        </button>
        <h2 className="text-lg font-bold mb-2">Report Details</h2>
        <div className="space-y-2">
          <p className="text-sm flex justify-between">
            <span className="font-semibold">Report ID:</span>
            <span>{selectedReport._id}</span>
          </p>
          <p className="text-sm flex justify-between">
            <span className="font-semibold">Total Orders:</span>
            <span>{selectedReport.totalOrder}</span>
          </p>
          <p className="text-sm flex justify-between">
            <span className="font-semibold">Total Revenue:</span>
            <span>Rs. {selectedReport.totalRevenue.toFixed(2)}</span>
          </p>
          <p className="text-sm flex justify-between">
            <span className="font-semibold">Generated At:</span>
            <span>{new Date(selectedReport.generatedAt).toLocaleString()}</span>
          </p>
        </div>

        {/* Items List */}
        <h3 className="font-bold mt-4">Orders</h3>
        {selectedReport.items.length > 0 ? (
          <div>
            <ul className="space-y-2">
              {selectedReport.items.map((item) => (
                <li key={item.id} className="border p-4 rounded-xl bg-green-100">
                  <h3 className="text-sm font-bold mb-2">Order ID: {item.id}</h3>

                  {/* Product Table */}
                  <h4 className="font-bold mt-2 mb-2">Products:</h4>
                  {item.products.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-300 text-left">
                      <thead>
                        <tr>
                          <th className="border border-gray-300 p-2">Product Name</th>
                          <th className="border border-gray-300 p-2">Product Count</th>
                          <th className="border border-gray-300 p-2">Product Price (Rs)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.products.map((product, index) => (
                          <tr key={index}>
                            <td className="border border-gray-300 p-2">{product.name}</td>
                            <td className="border border-gray-300 p-2">{item.productCounts[index]}</td>
                            <td className="border border-gray-300 p-2">
                              {product.price.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No products available.</p>
                  )}

                  {/* Date and Revenue */}
                  <div className="mt-4">
                    <p className="text-sm flex justify-between">
                      <span className="font-semibold">Total Price:</span>
                      <span>Rs.{item.totalPrice.toFixed(2)}</span>
                    </p>
                    <p className="text-sm flex justify-between">
                      <span className="font-semibold">Date:</span>
                      <span>{new Date(item.date).toLocaleString()}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          
          <p>No items available.</p>
        )}
        <button
          className="mt-5 font-bold  bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          onClick={handlePrintAsPDF}
        >
          Print Report as PDF
        </button>
      </div>
    )}

     
  </div>
  
);
};

export default OrderReports;








