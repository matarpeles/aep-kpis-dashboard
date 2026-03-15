export const PortLogo = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/port-logo.svg" 
        alt="Port" 
        className="h-7 w-auto"
      />
    </div>
  );
};

export default PortLogo;
