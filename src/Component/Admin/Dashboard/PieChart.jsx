import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";
import axios from "axios"; 

ChartJS.register(ArcElement, Tooltip, Legend);

const ProductCategoryChart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products") 
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); 
      });
  }, []); 

  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryCounts), 
    datasets: [
      {
        label: "Products by Category",
        data: Object.values(categoryCounts), 
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
        ], 
        hoverBackgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div style={{ width: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2 style={{ fontSize: "20px", fontFamily: "Arial, sans-serif" }}>Category-wise Products</h2>
      <Pie data={chartData} /> 
    </div>
  );
};

export default ProductCategoryChart;
