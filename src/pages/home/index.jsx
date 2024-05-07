import React, { useEffect, useState } from 'react';
import Card from '../../components/card';
import { venueAPI } from '../../api/venue';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  let navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/venue/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await venueAPI.fetchAllVenues();
        setData(response.data.data);
        
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
    ;
  }, []);

  console.log(data);



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


