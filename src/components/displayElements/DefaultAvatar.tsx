/**
 * Props for the DefaultAvatar component.
 */
type Props = {
  /**
   * The size (in pixels) of the avatar. This will define both width and height.
   */
  size: number;

  /**
   * The public key used to generate a unique color-based avatar.
   */
  publicKey: string;
};

/**
 * Generates a deterministic RGB color from a given string seed and an offset.
 *
 * @param seed - A string used to seed the hash (typically a public key).
 * @param offset - A numeric offset to vary the output color.
 * @returns A CSS RGB color string, e.g., `rgb(120, 80, 240)`
 */
const generateColor = (seed: string, offset = 0): string => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const r = (hash + offset) % 256;
  const g = (hash + offset * 2) % 256;
  const b = (hash + offset * 3) % 256;
  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * DefaultAvatar displays a circular gradient avatar based on a user's public key.
 *
 * @param size - Size (width and height) of the avatar in pixels.
 * @param publicKey - The public key used to generate consistent gradient colors.
 * @returns A circular `div` styled with a vertical gradient background.
 */
const DefaultAvatar = ({ size, publicKey }: Props) => {
  const color1 = generateColor(publicKey, 100);
  const color2 = generateColor(publicKey, 200);

  return (
    <div
      className="rounded-full"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(0deg, ${color1}, ${color2})`,
        boxShadow: "0 0 4px rgba(0,0,0,0.1)",
      }}
    />
  );
};

export default DefaultAvatar;
