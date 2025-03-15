

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-800 font-bold border-r-1 border-gray-950  text-white flex flex-col">
            <nav>
            <ul className="mt-2">
                        <li>
                            <a href="/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">Inicio</a>
                        </li>

                        <a 
    href="#" 
    className="block py-2 px-4 rounded bg-gray-800 text-gray-400 cursor-not-allowed opacity-50"
  >
    Noticias (próximamente)
  </a>
                
                    </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
