const MovieCard = ({ title, year, poster, onClick }) => {
    return (
      <div className="bg-card-bg p-4 rounded-md shadow-md flex flex-col items-center w-[180px] h-[300px] sm:w-[282px] sm:h-[400px]">
        <div className="w-[160px] h-[240px] sm:w-[266px] sm:h-[350px] overflow-hidden rounded mb-4">
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover"
            onClick={onClick}
          />
        </div>
        <div className="self-start w-full mb-2">
          <h3 className="text-lg sm:text-xl font-medium text-white">{title}</h3>
        </div>
        <div className="self-start w-full">
          <p className="text-white">{year}</p>
        </div>
      </div>
    );
  };
  
  export default MovieCard;
  