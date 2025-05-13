import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type Props = {
  children: ReactNode;
  justify: string;
  item: string;
  dark?: boolean;
  onClose: () => void;
};

const ModalLayout = (props: Props) => {
  return createPortal(
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex justify-center items-center z-50 p-10 min-h-screen transition-all duration-300 ease-in-out">
      <div
        className={` 
          relative flex flex-col justify-${props.justify} items-${
          props.item
        } gap-4 
          p-8 rounded-md ${
            props.dark ? "bg-custom-gray-900" : "bg-custom-gray-900"
          }
        border border-custom-gray-600
        min-h-30 max-h-full overflow-auto mt-20 md:mt-0
          w-full md:w-1/2 rounded-xl
          backdrop-blur-sm transition-all duration-300 ease-in-out
        `}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={props.onClose}
          className="absolute top-4 right-4 p-2 hover:bg-custom-gray-600 rounded-full transition-colors duration-200"
          aria-label="Fermer"
        >
          <X size={30} className="text-custom-gray-200 hover:text-white" />
        </button>

        {props.children}

        {/* Suppression du bouton Close en bas */}
      </div>
    </div>,
    typeof window !== "undefined"
      ? document.body
      : (null as unknown as HTMLElement) // SSR safe
  );
};

export default ModalLayout;
