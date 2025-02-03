import { motion } from "framer-motion";
import { useState } from "react";

const ScrollIndicator = ({ setZoomed }) => {
  return (
    <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
      <button onClick={() => setZoomed(true)}>
        <div className="w-[35px] h-[64px] rounded-3xl border-4 border-blue-500 flex justify-center items-start p-2 cursor-pointer">
          <motion.div
            animate={{
              y: [0, 24, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-3 h-3 rounded-full bg-blue-500 mb-1"
          />
        </div>
      </button>
    </div>
  );
};

export default ScrollIndicator;
