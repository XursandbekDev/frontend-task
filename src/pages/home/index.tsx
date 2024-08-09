import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { GrLinkPrevious } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

type Product = {
  id?: number;
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
  const [products, setProducts] = useState<Product[]>([]);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    // Fetch products when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      if (editProductId) {
        await axios.put(`http://localhost:3000/products/${editProductId}`, product);
        alert('Product updated successfully');
      } else {
        await axios.post('http://localhost:3000/products', product);
        alert('Product added successfully');
      }

      setProduct({
        image: '',
        name: '',
        price: 0,
        description: '',
        category: ''
      });
      setEditProductId(null);
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to submit product', error);
    }
  };

  const handleEdit = (product: Product) => {
    setProduct(product);
    setEditProductId(product.id ?? null);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      alert('Product ochirildi');
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error(' product ochirishda hatolik! ', error);
    }
  };

  return (
    <>
      <button
        onClick={handleNavigate}
        className='absolute top-2 left-2 bg-black text-white p-3'
      >
        <GrLinkPrevious />
      </button>


      <div className=" p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-4">{editProductId ? 'Edit Product' : 'Add Product'}</h2>
        <input
          name="name"
          value={product.name}
          placeholder="Nomi"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          value={product.price}
          placeholder="Narxi"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          onChange={handleChange}
        />
        <input
          name="description"
          value={product.description}
          placeholder="Description"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          onChange={handleChange}
        />
        <input
          name="image"
          value={product.image}
          placeholder="Image URL"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          onChange={handleChange}
        />
        <select
          name="category"
          value={product.category}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {editProductId ? 'Yangilash' : 'Kiritish'}
        </button>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Product ro'yxati</h2>
          {products.map((product) => (
            <div key={product.id} className="mb-4 p-4 bg-gray-100 rounded">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>{product.description}</p>
              <p>Narxi: ${product.price}</p>
              <p>Kategoriya: {product.category}</p>
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white p-2 rounded mr-2 hover:bg-yellow-600"
              >
                <CiEdit />
              </button>
              <button
                onClick={() => handleDelete(product.id!)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                <RiDeleteBin6Fill />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

