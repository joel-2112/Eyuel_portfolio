import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import EarthCanvas from "../components/canvas/Earth";
import { motion } from "framer-motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    let newErrors = { ...errors };
    if (name === "name" && !value.trim()) {
      newErrors.name = "Name is required";
    } else if (name === "name") {
      newErrors.name = "";
    }
    if (name === "email") {
      if (!value.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "Email is invalid";
      } else {
        newErrors.email = "";
      }
    }
    if (name === "message" && !value.trim()) {
      newErrors.message = "Message is required";
    } else if (name === "message") {
      newErrors.message = "";
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: !form.name.trim() ? "Name is required" : "",
      email: !form.email.trim()
        ? "Email is required"
        : !/\S+@\S+\.\S+/.test(form.email)
        ? "Email is invalid"
        : "",
      message: !form.message.trim() ? "Message is required" : "",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setLoading(true);
    emailjs
      .send(
        "service_x3s9gt9",
        "template_3cid0of",
        {
          from_name: form.name,
          to_name: "Eyuel",
          from_email: form.email,
          to_email: "eyueljoel21@gmail.com",
          message: form.message,
        },
        "77YejHliL9fnL75Oc"
      )
      .then(
        () => {
          setLoading(false);
          setShowModal(true);
          setForm({ name: "", email: "", message: "" });
          setErrors({ name: "", email: "", message: "" });
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
      className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <motion.div
        className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-300"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="bg-white p-6 sm:p-8 rounded-xl border border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-base text-gray-600 font-medium mb-2">Get in Touch</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Send Me a Message</h2>
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label>
                  <span className="text-sm text-gray-700 font-medium mb-1 block">Full Name</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your full name?"
                    className="w-full bg-gray-100 py-3 px-4 placeholder:text-gray-500 text-gray-800 rounded-lg outline-none border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  />
                  {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
                </label>
              </div>
              <div className="flex-1">
                <label>
                  <span className="text-sm text-gray-700 font-medium mb-1 block">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email?"
                    className="w-full bg-gray-100 py-3 px-4 placeholder:text-gray-500 text-gray-800 rounded-lg outline-none border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  />
                  {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
                </label>
              </div>
            </div>
            <label className="flex-1">
              <span className="text-sm text-gray-700 font-medium mb-1 block">Message</span>
              <textarea
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What you want to say?"
                className="w-full bg-gray-100 py-3 px-4 placeholder:text-gray-500 text-gray-800 rounded-lg outline-none border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              />
              {errors.message && <span className="text-red-500 text-sm mt-1">{errors.message}</span>}
            </label>
            <motion.button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 py-3 px-6 rounded-lg text-white font-semibold hover:bg-indigo-700 transition-all duration-200 w-full sm:w-auto disabled:bg-indigo-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-xl border-2 border-indigo-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-white opacity-50 rounded-xl" />
          <div className="w-full h-full flex items-center justify-center">
            <EarthCanvas />
          </div>
        </motion.div>
      </motion.div>

      {showModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-indigo-100"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Success!</h2>
            <p className="text-gray-700">Your message has been sent successfully.</p>
            <motion.button
              onClick={() => setShowModal(false)}
              className="mt-6 bg-indigo-600 py-2 px-6 rounded-lg text-white font-medium hover:bg-indigo-700 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Contact;