import { useNavigate } from "react-router-dom";

const PackageCard = ({ val }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full max-w-[35rem] mx-auto my-4 border border-gray-100 bg-white overflow-hidden rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => navigate('/package/detail', { state: { ...val } })}
    >
      {/* Image Section */}
      <div className="relative h-[20rem] w-full object-cover">
        <img
          src={val?.mainPhoto?.secure_url}
          alt={val?.packageName || "Package Image"}
          className="h-full w-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      {/* Title and Rate Section */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent text-white">
        <h3 className="text-lg font-bold truncate">{val?.packageName}</h3>
        <p className="text-sm mt-1">{val?.rate ? `${val.rate} / ${val?.rateBy}` : "Rate Not Available"}</p>
      </div>
    </div>
  );
};

export default PackageCard;
