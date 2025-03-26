import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiences } from "../constants";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#ffffff",
        color: "#1a1a1a",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
      contentArrowStyle={{ borderRight: "10px solid #e5e7eb" }}
      date={
        <span className="text-gray-600 text-sm font-medium">
          {experience.date}
        </span>
      }
      iconStyle={{ background: experience.iconBg, border: "2px solid #e5e7eb" }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <span className="text-white font-bold text-xl">
            {experience.company_name.slice(0, 2)}
          </span>
        </div>
      }
    >
      <div>
        <h3 className="text-xl font-bold text-gray-900">{experience.title}</h3>
        <p className="text-base font-semibold text-blue-600 m-0">
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-gray-700 text-sm pl-1 tracking-wider"
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
    <div id="work" className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-gray-500 text-lg sm:text-xl font-medium mb-2">
          What I have done so far
        </p>
        <h2 className="text-center text-gray-800 text-3xl sm:text-4xl lg:text-5xl font-bold mb-12">
          Work Experience
        </h2>

        <div className="mt-8 flex flex-col transition-all duration-300">
          <VerticalTimeline lineColor="#e5e7eb">
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