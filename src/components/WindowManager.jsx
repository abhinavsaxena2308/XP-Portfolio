import React from 'react';
import { useWindowStore } from '../store/windowStore';
import Window from './Window';
import ProjectsContent from './ProjectsContent';
import CertificatesContent from './CertificatesContent';
import ResumeContent from './ResumeContent';
import AboutContent from './AboutContent';
import ContactContent from './ContactContent';

const windowContentMap = {
  projects: ProjectsContent,
  certificates: CertificatesContent,
  resume: ResumeContent,
  about: AboutContent,
  contact: ContactContent,
};

export default function WindowManager() {
  const { windows } = useWindowStore();

  if (!windows.length) {
    return null;
  }

  return (
    <>
      {windows.map((win) => {
        const Content = windowContentMap[win.id];
        return (
          <Window key={win.id} window={win}>
            {Content ? <Content /> : <div>No content available.</div>}
          </Window>
        );
      })}
    </>
  );
}
