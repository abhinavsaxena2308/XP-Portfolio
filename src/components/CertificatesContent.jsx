import React from 'react';
import { certificates } from '../data/content';

export default function CertificatesContent() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '12px',
      }}
    >
      {certificates.map((certificate) => (
        <figure
          key={certificate.id}
          style={{
            margin: 0,
            background: '#f8f5e4',
            border: '2px solid #ffffff',
            boxShadow: 'inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff',
            padding: '8px',
          }}
        >
          <img
            src={certificate.image}
            alt={certificate.title}
            style={{
              width: '100%',
              objectFit: 'cover',
              border: '1px solid #808080',
            }}
          />
          <figcaption style={{ marginTop: '8px' }}>
            <div style={{ fontWeight: 'bold', color: '#0a246a' }}>{certificate.title}</div>
            <div style={{ fontSize: '11px', color: '#333333' }}>{certificate.issuer}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
