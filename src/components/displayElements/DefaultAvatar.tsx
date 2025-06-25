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
 * Generates a deterministic RGB color from a given string seed and an optional offset.
 *
 * This function creates a numeric hash from the `seed` string using a simple bitwise operation.
 * To ensure the hash remains positive (since JavaScript bitwise operations operate on signed 32-bit integers),
 * it is converted to an unsigned 32-bit integer using `>>> 0`.
 *
 * The resulting RGB values are derived from the hash with offsets to produce variation.
 *
 * @param seed - A string used to seed the color generation (e.g., a public key).
 * @param offset - An optional numeric offset to vary the output color (default is 0).
 * @returns A CSS RGB color string in the format `rgb(R, G, B)` (e.g., `rgb(120, 80, 240)`).
 */
const generateColor = (seed: string, offset = 0): string => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  hash = hash >>> 0;

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
