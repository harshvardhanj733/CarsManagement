const HomeSection = () => {
  return (
    <div>
      <main className="bg-gray-800  relative overflow-hidden h-full md:h-screen flex flex-col md:justify-around">
        <header className="h-20 sm:max-h-20 flex items-center z-30 w-full border-b border-white">
          <div className="container mx-auto px-6 flex items-center justify-between">
            <div className="uppercase  text-white font-black text-3xl transition-all duration-500 tracking-widest hover:tracking-tighter">
              Car-Tunes
            </div>
            <div className="flex items-center">
              <nav className="font-sen  text-white uppercase text-lg lg:flex items-center hidden">
                <a
                  href="/login"
                  className="py-2 px-6 flex opacity-70 hover:text-teal-700"
                >
                  Login
                </a>
                <a
                  className="py-2 px-6 flex hover:opacity-70 hover:text-teal-700 cursor-pointer"
                  href="/register"
                >
                  Register
                </a>
              </nav>
              <button className="lg:hidden flex flex-col ml-4">
                <span className="w-6 h-1  bg-white mb-1"></span>
                <span className="w-6 h-1  bg-white mb-1"></span>
                <span className="w-6 h-1  bg-white mb-1"></span>
              </button>
            </div>
          </div>
        </header>
        <div className=" pt-6 bg-gray-800 flex flex-col md:flex-row relative z-20 items-center overflow-hidden">
          <div className="container mx-auto px-6 flex flex-col sm:flex-row relative py-6">
            <div className="block w-full md:w-1/2 relative">
              <img
                src="/assets/homeImage.png"
                className="max-w-xs -translate-y-2 md:max-w-sm m-auto hover:scale-110 -rotate-12 hover:rotate-0 transition-all duration-200"
                alt="Image"
              />
            </div>
            <div className=" text-right sm:w-full md:w-1/2 pr-20 flex flex-col items-end relative z-20">
              <h1 className="font-bebas-neue uppercase text-3xl sm:text-5xl font-black flex flex-col leading-none text-white  mb-4">
                Looking for
                <br />
                <span className="text-teal-600 transition-all duration-500 hover:tracking-widest">
                  Cars ?
                </span>
                <span className="text-2xl sm:text-4xl my-4">
                  {" "}
                  Let&apos;s get you <br />{" "}
                  <span className="text-teal-500 transition-all duration-500 hover:tracking-widest">
                    Tuned in
                  </span>
                </span>
              </h1>
              <p className="text-sm sm:text-base  text-white">
                We offer a simple car management system that allows you to
                easily create, read, update, and delete vehicle records. Manage
                your fleet effortlessly with a user-friendly interface designed
                to keep track of all your cars in one place.
              </p>

              <div className="flex mt-8">
                <a
                  href="#"
                  className="uppercase py-2 px-4 rounded-lg bg-teal-500 border-2 border-transparent text-white text-md mr-4 hover:bg-teal-400"
                >
                  Get started
                </a>
                <a
                  href="#"
                  className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-teal-500  text-white hover:bg-teal-500 hover:text-white text-md"
                >
                  Read more
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeSection;
