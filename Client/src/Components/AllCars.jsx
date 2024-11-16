import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const AllCars = ({ cars, setCars }) => {
  const getCars = async () => {
    try {
      let result = await fetch("http://localhost:80/api/product/all-products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Specify JSON format
        },
      });
      result = await result.json();

      if (result.success) {
        setCars(result.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedCar, setSelectedCar] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSelectCar = (car) => {
    setSelectedCar(car);
  };

  const handleBack = () => {
    setSelectedCar(null);
  };

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const filteredCars = cars.filter((car) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const matchesSearchQuery =
      car.title.toLowerCase().includes(lowercasedQuery) ||
      car.description.toLowerCase().includes(lowercasedQuery);

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => car.tags.includes(tag));

    return matchesSearchQuery && matchesTags;
  });

  const allTags = [...new Set(cars.flatMap((car) => car.tags))];

  useEffect(() => {
    getCars();
  }, []);
  const [alert, setAlert] = useState("");

  if (selectedCar) {
    return (
      <div className="container mx-auto p-6">
        <button
          onClick={handleBack}
          className="bg-teal-500 text-white py-2 px-4 rounded mb-6"
        >
          Back to All Cars
        </button>
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Render all images */}
          <div className="w-full">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {selectedCar.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`Image ${index + 1} of ${selectedCar.title}`}
                    className="w-full h-64 object-contain my-14"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="w-full flex justify-center">
              <span className="text-white text-2xl"> Swipe to View More</span>
            </div>
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-semibold text-white mb-4">
              {selectedCar.title}
            </h1>
            <p className="text-lg text-gray-300 mb-4">
              {selectedCar.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {selectedCar.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-teal-500 text-white py-1 px-3 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (cars.length == 0) return <h1>Loading...</h1>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-teal-900 mb-6">All Cars</h1>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by car name, description..."
          className="mb-6 p-2 w-full md:w-1/2 border focus:border-0 border-gray-800 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`py-1 px-3 rounded-full text-sm cursor-pointer ${
                selectedTags.includes(tag)
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div
              key={car._id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-500 hover:scale-110"
              onClick={() => handleSelectCar(car)}
            >
              <img
                src={car.images[0]}
                alt={car.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">
                  {car.title}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center col-span-full">No cars found</p>
        )}
      </div>
    </div>
  );
};

export default AllCars;
