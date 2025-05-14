import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  children: ReactNode;
  justify: string;
  item: string;
  dark?: boolean;
  onClose: () => void;
};

const ModalLayout = (props: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      props.onClose();
    }, 200); // Attendre la fin de l'animation
  };

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 backdrop-blur-sm bg-black/50 flex justify-center items-center z-50 p-10 min-h-screen"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div
            className={` 
              relative flex flex-col justify-${props.justify} items-${
              props.item
            } gap-4 
              p-8 rounded-md ${
                props.dark ? "bg-custom-gray-900" : "bg-custom-gray-900"
              }
            border border-custom-gray-800
            min-h-30 max-h-full overflow-auto mt-20 md:mt-0
              w-full md:w-1/2 rounded-xl
              backdrop-blur-sm
            `}
          >
            {/* Bouton de fermeture */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-custom-gray-600 rounded-full transition-colors duration-200"
              aria-label="Fermer"
            >
              <X size={30} className="text-custom-gray-200 hover:text-white" />
            </button>

            {props.children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    typeof window !== "undefined"
      ? document.body
      : (null as unknown as HTMLElement) // SSR safe
  );
};

export default ModalLayout;
