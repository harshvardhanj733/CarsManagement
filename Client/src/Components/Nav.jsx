const Nav = ()=>{
    return(
        <header className="h-20 bg-gray-800 sm:max-h-20 flex items-center z-30 w-full border-b border-white">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a
            href="/"
            className=" uppercase  text-white font-black text-3xl transition-all duration-500 tracking-widest hover:tracking-tighter"
          >
            Car-Tunes
          </a>
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
    )
}

export default Nav;