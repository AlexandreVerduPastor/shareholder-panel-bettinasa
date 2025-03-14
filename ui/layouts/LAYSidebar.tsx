
import { signOut } from 'next-auth/react';

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="flex-1 p-4">
                <h2 className="text-2xl font-bold">Admin Panel</h2>
                <nav className="mt-8">

                    <ul>
                        <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Dashboard</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Settings</a>
                        </li>

                    </ul>
                </nav>
            </div>


        </div>
    );
};

export default Sidebar;
