import React from 'react';
import { profile } from '../data/content';

export default function ResumeContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <iframe
        title="Resume Preview"
        src={profile.resume}
        style={{
          width: '100%',
          height: '320px',
          border: '2px solid #0a246a',
          background: 'white',
        }}
      />
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span role="img" aria-label="resume">📄</span>
        <a
          className="xp-button"
          href={profile.resume}
          download
        >
          Download Resume
        </a>
      </div>
    </div>
  );
}
