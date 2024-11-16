import { useState } from "react";

const initialCars = [
  {
    id: 1,
    title: "Tesla Model S",
    image: "https://example.com/images/tesla-model-s.jpg",
  },
  {
    id: 2,
    title: "BMW M3",
    image: "https://example.com/images/bmw-m3.jpg",
  },
  {
    id: 3,
    title: "Audi R8",
    image: "https://example.com/images/audi-r8.jpg",
  },
];

const MyCars = () => {
  const [cars, setCars] = useState(initialCars);

  const removeCar = (carId) => {
    setCars(cars.filter((car) => car.id !== carId));
  };

  const editCar = (carId) => {
    const newTitle = prompt("Enter new car title: ");
    if (newTitle) {
      setCars(
        cars.map((car) =>
          car.id === carId ? { ...car, title: newTitle } : car
        )
      );
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-teal-900 mb-2">My Cars</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={car.image}
              alt={car.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white">{car.title}</h3>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => editCar(car.id)}
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeCar(car.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCars;
