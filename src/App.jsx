import React, { useState } from 'react';
import './App.css';
import './Solicitud/Solicitud.css'
import './ListaBooks/ListaBooks.css'
import './Solicitud/Solicitud.jsx'
import './ListaBooks/ListaBooks.jsx'
import Solicitud from './Solicitud/Solicitud.jsx';
import ListaBooks from './ListaBooks/ListaBooks.jsx';

function App() {
  const [page, setPage] = useState('home')

  const changePage = (page) =>{
    setPage(page)
    return page
  }

  return (

    <div className="App">
      {page == 'home' ? <Solicitud changePage={changePage}/> : <ListaBooks />} 
      
    </div>  
  );
}

export default App;
