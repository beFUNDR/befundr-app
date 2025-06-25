import ButtonLabel from "@/components/buttons/_ButtonLabel";
import ModalLayout from "@/components/modals/_ModalLayout";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

type Props = {
  onClose: () => void;
  quantity: number;
  projectName: string;
};

const NftBuySuccess = (props: Props) => {
  return (
    <ModalLayout item="start" justify="center" onClose={props.onClose}>
      <div className="flex justify-center items-center bg-custom-gray-600 rounded-full p-3 w-16 h-16">
        <CircleCheckBig size={100} className="text-custom-gray-200" />
      </div>
      <div className="h3Style">
        You&apos;ve successfully bought {props.quantity} NFTs!
      </div>
      <p className="bodyStyle">
        Now, the journey begins for {props.projectName}. You will be able to
        access the project page and see the progress of the project.
      </p>
      <div className="flex justify-center items-center gap-4 w-full md:w-auto">
        <Link href="/" className="w-full md:w-auto">
          <ButtonLabel label="Awesome!" />
        </Link>
      </div>
    </ModalLayout>
  );
};

export default NftBuySuccess;
