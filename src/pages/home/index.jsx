import React, { useEffect } from 'react';
import { useCrud } from '../../context/crud';
import Card from '../../components/card';


function Home() {
  const { data, loading, error, fetchData } = useCrud();

  useEffect(() => {
    fetchData("/venues");
  }, []);
  console.log(data);

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  return (
    <div className="container mx-auto my-7 px-7">
      <h1 className="text-5xl font-light">Venues</h1>
      <div className="container mx-auto grid xl:grid-cols-3 lg:grid-cols-2 gap-5 py-8">
        {data.map((item) => (
          <Card key={item.id} className="card" item={item} />
        ))}
      </div>
    </div>
  );
}

export default Home;


