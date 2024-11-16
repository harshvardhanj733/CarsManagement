import { useState, useEffect } from "react";

const MyCars = ({token, myCars, setMyCars}) => {
  const removeCar = async(carId) => {
    try {
      let result = await fetch(`http://localhost:80/api/product/delete-product/${carId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // Specify JSON format
          'Authorization': `Bearer ${token}`
        },
      })
      result = await result.json();

      if (result.success) {
        setMyCars((cars)=>{return cars.filter((car) => car._id !== carId)});
      }
    } catch (error) {
      console.log(error)
    }
  };

  const editCar = (carId) => {
    const newTitle = prompt("Enter new car title: ");
    if (newTitle) {
      setMyCars(
        myCars.map((car) =>
          car.id === carId ? { ...car, title: newTitle } : car
        )
      );
    }
  };

  const getMyCars = async ()=>{
    try {
      let result = await fetch('http://localhost:80/api/product/my-products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify JSON format
          'Authorization': `Bearer ${token}`
        },
      })
      result = await result.json();
  
      if (result.success) {
        setMyCars(result.products);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMyCars();
    console.log(myCars);
  }, [])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-teal-900 mb-2">My Cars</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {myCars.map((car) => (
          <div
            key={car._id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={car.images[0]}
              alt={car.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white">{car.title}</h3>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => editCar(car._id)}
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeCar(car._id)}
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
