import React from "react";

interface ProjectCardProps {
  title: string;
  onClick?: () => void;
  ariaLabel?: string;
  selected?: boolean;
}

export default function ProjectCard({
  title,
  onClick,
  ariaLabel,
  selected = false,
}: ProjectCardProps) {
  // Cor de fundo do card (retângulo)
  const cardBg = selected ? "bg-[#418e77]" : "bg-[#1C3C33]";

  // Cor do título (texto)
  const titleColor = selected ? "text-[#021A1A]" : "text-cream";

  return (
    <div className="relative w-[263px] h-[263px] select-none">
      {/* Circular gradient background */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${
          selected
            ? "from-[#4BE3B5] to-[#021A1A]"
            : "from-[#094444] to-[#021A1A00]"
        } z-0`}
      />

      {/* Clickable rectangular card */}
      <button
        type="button"
        aria-label={ariaLabel || title}
        onClick={onClick}
        className={`${cardBg} z-10 absolute left-[70%] top-[20%] -translate-x-1/2 w-[218px] h-[242px] rounded-[19px] p-6 flex items-end justify-start shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-200 will-change-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-accent/60`}
      >
        <span
          className={`${titleColor} text-xl transition-colors duration-200`}
        >
          {title}
        </span>
      </button>

      
    </div>
  );
}
