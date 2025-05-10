import { CircleCheckBig } from "lucide-react";
import ModalLayout from "./_ModalLayout";
import ButtonLabel from "../buttons/_ButtonLabel";
import ButtonLabelSecondary from "../buttons/_ButtonLabelSecondary";
import Link from "next/link";

type Props = {
  onClose: () => void;
};

const WelcomeModal = (props: Props) => {
  return (
    <ModalLayout item="start" justify="center" onClose={props.onClose}>
      <div className="flex justify-center items-center bg-custom-gray-600 rounded-full p-3 w-16 h-16">
        <CircleCheckBig size={100} className="text-custom-gray-200" />
      </div>
      <div className="h3Style">You&apos;re connected!</div>
      <p className="bodyStyle">
        Welcome to BeFUNDR. You can now explore projects, invest, and
        contribute.
      </p>
      <div className="flex justify-start items-center gap-4">
        <Link href="/myprofile">
          <ButtonLabel label="Setup my profile" />
        </Link>
        <button onClick={props.onClose}>
          <ButtonLabelSecondary label="Do it later" />
        </button>
      </div>
    </ModalLayout>
  );
};

export default WelcomeModal;
