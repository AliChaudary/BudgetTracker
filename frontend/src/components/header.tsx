const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-6 shadow-md">
      <div className="container !mx-auto px-4">
        <div className="flex items-center  justify-center sm:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center">
            RS Budget Tracker
          </h1>
          <p className="text-blue-100 hidden sm:block">
            Manage your finances with ease
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
