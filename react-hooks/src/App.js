import LikeButton from './components/LikeButton'
import MouseTracker from './components/MouseTracker'
import DogShow from './components/DogShow'
import useMousePosition from './hooks/useMousePosition'
import './App.css';

function App() {
  const positions = useMousePosition()
  return (
    <div className="App">
      <h1>x: {positions.x}</h1>
      <MouseTracker />
      <LikeButton />
      <br/>
      <DogShow />
    </div>
  );
}

export default App;
