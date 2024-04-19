
function Card({ item }) {
  return (
    <div className="card">
      <div className="imageContainer">
        <img className="object-cover w-full " src={item.media[0].url} alt={item.name} />
      </div>
      <div>
        <h4>{item.name}</h4>
        <div>
          <p>{item.rating}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
