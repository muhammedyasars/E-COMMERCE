import React, { useState } from "react";

const EditButton = ({ product, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleSave = () => {
    onEdit(updatedProduct);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="edit-form">
        <input
          type="text"
          placeholder="Title"
          value={updatedProduct.title}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Color"
          value={updatedProduct.color}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, color: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Category"
          value={updatedProduct.category}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, category: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Discount (%)"
          value={updatedProduct.discount}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, discount: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Stock"
          value={updatedProduct.stock}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, stock: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={updatedProduct.price}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, price: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          value={updatedProduct.image}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, image: e.target.value })
          }
        />
        <button className="btn btn-success" onClick={handleSave}>
          Save
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
      Edit
    </button>
  );
};

export default EditButton;
