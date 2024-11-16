import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCars = ({ token, setMyCars }) => {
  const [carTitle, setCarTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const [addbuttonText, setAddButtonText] = useState("Add Car");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addCar();
  };

  const addCar = async () => {
    setAddButtonText("Just a min..");
    try {
      const carData = {
        title: carTitle,
        description,
        tags: tags.split(",").map((tag) => tag.trim()),
        images,
      };
      let result = await fetch(
        "http://localhost:80/api/product/create-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify JSON format
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(carData),
        }
      );
      result = await result.json();

      if (result.success) {
        setMyCars((prevMyCars) => [...prevMyCars, result.product]);
        console.log(images);
        setCarTitle("");
        setDescription("");
        setTags("");
        setImages([]);
        navigate("/dashboard/my-cars");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }
    files.map(async (file) => {
      const base64 = await convertToBase64(file);
      console.log(base64);
      setImages((images) => {
        return [...images, base64];
      });
    });
    // setImages(files);
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
            {addbuttonText}
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
                  // src={URL.createObjectURL(image)}
                  src={image}
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
