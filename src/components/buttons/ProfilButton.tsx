// src/components/ProfilButton.js
import { useEffect, useRef, useState } from "react";
import { User, FileText, Users, LogOut, DollarSign } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { concatAddress } from "@/utils/utilsFunctions";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import DefaultAvatar from "../displayElements/DefaultAvatar";
import { useGetUser } from "@/hooks/dbData/useUser";

const ProfilButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { disconnect, publicKey } = useWallet();
  const { data: userData } = useGetUser(publicKey?.toString());

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
        {userData?.data.avatar ? (
          <Image
            src={userData?.data.avatar}
            alt="Avatar"
            className="rounded-full"
            width={40}
            height={40}
          />
        ) : (
          publicKey && (
            <DefaultAvatar size={10} publicKey={publicKey?.toString()} />
          )
        )}
        <span className="whitespace-nowrap">
          {userData?.data.name
            ? userData?.data.name
            : concatAddress(publicKey?.toString())}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-48 bg-custom-gray-800 text-white rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                {userData?.data.avatar ? (
                  <Image
                    src={userData?.data.avatar}
                    alt="Avatar"
                    className="rounded-full"
                    width={40}
                    height={40}
                  />
                ) : (
                  publicKey && (
                    <DefaultAvatar
                      size={10}
                      publicKey={publicKey?.toString()}
                    />
                  )
                )}
                <div>
                  <div className="whitespace-nowrap">{userData?.data.name}</div>
                  <div className=" text-gray-400">
                    {concatAddress(publicKey?.toString())}
                  </div>
                </div>
              </div>
            </div>
            <ul className="py-2">
              <Link href="/myprofile?tab=My profile">
                <li
                  className="px-4 py-2 hover:bg-custom-gray-600 cursor-pointer flex items-center space-x-2"
                  onClick={closeMenu}
                >
                  <User size={16} color="gray" />
                  <span>My profile</span>
                </li>
              </Link>
              <Link href="/myprofile?tab=My projects">
                <li
                  className="px-4 py-2 hover:bg-custom-gray-600 cursor-pointer flex items-center space-x-2"
                  onClick={closeMenu}
                >
                  <FileText size={16} color="gray" />
                  <span>My projects</span>
                </li>
              </Link>
              <Link href="/myprofile?tab=My missions">
                <li
                  className="px-4 py-2 hover:bg-custom-gray-600 cursor-pointer flex items-center space-x-2"
                  onClick={closeMenu}
                >
                  <DollarSign size={16} color="gray" />
                  <span>My missions</span>
                </li>
              </Link>
              <Link href="/myprofile?tab=My applications">
                <li
                  className="px-4 py-2 hover:bg-custom-gray-600 cursor-pointer flex items-center space-x-2"
                  onClick={closeMenu}
                >
                  <DollarSign size={16} color="gray" />
                  <span>My applications</span>
                </li>
              </Link>
              <Link href="/myprofile?tab=My communities">
                <li
                  className="px-4 py-2 hover:bg-custom-gray-600 cursor-pointer flex items-center space-x-2"
                  onClick={closeMenu}
                >
                  <Users size={16} color="gray" />
                  <span>My communities</span>
                </li>
              </Link>
              <Link href="/myprofile?tab=My investments">
                <li
                  className="px-4 py-2 hover:bg-custom-gray-600 cursor-pointer flex items-center space-x-2"
                  onClick={closeMenu}
                >
                  <DollarSign size={16} color="gray" />
                  <span>My investments</span>
                </li>
              </Link>
              <li
                className="px-4 py-2 hover:bg-custom-gray-600 cursor-pointer flex items-center space-x-2"
                onClick={() => disconnect()}
              >
                <LogOut size={16} color="gray" />
                <span>Disconnect</span>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilButton;
