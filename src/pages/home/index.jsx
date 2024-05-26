import React, { useEffect, useState } from "react";
import Card from "../../components/card";
import { venueAPI } from "../../api/venue";
import { useNavigate } from "react-router-dom";
import Search from "../../components/search";

function Home() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/venue/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await venueAPI.fetchAllVenues();
        setData(response.data.data);
        setFilteredData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (value) => {
    setSearchInput(value);
    if (value === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <main className="container mx-auto my-7 px-7">
      <h1 className="text-5xl font-light mb-7">Venues</h1>
      <Search value={searchInput} onChange={handleChange} />
      {filteredData.length > 0 ? (
        <article className="sm:grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-x-5 py-8">
          {filteredData.map((item) => (
            <Card
              key={item.id}
              className="card"
              item={item}
              onClick={() => handleClick(item.id)}
            />
          ))}
        </article>
      ) : (
        <p className="text-center text-2xl text-gray-500 mt-8">
          No results found
        </p>
      )}
    </main>
  );
}

export default Home;
