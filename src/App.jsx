import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import WindowManager from './components/WindowManager';
import './styles/xp.css';

function App() {
  return (
    <div className="xp-desktop-layer">
      <Desktop />
      <WindowManager />
      <StartMenu />
      <Taskbar />
    </div>
  );
}

export default App;
