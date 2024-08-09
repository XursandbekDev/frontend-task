import React, { useState } from 'react';
import axios from 'axios';

type Product = {
  image: string;
  name: string;
  price: number;
  description: string;
  category: string;
};

const Home: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    image: '',
    name: '',
    price: 0,
    description: '',
    category: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/db.json', product); // Mock API endpoint
      alert('Product added successfully');
    } catch (error) {
      console.error('Failed to add product', error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="image" placeholder="Image URL" onChange={handleChange} />
      <select name="category" onChange={handleChange}>
        <option value="">Select Category</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
};

export default Home;
