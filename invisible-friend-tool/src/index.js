import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";   //Importa las librerias para react router
import './sass/style';    //Importa todo el estilo
import reportWebVitals from './reportWebVitals';
import PreguntarNombres from './components/PreguntarNombres';
import TablaIncompatibilidades from './components/TablaIncompatibilidades';
import TablaAmigoInvisible from './components/TablaAmigoInvisble';
import FormularioEmail from './components/FormularioEmail';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/add-participant' element={<PreguntarNombres />} />
      <Route path='/incompatibility-table' element={<TablaIncompatibilidades />} />
      <Route path='/see-results' element={<TablaAmigoInvisible />} />
      <Route path='/send-email' element={<FormularioEmail />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
