"use client"
import { Container } from '@/components/container'
import React, { useState } from 'react'
import Header from '@/components/header'


const BugReportForm = () => {
  const [form, setForm] = useState({
    category: "",
    description: "",
    screenRecording: "",
    attachmentLink: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const categories = [
    "UI/UX Issue",
    "Performance Issue",
    "Security Vulnerability",
    "Functionality Bug",
    "Data Loss",
    "Integration Problem",
    "Other"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      const res = await fetch("/api/bug-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      if (data.success) {
        setSuccess("Bug report submitted successfully!");
        setForm({ category: "", description: "", screenRecording: "", attachmentLink: "" });
      } else {
        setError(data.error || "Failed to submit bug report.");
      }
    } catch {
      setError("Failed to submit bug report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-8 px-4 text-black bg-amber-300">
      <Header title='Report a Bug'>
Help us improve our website. Report any issues you encounter and we&apos;ll address them promptly to ensure the best experience for our community.      </Header>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Please select a category <span className="">*</span>
            </label>
            <div className="relative">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full p-3 border border-blue-300 rounded-lg bg-white appearance-none"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bug Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Please describe the bug in detail <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 resize-none"
              placeholder="Describe the bug, steps to reproduce, expected behavior, and actual behavior..."
            />
          </div>

          {/* Screen Recording Link */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Link to screen recording
            </label>
            <input
              type="url"
              name="screenRecording"
              value={form.screenRecording}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="https://..."
            />
          </div>

          {/* Attachment Link */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Attachments <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="attachmentLink"
              value={form.attachmentLink}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Click to choose a file or drag here"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-black text-white rounded-lg font-medium disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? "Submitting..." : "Next"}
              {!loading && (
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="text-green-600 text-sm p-3 bg-green-50 rounded-lg">{success}</div>
          )}
          {error && (
            <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg">{error}</div>
          )}
        </form>
      </div>
    </Container>
  );
};

export default BugReportForm;