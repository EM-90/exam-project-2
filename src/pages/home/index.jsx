import FetchData from "../../api/fetchData"
import Card from "../../components/card"
import { baseLink, venues } from "../../api/linkConst/Index";

function Home() {
  return (
    <div className="container mx-auto my-7 px-7">
      <h1 className=" text-5xl font-light">Venues</h1>
      <FetchData url={baseLink + venues}>
        {(data) => (
          <div className="container mx-auto grid xl:grid-cols-3 lg:grid-cols-2 gap-5 py-8">
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
