import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ButtonLabel from "@/components/buttons/_ButtonLabel";
import ModalLayout from "@/components/modals/_ModalLayout";

type Props = {
  onClose: () => void;
  image: string;
  projectName: string;
};

const MissionApplicationValidationModal = (props: Props) => {
  return (
    <ModalLayout item="start" justify="center" onClose={props.onClose}>
      <div className="flex justify-center items-center bg-custom-gray-600 rounded-full p-3 w-16 h-16">
        <CircleCheckBig size={100} className="text-custom-gray-200" />
      </div>
      <div className="h3Style">Application submitted!</div>
      <div className="flex justify-center items-center gap-4">
        <Image
          src={props.image}
          alt={props.projectName}
          width={100}
          height={100}
          className="rounded-full"
        />
        <p className="bodyStyle">
          Your application for {props.projectName} has been submitted. You will
          get back to you as soon as possible.
        </p>
      </div>
      <div className="flex justify-center items-center gap-4 w-full">
        <Link href="/">
          <ButtonLabel label="Back to homepage" />
        </Link>
      </div>
    </ModalLayout>
  );
};

export default MissionApplicationValidationModal;
