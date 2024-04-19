import FetchData from "../../api/fetchData"
import Card from "../../components/card"
import { baseLink, venues } from "../../api/linkConst/Index";

function Home() {
  return (
    <div className="container mx-auto my-7 px-7">
      <h1>Venues</h1>
      <FetchData url={baseLink + venues}>
        {(data) => (
          <div className=" container flex-grow mx-auto grid grid-cols-3 w-full my-7 gap-4">
            {data.map((item) => (
              <Card key={item.id} className="card" item={item} />
            ))}
          </div>
        )}
      </FetchData>
    </div>
  );
}

export default Home
