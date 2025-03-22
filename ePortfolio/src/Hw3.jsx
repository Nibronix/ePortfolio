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

    // Person
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [showPerson, setShowPerson] = useState('');
    const [sex, setSex] = useState('');
    const [personQuantity, setPersonQuantity] = useState('');

    // Company
    const [companyName, setCompanyName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyCity, setCompanyCity] = useState('');
    const [companyCountry, setCompanyCountry] = useState('');
    const [showCompany, setShowCompany] = useState('');
    
    const handlePerson = () => {
        const gender = Math.round(Math.random());

        if (gender === 0) {
            setSex("male");
        } else {
            setSex("female");
        }

        console.log("Sex: " + sex);
        console.log("Gender: " + gender);

        fetch(`https://fakerapi.it/api/v2/persons?_quantity=${personQuantity}&_gender=${sex}&_birthday_start=2005-01-01`)
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
            
            // Have sets for different quantity of people. {personQuantity}.
            
            setFirstName(data.data[0].firstname);
            setLastName(data.data[0].lastname);
            setEmail(data.data[0].email);
            setBirthday(data.data[0].birthday);
            setGender(data.data[0].gender);
            setAddress(data.data[0].address.street);
            setCity(data.data[0].address.city);
            setCountry(data.data[0].address.country);

            setShowPerson(true);
            setShowCompany(false);
        });
    }

    const handleCompany = () => {
        fetch(`https://fakerapi.it/api/v2/companies?_quantity=1`)
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

            setCompanyName(data.data[0].name);
            setCompanyEmail(data.data[0].email);
            setCompanyAddress(data.data[0].addresses[0].street + " " + data.data[0].addresses[0].streetName);
            setCompanyCity(data.data[0].addresses[0].city);
            setCompanyCountry(data.data[0].addresses[0].country);

            setShowPerson(false);
            setShowCompany(true);

        })
            
    }

    return (
        <>
            {showGradient && <div className="gradient-background-hw3" />}
            <Nav />
            <h1 className="fade-in" style={{marginTop: "5rem"}}>Homework 3<br/>Faker</h1>
            <p className="fade-in delay-1s">Fetch any fake data at the click of a button.</p>

            <div style = {{marginTop: "1rem"}}>
                <button className="btn-hw3 fade-in delay-2s"
                    onClick={handlePerson}
                    > Fake Person
                </button>

                <button className="btn-hw3 fade-in delay-2s"
                    onClick={handleCompany}
                    > Fake Company
                </button>

                <div style= {{marginTop: '2rem'}}>
                    <p className= "fade-in" style ={{ display: showPerson ? 'block' : 'none'}}>
                        Name: {firstName} {lastName}
                        <br></br>
                        Email: {email}
                        <br></br>
                        Birthday: {birthday}
                        <br></br>
                        <span style={{ textTransform: 'capitalize' }}>Gender: {gender}</span>
                        <br></br>
                        Address: {address}, {city}
                        <br></br>
                        {country}
                    </p>

                    <p className= "fade-in" style ={{ display: showCompany ? 'block' : 'none'}}>
                        Company: {companyName}
                        <br></br>
                        Email: {companyEmail}
                        <br></br>
                        Address: {companyAddress}, {companyCity}
                        <br></br>
                        {companyCountry}
                    </p>

                </div>
                
            </div>


            <Footer />
        </>
    )
}

export default Hw3;