// components/Header.tsx
import {signOut} from "next-auth/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const LAYHeader = () => {
    return (
        <header className="bg-gray-800 flex justify-between text-white p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Admin Panel</h1>
            </div>
            <div>
                <button
                    onClick={() => signOut()}
                    className="w-full py-2 bg-red-500 hover:bg-red-600 rounded text-white text-center"
                >
                    <FontAwesomeIcon icon={faRightFromBracket} />

                </button>
            </div>
        </header>
    );
};

export default LAYHeader;
