import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";
import ProductCategoryChart from "./PieChart";
import "./Dashboard.css"

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    stocks: 0,
    users: 0,
    sales: 0,
    totalOrders: 0,
    blockedUsers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get("http://localhost:3000/products");
        const usersResponse = await axios.get("http://localhost:3000/users");

        const allOrders = usersResponse.data.flatMap((user) => user.order || []);
        const totalSales = allOrders.reduce((acc, order) => acc + order.totalAmount, 0);
        const totalOrders = allOrders.length;

        const totalStocks = productsResponse.data.reduce((acc, product) => acc + parseInt(product.stock), 0);

        const blockedUsers = usersResponse.data.filter((user) => user.block).length;

        setStats({
          products: productsResponse.data.length,
          users: usersResponse.data.length,
          sales: totalSales,
          stocks: totalStocks,
          totalOrders: totalOrders,
          blockedUsers: blockedUsers,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary mb-4">Dashboard</h1>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <div className="icon bg-primary text-white rounded-circle mb-3 d-inline-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                <i className="bi bi-box-seam"></i>
              </div>
              <h5 className="card-title">Total Products</h5>
              <p className="card-text display-4">{stats.products}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <div className="icon bg-success text-white rounded-circle mb-3 d-inline-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                <i className="bi bi-stack"></i>
              </div>
              <h5 className="card-title">Total Stocks</h5>
              <p className="card-text display-4">{stats.stocks}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <div className="icon bg-warning text-white rounded-circle mb-3 d-inline-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                <i className="bi bi-people"></i>
              </div>
              <h5 className="card-title">Total Users</h5>
              <p className="card-text display-4">{stats.users}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <div className="icon bg-danger text-white rounded-circle mb-3 d-inline-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                <i className="bi bi-cash-coin"></i>
              </div>
              <h5 className="card-title">Total Revenue</h5>
              <p className="card-text display-4">₹{stats.sales.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <div className="icon bg-info text-white rounded-circle mb-3 d-inline-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                <i className="bi bi-cart-check"></i>
              </div>
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text display-4">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <div className="icon bg-secondary text-white rounded-circle mb-3 d-inline-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                <i className="bi bi-person-x"></i>
              </div>
              <h5 className="card-title">Blocked Users</h5>
              <p className="card-text display-4">{stats.blockedUsers}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-center">Statistics Breakdown</h5>
            <ProductCategoryChart/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
