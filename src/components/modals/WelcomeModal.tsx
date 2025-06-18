import ButtonLabel from "@/components/buttons/_ButtonLabel";
import ButtonLabelSecondary from "@/components/buttons/_ButtonLabelSecondary";
import ModalLayout from "@/components/modals/_ModalLayout";
import { CircleCheckBig } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  onClose: () => void;
};

const WelcomeModal = (props: Props) => {
  const router = useRouter();

  const handleProfileSetup = () => {
    props.onClose();
    router.push("/myprofile");
  };

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
      <div className="flex flex-col md:flex-row justify-start items-center gap-4 w-full">
        <button onClick={handleProfileSetup} className="w-full md:w-auto">
          <ButtonLabel label="Setup my profile" />
        </button>
        <button onClick={props.onClose} className="w-full md:w-auto">
          <ButtonLabelSecondary label="Do it later" />
        </button>
      </div>
    </ModalLayout>
  );
};

export default WelcomeModal;
