"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

export type LoaderContextType = {
  isLoaderComplete: boolean;
};

export const LoaderContext = createContext<LoaderContextType>({
  isLoaderComplete: false,
});

export const useLoader = () => useContext(LoaderContext);

type Props = {
  children?: ReactNode;
};

export default function Loader({ children }: Props) {
  const [mounted, setMounted] = useState(false);
  const [shouldShowLoader, setShouldShowLoader] = useState(false);
  const [done, setDone] = useState(false);
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);

  useEffect(() => {
    setMounted(true);

    const hasShownLoader = sessionStorage.getItem("loaderShown");
    if (hasShownLoader === "true") {
      setDone(true);
      setShouldShowLoader(false);
      setIsLoaderComplete(true);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("owasp-loader-complete"));
      }
    } else {
      setShouldShowLoader(true);
      setIsLoaderComplete(false);
    }
  }, []);

  const dismissLoader = () => {
    setShouldShowLoader(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("owasp-loader-exit"));
    }
  };

  // Keyboard shortcut to enter immediately
  useEffect(() => {
    if (!shouldShowLoader) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        dismissLoader();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shouldShowLoader]);

  // Handle auto-dismiss
  useEffect(() => {
    if (!shouldShowLoader) return;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setShouldShowLoader(false);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("owasp-loader-exit"));
      }
    }, 2450);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [shouldShowLoader]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Loader Overlay */}
      <AnimatePresence
        onExitComplete={() => {
          setDone(true);
          setIsLoaderComplete(true);
          sessionStorage.setItem("loaderShown", "true");
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("owasp-loader-complete"));
          }
        }}
      >
        {shouldShowLoader && (
          <motion.div
            key="owasp-brand-loader"
            className="fixed inset-0 z-[2147483647] flex cursor-pointer flex-col items-center justify-center bg-[#09090b] select-none"
            aria-hidden="true"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.025,
              filter: "blur(4px)",
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            }}
            onClick={dismissLoader}
          >
            {/* Ambient Soft White Radial Glow */}
            <motion.div
              className="pointer-events-none absolute rounded-full"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                width: "560px",
                height: "280px",
                background:
                  "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.03) 45%, transparent 70%)",
                filter: "blur(48px)",
              }}
            />

            {/* Central Badge Container */}
            <div
              className="relative z-10 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <QuantumBadge />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      <LoaderContext.Provider value={{ isLoaderComplete }}>
        <div
          className="relative min-h-screen w-full"
          style={{
            visibility: mounted ? "visible" : "hidden",
          }}
        >
          {children}
        </div>
      </LoaderContext.Provider>

      {/* Laser beam and shimmer keyframes */}
      <style>{`
        @keyframes border-beam-spin {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -540; }
        }
        @keyframes text-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-text-shimmer {
          background-size: 200% 100%;
          animation: text-shimmer 2.6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

// ---------------------------------------------------------------------------
// Quantum Badge (Winning Fusion Design)
// Perfectly centered, traveling border beam, metallic shimmer, smooth expansion
// ---------------------------------------------------------------------------
function QuantumBadge() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExpanded(true), 380);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* Pill Container with Traveling Laser Beam */}
      <motion.div
        animate={{
          width: expanded ? 336 : 224,
        }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 24,
          mass: 0.9,
        }}
        className="relative flex h-[64px] items-center justify-between overflow-hidden rounded-full border border-white/15 bg-zinc-950/95 px-5 shadow-[0_0_35px_rgba(255,255,255,0.09)] backdrop-blur-xl"
      >
        {/* Traveling Border Beam SVG */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full rounded-full">
          <defs>
            <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="42%" stopColor="#34d399" stopOpacity="0.38" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="58%" stopColor="#34d399" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect
            x="0.75"
            y="0.75"
            width="calc(100% - 1.5px)"
            height="calc(100% - 1.5px)"
            rx="31"
            fill="none"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.5"
          />
          <rect
            x="0.75"
            y="0.75"
            width="calc(100% - 1.5px)"
            height="calc(100% - 1.5px)"
            rx="31"
            fill="none"
            stroke="url(#beamGrad)"
            strokeWidth="2"
            strokeDasharray="140 400"
            style={{
              animation: "border-beam-spin 2.2s linear infinite",
            }}
          />
        </svg>

        {/* Left Emblem */}
        <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/owasp-icon.png"
            alt="OWASP Emblem"
            className="h-7 w-7 object-contain drop-shadow-[0_0_12px_rgba(52,211,153,0.35)]"
          />
        </div>

        {/* Center Brand Text */}
        <div className="relative z-10 ml-3.5 flex items-center pr-2 whitespace-nowrap">
          <span className="animate-text-shimmer bg-gradient-to-r from-zinc-300 via-white to-zinc-400 bg-clip-text text-xl font-bold tracking-[0.08em] text-transparent">
            OWASP
          </span>

          {/* Smooth horizontal expansion without vertical shift */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, width: 0, x: -8, filter: "blur(4px)" }}
                animate={{
                  opacity: 1,
                  width: "auto",
                  x: 0,
                  filter: "blur(0px)",
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center overflow-hidden pl-3 whitespace-nowrap"
              >
                <div className="mr-3 h-4 w-[1px] bg-white/25" />
                <span className="text-xs font-semibold tracking-[0.22em] text-zinc-200 uppercase">
                  VIT BHOPAL
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Subtitle anchored absolute below so it never alters the badge's vertical center */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 0.75, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.18, duration: 0.45 }}
            className="pointer-events-none absolute top-[calc(100%+14px)] text-[11px] font-medium tracking-[0.28em] whitespace-nowrap text-zinc-400 uppercase"
          >
            Student Chapter
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
