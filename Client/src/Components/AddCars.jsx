import { useState } from "react";

const AddCars = () => {
  const [carTitle, setCarTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const carData = {
      title: carTitle,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
      images,
    };

    console.log("Car data submitted:", carData);

    setCarTitle("");
    setDescription("");
    setTags("");
    setImages([]);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }
    setImages(files);
  };

  return (
    <div className="container mx-auto p-6 rounded-xl bg-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-teal-50">Add New Car</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="car-name" className="block text-teal-100 mb-2">
            Car Title
          </label>
          <input
            type="text"
            id="car-name"
            className="w-full p-4 bg-gray-200 text-teal-950 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
            value={carTitle}
            onChange={(e) => setCarTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="car-description" className="block text-teal-100 mb-2">
            Car Description
          </label>
          <textarea
            id="car-description"
            className="w-full p-4 bg-gray-200 text-teal-950 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="car-tags" className="block text-teal-100 mb-2">
            Car Tags (comma separated)
          </label>
          <input
            type="text"
            id="car-tags"
            className="w-full p-4 bg-gray-200 text-teal-950 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="car-images" className="block text-teal-100 mb-2">
            Upload Car Images (Max 10 images)
          </label>
          <input
            type="file"
            id="car-images"
            className="w-full p-4 bg-gray-200 text-teal-950 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          <p className="text-gray-50 text-sm mt-2">
            You can upload up to 10 images. Supported formats: jpg, png, jpeg.
          </p>
        </div>
        <div className="w-full flex items-center mt-12">
          <button
            type="submit"
            className="w-1/3 py-3 px-4 bg-teal-700 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50 mx-auto"
          >
            Add Car
          </button>
        </div>
      </form>

      {images.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-teal-500 mb-4">
            Selected Images:
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Car image ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <span className="absolute top-2 right-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded-full text-xs">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCars;
