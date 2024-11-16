const AddCars = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Add New Car</h1>
      <form>
        <div>
          <label htmlFor="car-name">Car Name</label>
          <input
            type="text"
            id="car-name"
            className="w-full p-4 bg-gray-700 text-white rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
            required
          />
        </div>
        <div>
          <label htmlFor="car-model">Car Model</label>
          <input
            type="text"
            id="car-model"
            className="w-full p-4 bg-gray-700 text-white rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCars;
