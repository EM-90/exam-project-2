import { HiOutlineStar } from "react-icons/hi";

interface CardProps {
  item: any;
  onClick: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ item, onClick, className }) => {
  return (
    <article
      className={`card w-full cursor-pointer mt-8 ${className}`}
      onClick={onClick}
    >
      <figure className="imageContainer min-w-30 max-w-full h-60">
        {item.media && item.media.length > 0 && (
          <img
            className="object-cover w-full h-full rounded-md"
            src={item.media[0].url}
            alt={item.name}
          />
        )}
      </figure>
      <section className="textContentContainer flex flex-col gap-1 py-2">
        <header className="titleAndRating flex justify-between">
          <h4 className="text-xl font-semibold overflow-hidden overflow-ellipsis max-w-64">
            {item.name}
          </h4>
          <div className="flex items-center">
            <HiOutlineStar />
            <p className="pl-1 font-medium">{item.rating}/5</p>
          </div>
        </header>
        <div className="flex flex-wrap w-full">
          <p className="price text-xl">
            Price:
            <span className="itemPrice text-skin-primary text-2xl font-bold pl-2">
              {item.price}kr{" "}
            </span>
            night
          </p>
        </div>
      </section>
    </article>
  );
};

export default Card;
