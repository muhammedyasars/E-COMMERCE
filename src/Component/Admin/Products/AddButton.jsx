import React, { useState } from "react";
import "./AddButton.css"; 

const AddButton = ({ onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    image: "",
    model: "",
    color: "",
    category: "",
    discount: 0,
    stock: 0,
  });

  const handleSave = () => {
    onAdd(newProduct);
    setNewProduct({
      title: "",
      price: 0,
      image: "",
      model: "",
      color: "",
      category: "",
      discount: 0,
      stock: 0,
    });
    setIsAdding(false);
  };

  if (isAdding) {
    return (
      <div className="add-form">
        <input
          type="text"
          placeholder="Product Title"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Model"
          value={newProduct.model}
          onChange={(e) =>
            setNewProduct({ ...newProduct, model: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Color"
          value={newProduct.color}
          onChange={(e) =>
            setNewProduct({ ...newProduct, color: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Discount (%)"
          value={newProduct.discount}
          onChange={(e) =>
            setNewProduct({ ...newProduct, discount: parseFloat(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })
          }
        />
        <div className="add-buttons">
          <button className="btn btn-success" onClick={handleSave}>
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button className="btn btn-success add-product-btn" onClick={() => setIsAdding(true)}>
      Add Product
    </button>
  );
};

export default AddButton;
