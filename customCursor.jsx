import { useState, useEffect } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isLightGray, setIsLightGray] = useState(true);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({
        x: e.clientX - 12, // Centering the cursor
        y: e.clientY - 12,
      });
    };

    window.addEventListener("mousemove", updatePosition);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  useEffect(() => {
    // Toggle between light gray and dark gray every 1.5 seconds
    const colorInterval = setInterval(() => {
      setIsLightGray((prev) => !prev);
    }, 1000);

    return () => clearInterval(colorInterval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {/* Outer Glowing Circle */}
      <div
        style={{
          position: "absolute",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: isLightGray ? "#d3d3d3" : "#555",
          border: `2px solid ${isLightGray ? "#d3d3d3" : "#555"}`,
          boxShadow: `0 0 20px 5px ${isLightGray ? "#d3d3d3" : "#555"}`, // Bigger glow
          opacity: 0.8,
          transition: "all 0.5s ease-in-out",
        }}
      ></div>

      {/* Small Pulsing Dot */}
      {/* <div
        style={{
          position: "absolute",
          width: "8px",
          height: "8px",
          backgroundColor: isLightGray ? "#d3d3d3" : "#555",
          borderRadius: "50%",
          boxShadow: `0 0 10px ${isLightGray ? "#d3d3d3" : "#555"}`,
          animation: "pulse 1.5s infinite alternate",
        }}
      ></div> */}
    </div>
  );
};

export default CustomCursor;
