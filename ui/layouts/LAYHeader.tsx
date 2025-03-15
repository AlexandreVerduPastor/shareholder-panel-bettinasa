"use client"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";
import CTRChangePassword from "../components/auth/CTRChangePassword";
import Image from "next/image";

const Header = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-800 border-b-1 border-gray-950 flex justify-between items-center text-white">
   
        

      <div className="text-2xl w-64 border-r-1  border-gray-950 bg-gray-900 flex justify-center font-bold p-2">
                    <Image width={50} height={50} alt="Bettinasa logo" src={"/images/_logo-notext.png"}/>
                </div>

        <div>
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex gap-2 items-center mr-5">
              <h2  className="text-lg font-medium ">
                  Bienvenido, <b>{session?.user?.name ?? "Invitado"}</b>           
              </h2>
              <FontAwesomeIcon icon={faChevronDown} className="text-sm" />

        </div>
        
        {isOpen && (
          <div className="absolute right-0 mt-7 w-70 z-100 p-2 text-black rounded shadow-md overflow-hidden">
             <div className="flex flex-col gap-3">
             <CTRChangePassword />
            <button
              onClick={() => signOut()}
              className="block w-full text-left px-4 py-2 btn-danger"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" /> Cerrar sesión
            </button>
             </div>
          </div>
        )}
        </div>
     
    </header>
  );
};

export default Header;