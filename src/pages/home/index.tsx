import React, { useEffect, useState } from "react";
import Card from "../../components/card";
import { venueAPI } from "../../api/venue";
import { useNavigate } from "react-router-dom";
import Search from "../../components/search";
import { Venue } from "../../types";

const Home: React.FC = () => {
  const [data, setData] = useState<Venue[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Venue[]>([]);
  const navigate = useNavigate();

  const handleClick = (id: string) => {
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

  const handleChange = (value: string) => {
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
          {filteredData.map((item) => {
            if (!item.id) {
              return null; // Skip rendering this item if id is not defined
            }
            return (
              <Card
                key={item.id}
                className="card"
                item={item}
                onClick={() => handleClick(item.id!)}
              />
            );
          })}
        </article>
      ) : (
        <p className="text-center text-2xl text-gray-500 mt-8">
          No results found
        </p>
      )}
    </main>
  );
};

export default Home;
