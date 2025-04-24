// src/components/ProfilButton.js
import { useEffect, useRef, useState } from "react";
import {
  User,
  FileText,
  Users,
  CheckSquare,
  Settings,
  LogOut,
  DollarSign,
} from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { user } from "@/data/localData";
import { concatAddress } from "@/utils/utilsFunctions";

const ProfilButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { disconnect } = useWallet();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef} onClick={toggleMenu}>
      <button className="flex items-center space-x-2">
        <Image
          src={user.avatar}
          alt="Avatar"
          className="rounded-full"
          width={40}
          height={40}
        />
        <span>{user.name}</span>
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-custom-gray-800 text-white rounded-lg shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Image
                src={user.avatar}
                alt="Avatar"
                className="rounded-full"
                width={40}
                height={40}
              />
              <div>
                <div>{user.name}</div>
                <div className=" text-gray-400">
                  {concatAddress(user.address)}
                </div>
              </div>
            </div>
          </div>
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-custom-gray-600 cursor-pointer flex items-center space-x-2">
              <User size={16} color="gray" />
              <span>My profile</span>
            </li>
            <li className="px-4 py-2 hover:bg-custom-gray-600 cursor-pointer flex items-center space-x-2">
              <FileText size={16} color="gray" />
              <span>My projects</span>
            </li>
            <li className="px-4 py-2 hover:bg-custom-gray-600 cursor-pointer flex items-center space-x-2">
              <DollarSign size={16} color="gray" />
              <span>My contributions</span>
            </li>
            <li className="px-4 py-2 hover:bg-custom-gray-600 cursor-pointer flex items-center space-x-2">
              <Users size={16} color="gray" />
              <span>My DAOs</span>
            </li>
            <li className="px-4 py-2 hover:bg-custom-gray-600 cursor-pointer flex items-center space-x-2">
              <CheckSquare size={16} color="gray" />
              <span>My votes</span>
            </li>
            <li className="px-4 py-2 hover:bg-custom-gray-600 cursor-pointer flex items-center space-x-2">
              <Settings size={16} color="gray" />
              <span>Settings</span>
            </li>
            <li
              className="px-4 py-2 hover:bg-custom-gray-600 cursor-pointer flex items-center space-x-2"
              onClick={() => disconnect()}
            >
              <LogOut size={16} color="gray" />
              <span>Disconnect</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfilButton;
