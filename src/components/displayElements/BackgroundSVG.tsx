export const svgBg = (
  <svg
    className="absolute inset-0 w-full h-full z-0"
    viewBox="0 0 768 768"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ pointerEvents: "none" }}
  >
    <rect width="768" height="768" fill="#111" />
    <g opacity="0.15">
      <g filter="url(#a)">
        <circle cx="384" cy="384" r="384" fill="#fff" />
      </g>
      <g stroke="#fff" strokeOpacity="0.08">
        {Array.from({ length: 10 }).map((_, i) => (
          <circle key={i} cx="384" cy="384" r={48 * (i + 1)} />
        ))}
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={i}
            x1="384"
            y1="0"
            x2="384"
            y2="768"
            transform={`rotate(${(i * 360) / 16} 384 384)`}
          />
        ))}
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={i + 16}
            x1="0"
            y1="384"
            x2="768"
            y2="384"
            transform={`rotate(${(i * 360) / 16} 384 384)`}
          />
        ))}
      </g>
    </g>
    <defs>
      <filter
        id="a"
        x="-100"
        y="-100"
        width="968"
        height="968"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur stdDeviation="40" />
      </filter>
    </defs>
  </svg>
);
