import React, { useEffect } from 'react';
import { useDesktopStore } from '../store/desktopStore';
import { useWindowStore } from '../store/windowStore';
import { profile, desktopShortcuts } from '../data/content';

export default function StartMenu() {
  const { startMenuOpen, closeStartMenu } = useDesktopStore();
  const { openWindow, closeAllWindows } = useWindowStore();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (startMenuOpen && !e.target.closest('.xp-start-menu') && !e.target.closest('.xp-start-button')) {
        closeStartMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [startMenuOpen, closeStartMenu]);

  if (!startMenuOpen) return null;

  const primaryItems = desktopShortcuts.filter((item) => ['projects', 'certificates', 'resume'].includes(item.id));
  const secondaryItems = desktopShortcuts.filter((item) => ['about', 'contact'].includes(item.id));

  const handleMenuItemClick = (shortcut) => {
    openWindow(shortcut.id, shortcut.label, shortcut.icon);
    closeStartMenu();
  };

  const handleAllPrograms = () => {
    openWindow('projects', 'My Projects', '📁');
    closeStartMenu();
  };

  const handleLogOff = () => {
    closeAllWindows();
    closeStartMenu();
  };

  const handleShutdown = () => {
    closeAllWindows();
    closeStartMenu();
  };

  return (
    <div className="xp-start-menu">
      <div className="xp-start-menu-shell">
        <div className="xp-start-menu-header">
          <div className="xp-start-menu-avatar">
            <img src={profile.photo} alt={`${profile.name} avatar`} />
          </div>
          <div>
            <div className="xp-start-menu-username">{profile.name}</div>
            <div className="xp-start-menu-strapline">{profile.title}</div>
          </div>
        </div>

        <div className="xp-start-menu-body">
          <div className="xp-start-menu-left">
            <div className="xp-start-menu-section-title">Portfolio</div>
            {primaryItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="xp-start-menu-item"
                onClick={() => handleMenuItemClick(item)}
              >
                <span className="xp-start-menu-item-icon" aria-hidden>{item.icon}</span>
                <span className="xp-start-menu-item-text">
                  <span>{item.label}</span>
                  <span className="xp-start-menu-item-sub">Open {item.label.toLowerCase()}</span>
                </span>
              </button>
            ))}

            <button type="button" className="xp-start-menu-all-programs" onClick={handleAllPrograms}>
              All Programs
              <span aria-hidden>▶</span>
            </button>
          </div>

          <div className="xp-start-menu-right">
            <div className="xp-start-menu-section-title">Contact</div>
            {secondaryItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="xp-start-menu-item"
                onClick={() => handleMenuItemClick(item)}
              >
                <span className="xp-start-menu-item-icon" aria-hidden>{item.icon}</span>
                <span className="xp-start-menu-item-text">
                  <span>{item.label}</span>
                  <span className="xp-start-menu-item-sub">{item.id === 'contact' ? profile.email : 'View details'}</span>
                </span>
              </button>
            ))}

            <hr className="xp-start-menu-divider" />
            <button type="button" className="xp-start-menu-item" onClick={handleLogOff}>
              <span className="xp-start-menu-item-icon" aria-hidden>🔒</span>
              <span className="xp-start-menu-item-text">
                <span>Log Off</span>
                <span className="xp-start-menu-item-sub">Close windows</span>
              </span>
            </button>
          </div>
        </div>

        <div className="xp-start-menu-footer">
          <button type="button" className="xp-start-footer-button" onClick={handleLogOff}>
            <span aria-hidden>⇦</span>
            Log Off
          </button>
          <button type="button" className="xp-start-footer-button shutdown" onClick={handleShutdown}>
            <span aria-hidden>⏻</span>
            Turn Off Computer
          </button>
        </div>
      </div>
    </div>
  );
}
