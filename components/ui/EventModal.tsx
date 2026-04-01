"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IEvent {
  slug?: string;
  title: string;
  date: string;
  description: string;
  link?: string;
  imgUrl?: string;
  gallery?: string[];
  time?: string;
  venue?: string;
  mode?: string;
  status?: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: IEvent | null;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, event }) => {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen || !event) return null;

  const galleryImages = event.gallery && event.gallery.length > 0 
    ? event.gallery 
    : (event.imgUrl ? [event.imgUrl] : []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-white/20 transition-all"
            >
              <X size={24} />
            </button>

            {/* Header Image (Cover) */}
            <div className="relative w-full h-48 sm:h-64 md:h-80 shrink-0">
               <Image
                 src={event.imgUrl || "/members/placeholder.png"}
                 alt={event.title}
                 fill
                 className="object-cover"
                 priority
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>

            {/* Content Container */}
            <div className="p-6 md:p-8 space-y-6">
              
              {/* Header Info */}
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">{event.title}</h2>
                <div className="flex flex-wrap gap-4 text-sm md:text-base text-white/70">
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>
                  {event.time && (
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      <Clock size={16} />
                      <span>{event.time}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <MapPin size={16} />
                    <span>{event.venue || "VIT Bhopal University"}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="text-white/80 leading-relaxed text-lg whitespace-pre-wrap">
                {event.description}
              </div>

              {event.slug && (
                <div className="pt-2">
                  <Link
                    href={`/events/${event.slug}`}
                    onClick={onClose}
                    className="inline-flex h-10 items-center justify-center rounded-xl bg-white text-black px-6 text-sm font-bold transition hover:bg-white/90 hover:scale-105 active:scale-95"
                  >
                    View Full Event Details
                  </Link>
                </div>
              )}

              {/* Gallery Section */}
              {galleryImages.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-xl font-semibold text-white">Event Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((img: string, idx: number) => (
                      <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                        <Image 
                          src={img} 
                          alt={`Gallery image ${idx + 1}`} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EventModal;
