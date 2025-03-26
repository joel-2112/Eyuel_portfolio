import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import EarthCanvas from "../components/canvas/Earth";

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
    <div id="contact" className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-300">
        <div className="bg-gray-100 p-6 sm:p-8 rounded-2xl border border-white transition-all duration-300">
          <p className="text-base text-gray-600 font-medium mb-2">Get in touch with me:</p>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Fill the form...</h2>
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
            <label className="flex flex-col">
              <span className="text-sm text-gray-700 font-medium mb-1">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your full name?"
                className="bg-gray-200 py-2 px-4 placeholder:text-gray-500 text-gray-800 rounded-lg outline-none border border-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              />
              {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
            </label>
            <label className="flex flex-col">
              <span className="text-sm text-gray-700 font-medium mb-1">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email?"
                className="bg-gray-200 py-2 px-4 placeholder:text-gray-500 text-gray-800 rounded-lg outline-none border border-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              />
              {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
            </label>
            <label className="flex flex-col">
              <span className="text-sm text-gray-700 font-medium mb-1">Message</span>
              <textarea
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What you want to say?"
                className="bg-gray-200 py-2 px-4 placeholder:text-gray-500 text-gray-800 rounded-lg outline-none border border-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              />
              {errors.message && <span className="text-red-500 text-sm mt-1">{errors.message}</span>}
            </label>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 py-2 px-6 rounded-lg text-white font-medium hover:bg-blue-700 transition-all duration-200 w-fit disabled:bg-blue-400"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>

        <div className="w-full h-80 sm:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl border border-white transition-all duration-300">
          <EarthCanvas />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg transition-transform duration-300 transform scale-100">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-blue-700">Success!</h2>
            <p className="text-blue-700">Your message has been sent successfully.</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-600 py-2 px-6 rounded-lg text-white font-medium hover:bg-blue-700 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;