// src/components/Header.tsx
const Header = () => {
  return (
    <header className="bg-[#212121] text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-thin">Signature Tattooz</h1>
        <nav className="space-x-6 text-sm md:text-base">
          <a href="#home" className="hover:text-gray-300">Home</a>
          <a href="#gallery" className="hover:text-gray-300">Gallery</a>
          <a href="#artists" className="hover:text-gray-300">Artists</a>
          <a href="#contact" className="hover:text-gray-300">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
