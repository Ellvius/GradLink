export default function GradlinkIcon({ color = 'white', width = 40, height = 40 }) {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 200 200" 
        width={width} 
        height={height}
      >
        <polygon points="100,50 170,85 100,120 30,85" fill={color} />
        <rect x="40" y="110" width="120" height="15" fill={color} />
        <line x1="100" y1="120" x2="100" y2="150" stroke={color} strokeWidth="6" />
        <path d="M170,85 C180,100 165,115 155,125" stroke={color} strokeWidth="4" fill="none" />
        <circle cx="155" cy="125" r="6" fill={color} />
      </svg>
    );
  }