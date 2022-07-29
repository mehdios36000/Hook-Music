import Home from './Components/Home';
import Graph from './Components/Graph';
import {Routes, Route} from 'react-router-dom';
var data = require("./Components/MOCK_DATA_SLIDER.json");

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/search/:id" element={<Graph slides={data}/>}/>
    </Routes>
    
    
  );
}

export default App;
