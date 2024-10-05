/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import data from './vehicle.json'
import Wrapper from './src/components/Wrapper';
function App(){
  useEffect(()=>{
    
    // console.log(data)
  })
  return (
    <Wrapper/>
  )
}

export default App;