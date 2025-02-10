import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import EarthCanvas from "../components/canvas/Earth";
import SectionWrapper from "../hoc/SectionWrapper";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_x3s9gt9',
        'template_3cid0of',
        {
          from_name: form.name,
          to_name: "Eyuel",
          from_email: form.email,
          to_email: "eyueljoel21@gmail.com",
          message: form.message,
        },
        '77YejHliL9fnL75Oc'
      )
      .then(
        () => {
          setLoading(false);
          setShowModal(true);

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div
      id="contact"
      className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-12 px-8 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 px-6 lg:grid-cols-2 gap-4">
        {/* Contact Form */}
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="bg-gray-100 p-8 rounded-2xl border border-white"
        >
          <p className="text-base text-gray-600 font-medium mb-2">Get in touch with me:</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Fill the form...</h2>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <label className="flex flex-col">
              <span className="text-sm text-gray-700 font-medium mb-1">
                Full Name
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your full name?"
                className="bg-gray-200 py-2.5 px-4 placeholder:text-gray-500 text-gray-800 rounded-lg outline-none border border-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm text-gray-700 font-medium mb-1">
                Email
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email?"
                className="bg-gray-200 py-2.5 px-4 placeholder:text-gray-500 text-gray-800 rounded-lg outline-none border border-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm text-gray-700 font-medium mb-1">
                Message
              </span>
              <textarea
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What you want to say?"
                className="bg-gray-200 py-2.5 px-4 placeholder:text-gray-500 text-gray-800 rounded-lg outline-none border border-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </label>

            <button
              type="submit"
              className="bg-blue-600 py-2.5 px-6 rounded-lg outline-none w-fit text-white font-medium hover:bg-blue-700 transition-all"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </motion.div>

        {/* Earth Canvas */}
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="w-full h-[400px] lg:h-[500px] overflow-hidden rounded-2xl border border-white"
        >
          <EarthCanvas />
        </motion.div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Success!</h2>
            <p className="text-blue-700">Your message has been sent successfully.</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-600 py-2.5 px-6 rounded-lg text-white font-medium hover:bg-blue-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionWrapper(Contact, "contact");