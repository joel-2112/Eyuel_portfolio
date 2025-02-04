import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import SectionWrapper from "../hoc/SectionWrapper";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#ffffff", // White background
        color: "#1a1a1a", // Dark text for contrast
        border: "1px solid #e5e7eb", // Light gray border
        borderRadius: "8px", // Rounded corners
      }}
      contentArrowStyle={{ borderRight: "10px solid #e5e7eb" }} // Light gray arrow
      date={
        <span style={{ color: "#4a5568", fontSize: "14px", fontWeight: "500" }}>
          {experience.date}
        </span>
      }
      iconStyle={{ background: experience.iconBg, border: "2px solid #e5e7eb" }} // Icon background with light gray border
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-[20px] font-bold text-gray-900">{experience.title}</h3>
        <p
          className="text-[16px] font-semibold text-blue-600"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-gray-700 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center text-gray-500`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center text-gray-500`}>
          Work Experience
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline lineColor="#e5e7eb"> {/* Light gray timeline line */}
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");