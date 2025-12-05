import React from 'react';
import { profile } from '../data/content';

export default function AboutContent() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '160px 1fr',
        gap: '16px',
      }}
    >
      <div
        style={{
          width: '160px',
          height: '160px',
          border: '2px solid #ffffff',
          boxShadow: 'inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff',
          overflow: 'hidden',
        }}
      >
        <img
          src={profile.photo}
          alt={profile.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>
          <h2
            style={{
              margin: 0,
              color: '#0a246a',
              fontSize: '16px',
            }}
          >
            {profile.name}
          </h2>
          <div style={{ fontSize: '12px', color: '#333333' }}>{profile.title}</div>
          <div style={{ fontSize: '11px', color: '#555555' }}>{profile.location}</div>
        </div>
        <p style={{ margin: 0, fontSize: '12px', whiteSpace: 'pre-line', color: '#111111' }}>
          {profile.bio}
        </p>
      </div>
    </div>
  );
}
