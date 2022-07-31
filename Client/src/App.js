import Home from './Components/Home';
import Graph from './Components/Graph';
import {Routes, Route} from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/search/:id" element={<Graph/>}/>

    </Routes>
    
    
  );
}

export default App;
