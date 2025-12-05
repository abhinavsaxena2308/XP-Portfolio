import React from 'react';
import { profile } from '../data/content';

const contactLinks = [
  {
    id: 'email',
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: '✉️',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: profile.linkedin.replace('https://', ''),
    href: profile.linkedin,
    icon: '🔗',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: profile.github.replace('https://', ''),
    href: profile.github,
    icon: '💻',
  },
];

export default function ContactContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {contactLinks.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 12px',
            background: '#f8f5e4',
            color: '#0a246a',
            textDecoration: 'none',
            border: '2px solid #ffffff',
            boxShadow: 'inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff',
          }}
        >
          <span style={{ fontSize: '16px' }}>{item.icon}</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 'bold' }}>{item.label}</span>
            <span style={{ fontSize: '11px', color: '#222222' }}>{item.value}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
