import { useState, useEffect } from "react";

const MyCars = ({ token, myCars, setMyCars }) => {
  const [editCarId, setEditCarId] = useState(null); // Store the ID of the car being edited
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    images: [],
    tags: "",
  });

  const removeCar = async (carId) => {
    try {
      let result = await fetch(
        `http://localhost:80/api/product/delete-product/${carId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      result = await result.json();

      if (result.success) {
        setMyCars((cars) => cars.filter((car) => car._id !== carId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      images: Array.from(files),
    }));
  };

  const handleSaveChanges = async (carId) => {
    try {
      const { title, description, images, tags } = editFormData;
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      images.forEach((image, index) => {
        formData.append("images", image);
      });

      let result = await fetch(
        `http://localhost:80/api/product/update-product/${carId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      result = await result.json();

      if (result.success) {
        setMyCars((cars) =>
          cars.map((car) =>
            car._id === carId ? { ...car, ...editFormData } : car
          )
        );
        setEditCarId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMyCars = async () => {
    try {
      let result = await fetch("http://localhost:80/api/product/my-products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      result = await result.json();

      if (result.success) {
        setMyCars(result.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyCars();
  }, []);

  const startEditing = (car) => {
    setEditCarId(car._id);
    setEditFormData({
      title: car.title,
      description: car.description,
      images: car.images,
      tags: car.tags.join(", "),
    });
  };
  if (myCars.length == 0) return <h1>Loading...</h1>;
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
                  onClick={() => startEditing(car)}
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

      {editCarId && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Edit Car</h2>

            <label className="block mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={editFormData.title}
              onChange={handleEditChange}
              className="border border-gray-300 p-2 w-full mb-4"
            />

            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={editFormData.description}
              onChange={handleEditChange}
              className="border border-gray-300 p-2 w-full mb-4"
            />

            <label className="block mb-2">Images</label>
            <input
              type="file"
              name="images"
              onChange={handleImageChange}
              className="border border-gray-300 p-2 w-full mb-4"
              multiple
            />

            <label className="block mb-2">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={editFormData.tags}
              onChange={handleEditChange}
              className="border border-gray-300 p-2 w-full mb-4"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setEditCarId(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveChanges(editCarId)}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-400"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCars;
