import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
function App() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://ec2-34-239-128-56.compute-1.amazonaws.com:8000/actors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ first_name: firstName, last_name: lastName }),
        });
        if (response.ok) {
            setMessage('Actor guardado exitosamente!');
        }
        else {
            setMessage('Hubo un problema al guardar el actor.');
        }
    };
    return (_jsxs("div", { className: "container", children: [_jsx("h1", { children: "Registrar Actor" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { children: "First Name:" }), _jsx("input", { type: "text", value: firstName, onChange: (e) => setFirstName(e.target.value), required: true })] }), _jsxs("div", { children: [_jsx("label", { children: "Last Name:" }), _jsx("input", { type: "text", value: lastName, onChange: (e) => setLastName(e.target.value), required: true })] }), _jsx("button", { type: "submit", children: "Guardar" })] }), message && _jsx("p", { children: message })] }));
}
export default App;
