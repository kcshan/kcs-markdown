import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DogShow = () => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetch, setFetch] = useState(false)
  const style = {
    width: 200
  }
  useEffect(() => {
    setLoading(true)
    axios.get('https://dog.ceo/api/breeds/image/random').then(result => {
      console.log(result)
      setUrl(result.data.message)
      setLoading(false)
    })
  }, [fetch])
  return (
    <>
      {loading ? <p>狗狗-读取中</p> : <img src={url} alt="dog" style={style} />}
      <button onClick={() => setFetch(!fetch)}>再来一张</button>
    </>
  )
}

export default DogShow