import React, { useState, useEffect } from "react";
import axios from "axios";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import AddButton from "./AddButton";
import "./PDetails.css"; 

const ProductsDetails = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddProduct = (newProduct) => {
    axios
      .post("http://localhost:3000/products", newProduct)
      .then((response) => setProducts([...products, response.data]))
      .catch((error) => console.error("Error adding product:", error));
  };

  const handleEditProduct = (updatedProduct) => {
    axios
      .put(`http://localhost:3000/products/${updatedProduct.id}`, updatedProduct)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  const handleDeleteProduct = (id) => {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <div className="products-container">
      <h2 className="products-title">
        Products Management <AddButton onAdd={handleAddProduct} />
      </h2>
      <table className="products-table">
        <thead>
          <tr className="table-header">
            <th>ID</th>
            <th>Title</th>
            <th>Image</th>
            <th>Price</th>
            <th>Model</th>
            <th>Color</th>
            <th>Category</th>
            <th>Discount</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr className="table-row" key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>
                <img src={product.image} alt={product.title} className="product-image" />
              </td>
              <td>{product.price}</td>
              <td>{product.model}</td>
              <td>{product.color}</td>
              <td>{product.category}</td>
              <td>{product.discount}%</td>
              <td>{product.stock}</td>
              <td className="action-buttons">
                <EditButton product={product} onEdit={handleEditProduct} />
                <DeleteButton productId={product.id} onDelete={handleDeleteProduct} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsDetails;
