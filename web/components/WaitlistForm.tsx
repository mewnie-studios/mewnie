"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Oops! Something went wrong joining the waitlist.");
      }
    } catch (err) {
      console.error(err);
      alert("Uh oh! We couldn't connect. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="px-6 py-4 rounded-full bg-white/80 backdrop-blur-md text-green-700 font-semibold border border-white/50 text-center shadow-lg animate-in fade-in zoom-in duration-300">
        🎉 You're on the list! Keep an eye on your inbox.
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center bg-white/60 backdrop-blur-md rounded-full shadow-xl border border-white/50 p-1.5 md:p-2 w-full transition-all focus-within:bg-white/90 focus-within:shadow-2xl hover:bg-white/80"
    >
      <input
        type="email"
        placeholder="Enter your email to join the waitlist..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-transparent px-4 py-2 md:py-3 text-black placeholder:text-gray-600 focus:outline-none text-sm md:text-base font-medium"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-2 md:px-8 md:py-3 rounded-full bg-[#756281] text-white text-sm md:text-base font-bold hover:bg-[#5a4864] transition-all hover:scale-105 active:scale-95 whitespace-nowrap shadow-md disabled:opacity-70 disabled:hover:scale-100"
      >
        {isLoading ? "Joining..." : "Join"}
      </button>
    </form>
  );
}
