import React, { useState } from 'react'
import LikeButton from './components/LikeButton'
import MouseTracker from './components/MouseTracker'
import DogShow from './components/DogShow'
import useMousePosition from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'
import './App.css';

const DogShowWithHook = () => {
  const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random')
  const style = {
    width: 200
  }
  return (
    <>
      {loading ? <p>狗狗-读取中</p> : <img src={data && data.message} alt="dog" style={style} />}
    </>
  )
}

const CatShowWithHook = () => {
  const [category, setCategory] = useState('1')
  const [data, loading] = useURLLoader(`https://api.thecatapi.com/v1/images/search?limit=1&category_ids=${category}`)
  const style = {
    width: 200
  }
  return (
    <>
      {loading ? <p>猫猫-读取中</p> : <img src={data && data[0].url} alt="cat" style={style} />}
      <button onClick={() => setCategory('1')}>帽子</button>
      <button onClick={() => setCategory('5')}>盒子</button>
    </>
  )
}

function App() {
  const positions = useMousePosition()
  return (
    <div className="App">
      <h1>x: {positions.x}</h1>
      <MouseTracker />
      <LikeButton />
      <br/>
      {/* <DogShow /> */}
      <DogShowWithHook />
      <br/>
      <CatShowWithHook />
    </div>
  );
}

export default App;
