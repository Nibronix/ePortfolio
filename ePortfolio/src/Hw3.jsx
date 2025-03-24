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
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [email, setEmail] = useState([]);
    const [birthday, setBirthday] = useState([]);
    const [gender, setGender] = useState([]);
    const [address, setAddress] = useState([]);
    const [city, setCity] = useState([]);
    const [country, setCountry] = useState([]);
    const [showPersonQuantity, setShowPersonQuantity] = useState(false);
    const [showPersonDetails, setShowPersonDetails] = useState(false);
    const [sex, setSex] = useState('');
    const [personQuantity, setPersonQuantity] = useState('');

    // Company
    const [companyName, setCompanyName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyCity, setCompanyCity] = useState('');
    const [companyCountry, setCompanyCountry] = useState('');
    const [showCompanyQuantity, setShowCompanyQuantity] = useState('');
    const [showCompanyDetails, setShowCompanyDetails] = useState('');
    const [companyQuantity, setCompanyQuantity] = useState('');

    const askPersonQuantity = () => {
        setShowPersonQuantity(true);
    }
    
    const handlePerson = () => {
        const gender = Math.round(Math.random());
        setShowPersonQuantity(false);

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
            
            const firstNames = data.data.map(person => person.firstname);
            const lastNames = data.data.map(person => person.lastname);
            const emails = data.data.map(person => person.email);
            const birthdays = data.data.map(person => person.birthday);
            const genders = data.data.map(person => person.gender);
            const addresses = data.data.map(person => person.address.street);
            const cities = data.data.map(person => person.address.city);
            const countries = data.data.map(person => person.address.country);
            
            setFirstName(firstNames);
            setLastName(lastNames);
            setEmail(emails);
            setBirthday(birthdays);
            setGender(genders);
            setAddress(addresses);
            setCity(cities);
            setCountry(countries);

            setShowPersonDetails(true);
            setShowCompanyDetails(false);
            setShowCompanyQuantity(false);
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
            setShowCompanyDetails(true);

        })
            
    }

    return (
        <>
            {showGradient && <div className="gradient-background-hw3" />}
            <Nav />
            <h1 className="fade-in" style={{marginTop: "5rem"}}>Homework 3<br/>Faker</h1>
            <p className="fade-in delay-1s">Fetch any fake data at the click of a button.</p>

            <div className="content" style = {{marginTop: "-8rem"}}>
                
                <button className="btn-hw3 fade-in delay-2s"
                    onClick={askPersonQuantity}
                    > Fake Person
                </button>

                <button className="btn-hw3 fade-in delay-2s"
                    onClick={handleCompany}
                    > Fake Company
                </button>

                <div style= {{marginTop: '2rem'}}>
                    {firstName.map((_, index) => (
                        <p key={index} className="fade-in" style={{ display: showPersonDetails ? 'block' : 'none'}}>
                            Name: {firstName[index]} {lastName[index]}
                            <br></br>
                            Email: {email[index]}
                            <br></br>
                            Birthday: {birthday[index]}
                            <br></br>
                            <span style={{ textTransform: 'capitalize' }}>Gender: {gender[index]}</span>
                            <br></br>
                            Address: {address[index]}, {city[index]}
                            <br></br>
                            {country[index]}
                        </p>
                    ))}


                    <p className= "fade-in" style ={{ display: showCompanyDetails ? 'block' : 'none'}}>
                        Company: {companyName}
                        <br></br>
                        Email: {companyEmail}
                        <br></br>
                        Address: {companyAddress}, {companyCity}
                        <br></br>
                        {companyCountry}
                    </p>

                    <form style={{ display: showPersonQuantity ? 'block' : 'none'}}>
                        <label>
                            How many people?
                            <input
                                className="form-control-hw3"
                                type="number"
                                value={personQuantity}
                                onChange={(e) => setPersonQuantity(e.target.value)}
                            />
                        </label>
                        <button
                            className="btn-hw3"
                            type="button"
                            onClick={handlePerson}
                        >
                            Submit
                        </button>
                    </form>

                </div>
                
            </div>


            <Footer />
        </>
    )
}

export default Hw3;