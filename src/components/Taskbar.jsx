import React, { useState, useEffect } from 'react';
import { useWindowStore } from '../store/windowStore';
import { useDesktopStore } from '../store/desktopStore';

export default function Taskbar() {
  const { windows, minimizeWindow, focusWindow, activeWindowId } = useWindowStore();
  const { toggleStartMenu } = useDesktopStore();
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTaskbarItemClick = (windowId) => {
    const window = windows.find((w) => w.id === windowId);
    if (!window) return;
    if (!window.minimized && activeWindowId === windowId) {
      minimizeWindow(windowId);
      return;
    }
    if (window.minimized) {
      minimizeWindow(windowId);
    }
    focusWindow(windowId);
  };

  return (
    <div className="xp-taskbar">
      <button className="xp-start-button" onClick={toggleStartMenu}>
        🪟 Start
      </button>
      <div className="xp-taskbar-items">
        {windows.map((window) => (
          <div
            key={window.id}
            className={`xp-taskbar-item ${activeWindowId === window.id && !window.minimized ? 'active' : ''}`}
            onClick={() => handleTaskbarItemClick(window.id)}
          >
            <span>{window.icon}</span>
            <span>{window.title}</span>
          </div>
        ))}
      </div>
      <div className="xp-taskbar-clock">{time}</div>
    </div>
  );
}
