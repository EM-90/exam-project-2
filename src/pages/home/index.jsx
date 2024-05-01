import React, { useEffect, useState } from 'react';
import Card from '../../components/card';
import fetchData from '../../api/crud/read';
import { useNavigate } from 'react-router-dom';



function Home() {
  const [data, setData] = useState([]);
  
  let navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/venue/${id}`);
  }


  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchData("/holidaze/venues"); 
        setData(result); 
      } catch (error) {
        console.error('Failed to fetch data:', error); 
      }
    };

    loadData(); 
  }, []);



  return (
    <div className="container mx-auto my-7 px-7">
      <h1 className="text-5xl font-light">Venues</h1>
      <div className="container mx-auto grid xl:grid-cols-3 lg:grid-cols-2 gap-5 py-8">
        {data.map((item) => (
          <Card key={item.id} className="card" item={item} onClick={() => handleClick(item.id)} />
        ))}
      </div>
    </div>
  );
}

export default Home;


