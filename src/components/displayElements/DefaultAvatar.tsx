import { createAvatar } from "@dicebear/core";
import { glass } from "@dicebear/collection";

type Props = {
  size: number;
  publicKey: string;
};

const DefaultAvatar = (props: Props) => {
  const svg = createAvatar(glass, {
    seed: props.publicKey,
  });

  return (
    <div
      className={`w-${props.size} h-${props.size} rounded-full overflow-hidden`}
      dangerouslySetInnerHTML={{ __html: svg.toString() }}
    />
  );
};

export default DefaultAvatar;
