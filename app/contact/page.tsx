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
import { toast } from "sonner";
import { CustomToaster } from "@/components/custom-toaster";



const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(data.error || "Failed to send message.");
      }
    } catch (_err) {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-y-4 h-full" onSubmit={handleSubmit}>
      <input
        className="border-2 border-[var(--border)] bg-transparent rounded-2xl p-3 md:p-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors text-sm md:text-base"
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        className="border-2 border-[var(--border)] bg-transparent rounded-2xl p-3 md:p-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors text-sm md:text-base"
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <textarea
        className="border-2 border-[var(--border)] bg-transparent rounded-2xl p-3 md:p-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors resize-none flex-1 text-sm md:text-base"
        name="message"
        placeholder="Message"
        rows={7}
        value={form.message}
        onChange={handleChange}
        required
      ></textarea>
      <Button>{loading ? "Sending..." : "Send Message"}</Button>
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
      <CustomToaster />
      
      <Header title='Contact Us'>
Have questions or want to collaborate? We&apos;d love to hear from you. Reach out to the OWASP VIT Bhopal team and connect with our cybersecurity community.      </Header>

    <h2 className='text-3xl md:text-4xl text-[#1b1a1d] font-medium'> .</h2>
      <div className='w-full border-2 my-4 border-dashed border-white/12' />

      <div className="max-w-5xl mx-auto mt-8 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Left Side - Contact Info */}
          <div className="lg:col-span-2">
            <div className="flex flex-col justify-between gap-3 md:gap-4 border-2 border-[var(--border)] p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-sm h-full">
              <div className="text-2xl md:text-3xl lg:text-4xl font-normal">Get in Touch</div>
              <div className="text-sm md:text-base font-light text-[var(--muted)] leading-6">
                Do you have any questions or suggestions for us? We&apos;d love to hear from you!
              </div>

              {/* Email */}
              <div className="flex flex-start p-3 md:p-4 rounded-2xl items-center border-2 border-[var(--border)] gap-x-2 bg-white/5 hover:bg-white/10 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="16"
                  viewBox="0 0 32 26"
                  fill="none"
                  className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5"
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
                <div className="text-sm md:text-base lg:text-lg font-semibold break-all">owaspclub@vitbhopal.ac.in</div>
              </div>

              {/* Phone */}
              <div className="flex flex-start p-3 md:p-4 rounded-2xl items-center border-2 border-[var(--border)] gap-x-2 bg-white/5 hover:bg-white/10 transition-colors">
                <svg width="20" height="20" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5">
                  <path d="M29.0191 35.625C27.5703 35.625 25.5352 35.1011 22.4878 33.3985C18.7821 31.3204 15.9158 29.4018 12.2301 25.7257C8.67646 22.1744 6.94717 19.8751 4.52689 15.4709C1.79267 10.4983 2.25877 7.89172 2.77978 6.7777C3.40025 5.44622 4.31611 4.64985 5.4999 3.85942C6.17228 3.41888 6.88383 3.04124 7.62552 2.73129C7.69974 2.69938 7.76877 2.66895 7.83037 2.64149C8.19775 2.47598 8.75439 2.22586 9.45947 2.49305C9.93002 2.66969 10.3501 3.03114 11.0077 3.68055C12.3562 5.01055 14.1991 7.97262 14.8789 9.42731C15.3354 10.4077 15.6374 11.0549 15.6382 11.7808C15.6382 12.6306 15.2107 13.2859 14.6919 13.9932C14.5947 14.1261 14.4982 14.253 14.4047 14.3762C13.8399 15.1184 13.7159 15.3329 13.7976 15.7159C13.9631 16.4855 15.1973 18.7766 17.2257 20.8006C19.2541 22.8245 21.4792 23.9809 22.2518 24.1456C22.6511 24.231 22.8701 24.1018 23.636 23.517C23.7458 23.4331 23.8586 23.3463 23.9767 23.2595C24.7678 22.6709 25.3928 22.2545 26.2225 22.2545H26.227C26.9491 22.2545 27.5674 22.5677 28.5916 23.0843C29.9275 23.7582 32.9786 25.5773 34.3168 26.9274C34.9677 27.5834 35.3306 28.002 35.508 28.4718C35.7752 29.1791 35.5236 29.7336 35.3596 30.1047C35.3321 30.1663 35.3017 30.2338 35.2698 30.3088C34.9574 31.0491 34.5775 31.7592 34.135 32.4299C33.346 33.61 32.5467 34.5236 31.2122 35.1449C30.527 35.469 29.7771 35.6332 29.0191 35.625Z" fill="white" />
                </svg>

                <div className="text-sm md:text-base lg:text-lg font-semibold">+91 00000000</div>
              </div>

              {/* Social Media Links */}
              <div className="flex flex-col gap-auto">
                <div className="flex w-full justify-between">
                  {socialMediaLinks.map((social) => {
                    const IconComponent = iconMap[social.icon];
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors border border-[var(--border)]"
                        aria-label={social.name}
                      >
                        <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default page;
