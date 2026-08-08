export function SteppedDivider() {
  return (
    <div className="stepped-divider" aria-hidden="true">
      <svg viewBox="0 0 480 24" preserveAspectRatio="none" className="stepped-divider-svg">
        <path
          d="M0 12 H40 L52 4 H92 L104 12 H144 L156 4 H196 L208 12 H248 L260 20 H300 L312 12 H352 L364 4 H404 L416 12 H480"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="240" cy="12" r="3.5" fill="currentColor" />
      </svg>
    </div>
  );
}
