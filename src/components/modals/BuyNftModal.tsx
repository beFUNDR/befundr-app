import ModalLayout from "./_ModalLayout";
import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import ButtonLabelAsync from "../buttons/_ButtonLabelAsync";
import AlertMessage from "../displayElements/AlertMessage";
import NftBuySuccess from "./NftBuySuccess";

// À adapter selon la structure de Project
const maxQty = 4; // À remplacer par props.project.maxQty si dispo

type Props = {
  onClose: () => void;
  project: Project;
  price: number;
};

const BuyNftModal = (props: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const totalPrice = (props.price * quantity).toFixed(2);
  const [isShowSuccess, setIsShowSuccess] = useState(false);

  const handleBuy = () => {
    setIsLoading(true);
    // mock 2 seconds
    setTimeout(() => {
      setIsShowSuccess(true);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <ModalLayout justify="center" item="center" onClose={props.onClose} dark>
      <div className="flex flex-col gap-6 min-w-[320px]">
        <h2 className="h3Style">Buy NFT</h2>
        <p className="bodyStyle">
          You are about to buy a NFT from the project. Please confirm your
          purchase.
        </p>
        {/* Sélecteur de quantité */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-white">
            Quantity: {quantity} (max {maxQty})
          </label>
          <Slider
            min={1}
            max={maxQty}
            value={quantity}
            onChange={setQuantity as any}
            trackStyle={{ backgroundColor: "#08f7e7", height: 6 }}
            handleStyle={{ borderColor: "#08f7e7", height: 20, width: 20 }}
            railStyle={{ backgroundColor: "#222", height: 6 }}
          />
        </div>
        {/* Prix total */}
        <div className="flex justify-between items-center text-lg font-bold text-white">
          <span>Total price</span>
          <span>${totalPrice}</span>
        </div>
        {/* Reminder risque */}
        <AlertMessage>
          Reminder: Investing in early stage projects is risky. You may lose all
          or part of your investment. Do your own research before buying.
        </AlertMessage>
        {/* Bouton de validation */}
        <button onClick={handleBuy} className="w-48 mx-auto">
          <ButtonLabelAsync isLoading={isLoading} label="Confirm purchase" />
        </button>
      </div>
      {isShowSuccess && (
        <NftBuySuccess
          quantity={quantity}
          projectName={props.project.name}
          onClose={props.onClose}
        />
      )}
    </ModalLayout>
  );
};

export default BuyNftModal;
