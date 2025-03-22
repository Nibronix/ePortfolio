import { useState, useEffect } from 'react';
import './App.css';
import './Hw3.css';
import Footer from './Footer.jsx';
import Nav from './Nav.jsx';

function Hw3() {
    const [showGradient, setShowGradient] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGradient(true);
        }, 2000);
    })

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    
    const handlePerson = (e) => {
        const gender = (Math.random() * 1)

        if (gender) {
            fetch(`https://fakerapi.it/api/v2/persons?_quantity=1&_gender=male&_birthday_start=2005-01-01`)
            .then(response => {
                if(!response.ok) {
                    throw new Error('Error fetching response.');
                }
                return response.json();
            })
            .then(data => {
                if (data === false) {
                    throw new Error('Error fetching data.');
                }

                setFirstName(data.data[0].firstname);
                setLastName(data.data[0].lastname);
                setEmail(data.data[0].email);
                setBirthday(data.data[0].birthday);
                setGender(data.data[0].gender);
                setAddress(data.data[0].address.street);
                setCity(data.data[0].address.city);
                setCountry(data.data[0].address.country);

                console.log(data);
            });
        }
    }

    return (
        <>
            {showGradient && <div className="gradient-background-hw3" />}
            <Nav />
            <h1 className="fade-in" style={{marginTop: "5rem"}}>Homework 3<br/>Faker</h1>
            <p className="fade-in delay-1s">Fetch any fake data at the click of a button.</p>

            <div className="content">
                <button
                    onClick={handlePerson}
                    > Fake Person
                </button>

                <p onChange={handlePerson}>
                    Name: {firstName} {lastName} 
                </p>
            </div>


            <Footer />
        </>
    )
}

export default Hw3;