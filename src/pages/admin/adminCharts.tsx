import React, { useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CategoryChart: React.FC<{ data: { category: string }[] }> = ({ data }) => {
  const categoryCounts = data.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: 'Product Count by Category',
        data: Object.values(categoryCounts),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Product Count by Category',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

const AdminCharts: React.FC = () => {
  const [productData, setProductData] = useState<{ name: string; price: number; category: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data.map((product: any) => ({
          name: product.title,
          price: product.price,
          category: product.category,
        }));
        setProductData(products);
      } catch (error) {
        setError('Error fetching products. Please try again later.');
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">AdminCharts Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        {error ? (
          <div className="text-red-500 font-semibold">{error}</div>
        ) : (
          <>
            <CategoryChart data={productData} />
            {/* <ProductChart data={productData} /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminCharts;
