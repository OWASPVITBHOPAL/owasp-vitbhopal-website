"use client";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import React, { useState } from "react";
import Header from '@/components/header'
import { socialMediaLinks } from "@/Content/LayoutElements";
import {
  IconBrandInstagramFilled,
  IconBrandLinkedinFilled,
  IconBrandGithubFilled,
  IconBrandDiscordFilled,
  IconBrandXFilled
} from "@tabler/icons-react";



const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(data.error || "Failed to send message.");
      }
    } catch (err) {
      setError("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-y-4 h-full" onSubmit={handleSubmit}>
      <input
        className="border-2 border-[var(--border)] bg-transparent rounded-2xl p-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        className="border-2 border-[var(--border)] bg-transparent rounded-2xl p-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <textarea
        className="border-2 border-[var(--border)] bg-transparent rounded-2xl p-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors resize-none flex-1"
        name="message"
        placeholder="Message"
        rows={7}
        value={form.message}
        onChange={handleChange}
        required
      ></textarea>
      <Button>{loading ? "Sending..." : "Send Message"}</Button>
      {success && <div className="text-green-500 text-sm mt-2">{success}</div>}
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </form>
  );
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  IconBrandInstagramFilled,
  IconBrandLinkedinFilled,
  IconBrandGithubFilled,
  IconBrandDiscordFilled,
  IconBrandXFilled,
};

const page = () => {
  return (
    <Container className="min-h-screen px-4 md:px-6 lg:px-8">
      <Header title='Contact Us'>
        Over the years we&apos;ve transformed the face of cybersecurity, thereby achieving various undisputed accomplishments in the field.
      </Header>

    <h2 className='md:text-4xl text-[#1b1a1d] text-3xl font-medium'> .</h2>
      <div className='w-full border-2 my-4 border-dashed border-white/12' />

      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 px-0 md:px-8 lg:px-16 mt-8 md:mt-16">
        <div className="w-full lg:w-2/5">
          <div className="flex flex-col gap-4 font-bold mb-8 border-2 border-[var(--border)] p-4 md:p-6 rounded-2xl">
            <div className="text-2xl md:text-4xl font-semibold">Get in Touch</div>
            <div className="text-base md:text-lg font-medium text-[var(--muted)] leading-6">
              Do you have any questions? or do you have any suggestions for us?
            </div>

            {/* Email Contact */}
            <a
              href="mailto:owaspclub@vitbhopal.ac.in"
              className="flex flex-start p-4 rounded-2xl items-center border-2 border-[var(--border)] gap-x-4 hover:border-white/30 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
                width="32"
                height="26"
                viewBox="0 0 32 26"
                fill="none"
              >
                <path
                  d="M31.8337 5.93042V20.9167C31.8337 22.1283 31.3708 23.2941 30.5396 24.1756C29.7084 25.0571 28.5718 25.5877 27.3623 25.6588L27.0837 25.6667H4.91699C3.70541 25.6667 2.53959 25.2038 1.65808 24.3726C0.776565 23.5415 0.245989 22.4048 0.174909 21.1953L0.166992 20.9167V5.93042L15.1216 15.9007L15.3052 16.0052C15.5217 16.1109 15.7594 16.1659 16.0003 16.1659C16.2412 16.1659 16.479 16.1109 16.6954 16.0052L16.8791 15.9007L31.8337 5.93042Z"
                  fill="white"
                />
                <path
                  d="M27.0832 0.333313C28.7932 0.333313 30.2926 1.23581 31.1286 2.59273L15.9998 12.6786L0.871094 2.59273C1.26818 1.94803 1.81364 1.40761 2.46198 1.0165C3.11033 0.625404 3.84278 0.394964 4.59826 0.344396L4.91651 0.333313H27.0832Z"
                  fill="white"
                />
              </svg>
              <div>
                <div className="text-lg md:text-xl font-semibold">Email</div>
                <div className="text-sm text-[var(--muted)] font-normal">owaspclub@vitbhopal.ac.in</div>
              </div>
            </a>

            {/* Phone Contact */}
            <div className="flex flex-start p-4 rounded-2xl items-center border-2 border-[var(--border)] gap-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
                width="32"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <div>
                <div className="text-lg md:text-xl font-semibold">Phone</div>
                <div className="text-sm text-[var(--muted)] font-normal">Contact coming soon</div>
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-start p-4 rounded-2xl items-center border-2 border-[var(--border)] gap-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <div>
                <div className="text-lg md:text-xl font-semibold">Location</div>
                <div className="text-sm text-[var(--muted)] font-normal">VIT Bhopal University</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/5">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
};

export default page;
