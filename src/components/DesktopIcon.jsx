import React from 'react';

export default function DesktopIcon({
  label,
  icon,
  selected,
  onSelect,
  onOpen,
  isMobile,
}) {
  const handleClick = (event) => {
    event.stopPropagation();
    onSelect?.();
    if (isMobile) {
      onOpen?.();
    }
  };

  const handleDoubleClick = (event) => {
    event.stopPropagation();
    onOpen?.();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onOpen?.();
    }
  };

  return (
    <div
      className={`xp-desktop-icon ${selected ? 'selected' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="xp-desktop-icon-image" aria-hidden>{icon}</div>
      <div className="xp-desktop-icon-label">{label}</div>
    </div>
  );
}
