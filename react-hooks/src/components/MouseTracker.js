import React, { useState, useEffect } from 'react'

const MouseTracker = () => {
  const [positions, setPositions] = useState({x: 0, y: 0})
  return (
  <p>X: {positions.x}, Y: {positions.y}</p>
  )
}

export default MouseTracker