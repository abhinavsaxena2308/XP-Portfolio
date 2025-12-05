import React from 'react';
import { projects } from '../data/content';

export default function ProjectsContent() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px',
      }}
    >
      {projects.map((project) => (
        <div
          key={project.id}
          style={{
            border: '2px solid #ffffff',
            background: '#f5f2e1',
            boxShadow: 'inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              aspectRatio: '4/3',
              objectFit: 'cover',
              border: '1px solid #808080',
            }}
          />
          <div style={{ fontWeight: 'bold', color: '#0a246a' }}>{project.title}</div>
          <p style={{ margin: 0, fontSize: '11px', color: '#333333' }}>{project.description}</p>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            style={{
              alignSelf: 'flex-start',
              textDecoration: 'none',
              color: '#0a246a',
              background: '#ffffff',
              border: '1px solid #0a246a',
              padding: '4px 8px',
            }}
          >
            View Project
          </a>
        </div>
      ))}
    </div>
  );
}
