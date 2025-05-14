import Image from "next/image";
import DefaultAvatar from "../displayElements/DefaultAvatar";

type Props = { user: User };

const UserCard = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 ">
      {props.user?.avatar ? (
        <Image
          src={props.user.avatar}
          alt={props.user.name}
          width={80}
          height={80}
          className="rounded-full"
        />
      ) : (
        <DefaultAvatar size={80} publicKey={props.user.wallet} />
      )}
      <div>
        <div className="font-bold text-white">{props.user.name}</div>
      </div>
    </div>
  );
};

export default UserCard;
