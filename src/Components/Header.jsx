function Header() {
  return (
    <nav className="flex justify-between px-4 py-4 bg-[#f8f9fa] sticky top-0 z-1000">
      <div className="heding text-xl font-semibold">
        <h1>GeekGallery</h1>
      </div>
      <div className="search flex gap-2">
        <input type="text" placeholder="Search" className="bg-white border-1 border-gray-400 px-3 py-1.5 rounded-lg"/>
        <button className="border-1 border-[#459e75] px-3 py-1.5 rounded-lg text-[#459e75] cursor-pointer hover:bg-[#198754] hover:text-white transition-bg duration-300">Search</button>
      </div>
    </nav>
  );
}

export default Header;
