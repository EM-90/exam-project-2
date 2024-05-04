import { HiOutlineStar } from "react-icons/hi";

function Card({ item, onClick }) {

  return (
    <div className="card cursor-pointer" onClick={onClick}>
      <div className="imageContainer h-60">
      {item.media && item.media.length > 0 && (
          <img className="object-cover w-full h-full rounded-md" src={item.media[0].url} alt={item.name} />
        )}
      </div>
      <div className="textContentContainer flex flex-col gap-1 py-2">
        <div className="titleAndRating flex item-center justify-between">
          <h4 className="text-xl font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis w-64">{item.name}</h4>
          <div className="flex items-center">
            <HiOutlineStar />
            <p className="pl-1 font-medium">{item.rating}/5</p>
          </div>
        </div>
        <div className="w-full">
         <p className="price text-xl text-wrap">Price:<span className="itemPrice text-skin-primary text-2xl font-bold pl-2 ">{item.price}kr </span>night</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
