import { motion } from "framer-motion";
import { styles } from "../styles";
// import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    const staggerContainer = (staggerChildren, delayChildren) => {
      return {
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerChildren,
            delayChildren: delayChildren || 0,
          },
        },
      };
    };
    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl  relative  z-0 my-12 `} // Added margin, dotted border, and rounded corners
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;