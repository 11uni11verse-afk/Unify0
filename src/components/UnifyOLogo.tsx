interface UnifyOLogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

const UnifyOLogo = ({ size = 40, className = "" }: UnifyOLogoProps) => {
  return (
    <div 
      className={`overflow-hidden rounded-xl ${className}`}
      style={{ 
        width: size, 
        height: size,
      }}
    >
      <img
        src="/logo.png"
        alt="UnifyO"
        className="object-cover object-top"
        style={{ 
          width: size,
          height: size * 1.4, // Crop out the bottom text
          objectPosition: 'center 15%',
        }}
      />
    </div>
  );
};

export default UnifyOLogo;