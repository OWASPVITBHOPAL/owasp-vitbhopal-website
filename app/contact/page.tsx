"use client";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import React, { useState } from "react";
import Header from '@/components/header'



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
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
      <input
        className="border-2 border-[var(--border)] rounded-2xl p-4 text-white"
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        className="border-2 border-[var(--border)] rounded-2xl p-4 text-white"
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <textarea
        className="border-2 border-[var(--border)] rounded-2xl p-4 text-white"
        name="message"
        placeholder="Message"
        rows={6}
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

const page = () => {
  return (
    <Container className="min-h-screen px-4 md:px-6 lg:px-8">
      <Header title='Contact Us'>
        Have questions or want to collaborate? We&apos;d love to hear from you. Reach out to the OWASP VIT Bhopal team and connect with our cybersecurity community.
      </Header>


      <div className="w-[75%] mx-auto flex gap-4 px-16 mt-16 ">
        <div className="w-2/5">
          <div className="flex flex-col gap-4 font-bold mb-8 border-2 border-[var(--border)] p-4 rounded-2xl">
            <div className="text-4xl font-semibold">Get in Touch</div>
            <div className="text-lg font-medium text-[var(--muted)] leading-6">
              Do you have any questions? or do you have any suggestions for us?
            </div>
            <div className="flex flex-start p-4 rounded-2xl items-center border-2 border-[var(--border)] gap-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
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
              <div className="text-xl font-semibold">Mail</div>
            </div>
            <div className="flex flex-start p-4 rounded-2xl items-center border-2 border-[var(--border)] gap-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
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
              <div className="text-xl font-semibold">Mail</div>
            </div>
            <div className="flex flex-start p-4 rounded-2xl items-center border-2 border-[var(--border)] gap-x-4">
              <div className="flex gap-4 items-center justify-between p-5 w-full relative">
                <div className="h-full aspect-square ">O</div>
                <div className="h-full aspect-square ">W</div>
                <div className="h-full aspect-square ">A</div>
                <div className="h-full aspect-square ">S</div>
                <div className="h-full aspect-square ">P</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/5">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
};

export default page;
