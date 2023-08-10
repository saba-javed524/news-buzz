import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  let pageSize = 9;
  let country = 'in';
  let apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const [progress, setProgress] = useState(0)

  const setProgressFunc = (progress) => {
    setProgress(progress);
  }

  return (
    <div>
      <NavBar />
      <LoadingBar
        color='red'
        height={3}
        waitingTime={1500}
        progress={progress}
      // onLoaderFinished={progress}
      />
      {/* <NewsapiKey={apiKey} setProgress = {setProgress}  pageSize={pageSize} country="in" category="sports" /> */}
      <Routes>
        <Route exact path='/' element={<News apiKey={apiKey} setProgress={setProgressFunc} key="general" pillColor="success" pageSize={pageSize} country={country} category="general" />}></Route>
        <Route exact path='/business' element={<News apiKey={apiKey} setProgress={setProgressFunc} key="business" pillColor="primary" pageSize={pageSize} country={country} category="business" />}></Route>
        <Route exact path='/entertainment' element={<News apiKey={apiKey} setProgress={setProgressFunc} key="entertainment" pillColor="danger" pageSize={pageSize} country={country} category="entertainment" />}></Route>
        <Route exact path='/health' element={<News apiKey={apiKey} setProgress={setProgressFunc} key="health" pillColor="info" pageSize={pageSize} country={country} category="health" />}></Route>
        <Route exact path='/science' element={<News apiKey={apiKey} setProgress={setProgressFunc} key="science" pillColor="warning" pageSize={pageSize} country={country} category="science" />}></Route>
        <Route exact path='/sports' element={<News apiKey={apiKey} setProgress={setProgressFunc} key="sports" pillColor="danger" pageSize={pageSize} country={country} category="sports" />}></Route>
        <Route exact path='/technology' element={<News apiKey={apiKey} setProgress={setProgressFunc} key="technology" pillColor="warning" pageSize={pageSize} country={country} category="technology" />}></Route>
      </Routes>
    </div>
  )
}

export default App;