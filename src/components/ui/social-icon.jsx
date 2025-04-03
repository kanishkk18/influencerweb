import React from "react"



export function SocialIcon({ href, "aria-label": ariaLabel, icon, target, rel }) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={target}
      rel={rel}
      className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110"
    >
      {icon}
    </a>
  )
}


