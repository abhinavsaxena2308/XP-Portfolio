import React, { useMemo } from 'react';
import Draggable from 'react-draggable';
import { useDesktopStore } from '../store/desktopStore';
import { useWindowStore } from '../store/windowStore';
import { desktopShortcuts } from '../data/content';
import DesktopIcon from './DesktopIcon';
import { useIsMobile } from '../hooks/useIsMobile';

function DesktopDraggableIcon({
  shortcut,
  position,
  selected,
  onSelect,
  onOpen,
  onDragStop,
  onDrag,
}) {
  const nodeRef = React.useRef(null);
  return (
    <Draggable
      nodeRef={nodeRef}
      grid={[20, 20]}
      position={position}
      bounds="parent"
      onDrag={(event, data) => onDrag({ x: data.x, y: data.y })}
      onStop={(event, data) => onDragStop({ x: data.x, y: data.y })}
    >
      <div ref={nodeRef} style={{ position: 'absolute' }}>
        <DesktopIcon
          label={shortcut.label}
          icon={shortcut.icon}
          selected={selected}
          onSelect={onSelect}
          onOpen={onOpen}
          isMobile={false}
        />
      </div>
    </Draggable>
  );
}

export default function Desktop() {
  const {
    selectedIcon,
    selectIcon,
    deselectIcon,
    iconPositions,
    setIconPosition,
  } = useDesktopStore();
  const { openWindow } = useWindowStore();
  const isMobile = useIsMobile();

  const positions = useMemo(() => {
    const defaults = desktopShortcuts.reduce((acc, shortcut, index) => {
      const fallback = { x: 32, y: 32 + index * 100 };
      acc[shortcut.id] = iconPositions[shortcut.id] || fallback;
      return acc;
    }, {});
    return defaults;
  }, [iconPositions]);

  const handleDesktopClick = () => {
    deselectIcon();
  };

  const handleOpenWindow = (shortcut) => {
    openWindow(shortcut.id, shortcut.label, shortcut.icon);
  };

  return (
    <div className="xp-desktop-area" onClick={handleDesktopClick}>
      {desktopShortcuts.map((shortcut) => {
        const isSelected = selectedIcon === shortcut.id;
        if (isMobile) {
          return (
            <div key={shortcut.id} style={{ width: '100%' }}>
              <DesktopIcon
                label={shortcut.label}
                icon={shortcut.icon}
                selected={isSelected}
                onSelect={() => selectIcon(shortcut.id)}
                onOpen={() => handleOpenWindow(shortcut)}
                isMobile
              />
            </div>
          );
        }

        return (
          <DesktopDraggableIcon
            key={shortcut.id}
            shortcut={shortcut}
            position={positions[shortcut.id]}
            selected={isSelected}
            onSelect={() => selectIcon(shortcut.id)}
            onOpen={() => handleOpenWindow(shortcut)}
            onDrag={(coords) => setIconPosition(shortcut.id, coords)}
            onDragStop={(coords) => setIconPosition(shortcut.id, coords)}
          />
        );
      })}
    </div>
  );
}
