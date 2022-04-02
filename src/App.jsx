import './App.css';
import { Navbar } from './Components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Components/Home';
import {TodoDetails} from './Components/TodoDetails';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/todos/:id' element={<TodoDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;