import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiences } from "../constants";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)",
        color: "#1a1a1a",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      contentArrowStyle={{ borderRight: "10px solid #e0e0e0" }}
      date={
        <span className="text-gray-600 text-sm font-medium bg-gray-100 px-2 py-1 rounded">
          {experience.date}
        </span>
      }
      iconStyle={{ 
        background: experience.iconBg, 
        border: "2px solid #e0e0e0",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease",
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <span className="text-white font-bold text-xl transition-transform duration-300 hover:scale-110">
            {experience.company_name.slice(0, 2)}
          </span>
        </div>
      }
      onTimelineElementClick={() => {}}
    >
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">{experience.title}</h3>
        <p className="text-base font-semibold text-indigo-700 m-0">
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-gray-700 text-sm pl-1 tracking-wider leading-relaxed"
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
    <div id="work" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-indigo-50 to-white transition-all duration-500">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-gray-600 text-lg sm:text-xl font-medium mb-4 animate-fade-in">
          What I have done so far
        </p>
        <h2 className="text-center text-gray-900 text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800 animate-pulse-slow">
          Work Experience
        </h2>

        <div className="mt-10 flex flex-col transition-all duration-500">
          <VerticalTimeline lineColor="#d1d5db">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={`experience-${index}`}
                experience={experience}
              />
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </div>
  );
};

export default Experience;