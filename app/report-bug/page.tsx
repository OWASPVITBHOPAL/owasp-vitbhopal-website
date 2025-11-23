"use client";
import { Container } from "@/components/container";
import Header from "@/components/header";
import React, { useCallback, useMemo, useState } from "react";

type FormState = {
  email: string;
  category: string;
  steps: string;
  severity: string;
  screenRecording: string;
};

const initialState: FormState = {
  email: "",
  category: "",
  steps: "",
  severity: "",
  screenRecording: "",
};

const MAX_ATTACHMENTS = 3;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB per attachment

const categories = [
  "UI/UX Issue",
  "Performance Issue",
  "Security Vulnerability",
  "Functionality Bug",
  "Data Loss",
  "Integration Problem",
  "Other",
];

const severityLevels = ["Low", "Medium", "High", "Critical"];

const BugReportForm = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [canContact, setCanContact] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const attachmentSummary = useMemo(
    () =>
      attachments.length
        ? `${attachments.length} file${attachments.length > 1 ? "s" : ""} attached`
        : "No files selected",
    [attachments]
  );

  const resetStatus = useCallback(() => {
    setSuccess("");
    setError("");
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    resetStatus();
  };

  const handleFileSelection = (files: FileList | null) => {
    if (!files?.length) return;

    const selectedFiles = Array.from(files);
    const totalFiles = attachments.length + selectedFiles.length;

    if (totalFiles > MAX_ATTACHMENTS) {
      setError(`You can upload up to ${MAX_ATTACHMENTS} attachments.`);
      return;
    }

    for (const file of selectedFiles) {
      if (file.size > MAX_FILE_SIZE) {
        setError("Each attachment must be 10 MB or smaller.");
        return;
      }
    }

    setAttachments((prev) => [...prev, ...selectedFiles]);
    resetStatus();
  };

  const handleAttachmentRemove = (index: number) => {
    setAttachments((prev) => prev.filter((_, current) => current !== index));
    resetStatus();
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleFileSelection(event.dataTransfer.files);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess("");
    setError("");

    if (attachments.length === 0) {
      setError("Please add at least one attachment before submitting.");
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("email", form.email.trim());
      payload.append("category", form.category);
      payload.append("steps", form.steps.trim());
      payload.append("severity", form.severity);
      payload.append("screenRecording", form.screenRecording.trim());
      payload.append("canContact", canContact ? "true" : "false");

      attachments.forEach((file) => {
        payload.append("attachments", file);
      });

      const response = await fetch("/api/bug-report", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit bug report.");
      }

      setSuccess("Bug report submitted successfully!");
      setForm(initialState);
      setAttachments([]);
      setCanContact(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to submit bug report.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="min-h-screen py-12 px-4 text-white">
      <div className="max-w-5xl mx-auto">
        <Header title="Report a Bug">
          Help us improve our platform by sharing detailed feedback whenever you
          encounter an issue. We use every report to deliver a better, more
          reliable experience for the OWASP VIT Bhopal community.
        </Header>
      </div>
      <div className="max-w-2xl mx-auto mt-12">
        <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-8 shadow-xl backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-white/90"
                  >
                    Your email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 shadow-sm transition focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="text-sm font-medium text-white/90"
                  >
                    Please select a category{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      value={form.category}
                      onChange={handleInputChange}
                      required
                      className="w-full appearance-none rounded-xl border border-white/20 bg-neutral-900 px-4 py-3 text-sm text-white shadow-sm transition focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
                    >
                      <option className="bg-neutral-900 text-white" value="">
                        Select a Category
                      </option>
                      {categories.map((category) => (
                        <option
                          key={category}
                          value={category}
                          className="bg-neutral-900 text-white"
                        >
                          {category}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-neutral-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 9l6 6 6-6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="steps"
                    className="text-sm font-medium text-white/90"
                  >
                    Steps to reproduce the issue{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="steps"
                    name="steps"
                    value={form.steps}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 shadow-sm transition focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="Describe the bug, steps to reproduce, expected behavior, and actual behavior..."
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="severity"
                    className="text-sm font-medium text-white/90"
                  >
                    Severity of the issue
                  </label>
                  <div className="relative">
                    <select
                      id="severity"
                      name="severity"
                      value={form.severity}
                      onChange={handleInputChange}
                      className="w-full appearance-none rounded-xl border border-white/20 bg-neutral-900 px-4 py-3 text-sm text-white shadow-sm transition focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
                    >
                      <option className="bg-neutral-900 text-white" value="">
                        Select severity
                      </option>
                      {severityLevels.map((level) => (
                        <option
                          key={level}
                          value={level}
                          className="bg-neutral-900 text-white"
                        >
                          {level}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-neutral-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 9l6 6 6-6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="screenRecording"
                    className="text-sm font-medium text-white/90"
                  >
                    Link to screen recording
                  </label>
                  <input
                    id="screenRecording"
                    name="screenRecording"
                    type="url"
                    value={form.screenRecording}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 shadow-sm transition focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/90">
                    Attachments <span className="text-red-500">*</span>
                  </label>
                  <label
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 px-6 py-8 text-center transition hover:border-white/50"
                  >
                    <input
                      type="file"
                      name="attachments"
                      multiple
                      className="hidden"
                      required
                      onChange={(event) =>
                        handleFileSelection(event.target.files)
                      }
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-6 w-6 text-neutral-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5l4.5-4.5m0 0L12 7.5m4.5 4.5H5.25m4.5 6.75H6.75A2.25 2.25 0 014.5 16.5v-9A2.25 2.25 0 016.75 5.25h10.5A2.25 2.25 0 0119.5 7.5v9a2.25 2.25 0 01-2.25 2.25h-1.5"
                      />
                    </svg>
                    <p className="mt-3 text-sm font-medium text-white/80">
                      Drag & drop a file or browse
                    </p>
                    <p className="mt-1 text-xs text-white/60">
                      Up to {MAX_ATTACHMENTS} files, 10 MB each
                    </p>
                    <p className="mt-3 text-xs text-white/60">
                      {attachmentSummary}
                    </p>
                  </label>
                  {attachments.length > 0 && (
                    <ul className="space-y-2 text-sm text-white/80">
                      {attachments.map((file, index) => (
                        <li
                          key={`${file.name}-${index}`}
                          className="flex items-center justify-between rounded-lg border border-white/15 bg-white/5 px-3 py-2"
                        >
                          <span className="truncate pr-3">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => handleAttachmentRemove(index)}
                            className="text-xs font-medium text-red-400 transition hover:text-red-300"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <label className="flex items-center gap-3 text-sm text-white/80">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/30 bg-transparent text-white focus:ring-white"
                    checked={canContact}
                    onChange={(event) => {
                      setCanContact(event.target.checked);
                      resetStatus();
                    }}
                  />
                  Can we contact you when the issue is resolved?
                </label>
              </div>
            </div>

            {success && (
              <div className="rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-200">
                {success}
              </div>
            )}
            {error && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-xl bg-neutral-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:pointer-events-none disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Report bug"}
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default BugReportForm;
