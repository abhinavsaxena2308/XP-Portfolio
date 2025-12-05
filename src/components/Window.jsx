import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useWindowStore } from '../store/windowStore';

export default function Window({ window: win, children }) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowStore();
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState(null);
  const nodeRef = useRef(null);

  const handleMinimize = () => {
    minimizeWindow(win.id);
  };

  const handleMaximize = () => {
    maximizeWindow(win.id);
  };

  const handleClose = () => {
    closeWindow(win.id);
  };

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      focusWindow(win.id);
    }
  };

  const handleTitleDoubleClick = () => {
    maximizeWindow(win.id);
  };

  const handleResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (win.maximized) return;
    setIsResizing(true);
    setResizeStart({ x: e.clientX, y: e.clientY, width: win.width, height: win.height });
  };

  const handleMouseMove = (e) => {
    if (isResizing && resizeStart) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      const newWidth = Math.max(300, resizeStart.width + deltaX);
      const newHeight = Math.max(200, resizeStart.height + deltaY);
      updateWindowSize(win.id, newWidth, newHeight);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, resizeStart, win.id]);

  if (win.minimized) return null;

  const style = {
    width: win.maximized ? '100vw' : `${win.width}px`,
    height: win.maximized ? 'calc(100vh - 28px)' : `${win.height}px`,
    top: win.maximized ? 0 : undefined,
    left: win.maximized ? 0 : undefined,
    zIndex: win.zIndex,
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".xp-window-title-bar"
      position={win.maximized ? { x: 0, y: 0 } : { x: win.x, y: win.y }}
      onDrag={(e, data) => {
        if (!win.maximized) {
          updateWindowPosition(win.id, data.x, data.y);
        }
      }}
      onStop={(e, d) => {
        if (!win.maximized) {
          updateWindowPosition(win.id, d.x, d.y);
        }
      }}
      disabled={win.maximized}
    >
      <div
        className="xp-window"
        style={style}
        onMouseDown={handleMouseDown}
        ref={nodeRef}
      >
        <div className="xp-window-title-bar" onDoubleClick={handleTitleDoubleClick}>
          <div className="xp-window-title-text">
            <span>{win.icon}</span>
            <span>{win.title}</span>
          </div>
          <div className="xp-window-buttons">
            <button
              className="xp-window-button"
              onClick={handleMinimize}
              title="Minimize"
            >
              _
            </button>
            <button
              className="xp-window-button"
              onClick={handleMaximize}
              title="Maximize"
            >
              □
            </button>
            <button
              className="xp-window-button"
              onClick={handleClose}
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="xp-window-content">
          {children}
        </div>
        {!win.maximized && (
          <div
            onMouseDown={handleResizeStart}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '16px',
              height: '16px',
              cursor: 'nwse-resize',
              background: 'linear-gradient(135deg, transparent 0%, transparent 50%, #808080 50%, #808080 100%)',
            }}
          />
        )}
      </div>
    </Draggable>
  );
}
