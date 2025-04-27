import { Routes, Route } from 'react-router-dom';
import Form from './Form';  // Example Home component
import List from './List';  // List component

function App() {
    return (
        <Routes>
            <Route path="/" element={<Form />} />   {/* Home page */}
            <Route path="/list" element={<List />} />  {/* List page */}
        </Routes>
    );
}

export default App;