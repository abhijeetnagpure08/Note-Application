
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Signup } from './component/Signup';
import { Login } from './component/Login';
import { AddNote } from './component/AddNote';
import { Note } from './component/Note';
import { UpdateNote } from './component/UpdateNote';

function App() {
  return (
    <div className="App">
      <h1>Notes Taking Application</h1>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/createnote' element={<AddNote/>}/>
      <Route path='/notes' element={<Note/>}/>
      <Route path='/update/:noteID' element={<UpdateNote/>}/>
      </Routes>
    </div>
  );
}

export default App;
