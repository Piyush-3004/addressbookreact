import logo from './logo.svg';
import './App.css';
import ContactList from './content/ContactList'
import ContactForm from './content/ContactForm'
import { Routes,Route } from 'react-router-dom';
import ContactListClass from './content/ContactListClass';

function App() {
  return (

    <Routes>
      <Route path="/listfunction" element={< ContactList />} />
      <Route path="/form" element={< ContactForm />} />
      <Route path='/' element={<ContactListClass />} />
      <Route path="/form/:id" element={< ContactForm />} />
    </Routes>
  );
}

export default App;
