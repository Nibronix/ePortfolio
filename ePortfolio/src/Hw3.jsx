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
    const [personQuantity, setPersonQuantity] = useState('');

    // Company
    const [companyName, setCompanyName] = useState([]);
    const [companyEmail, setCompanyEmail] = useState([]);
    const [companyAddress, setCompanyAddress] = useState([]);
    const [companyCity, setCompanyCity] = useState([]);
    const [companyCountry, setCompanyCountry] = useState([]);
    const [showCompanyQuantity, setShowCompanyQuantity] = useState(false);
    const [showCompanyDetails, setShowCompanyDetails] = useState(false);
    const [companyQuantity, setCompanyQuantity] = useState('');

    const askPersonQuantity = () => {
        setShowPersonQuantity(true);
    }

    const hidePerson = () => {
        setShowPersonDetails(false);
        setShowPersonQuantity(false);
    }
    
    const handlePerson = () => {
        setShowPersonQuantity(false);

        fetch(`https://fakerapi.it/api/v2/persons?_quantity=${personQuantity}`)
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
        setShowCompanyQuantity(false);

        fetch(`https://fakerapi.it/api/v2/companies?_quantity=${companyQuantity}`)
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

            const companyNames = data.data.map(company => company.name);
            const companyEmails = data.data.map(company => company.email);
            const companyAddresses = data.data.map(company => company.addresses[0].street);
            const companyCities = data.data.map(company => company.addresses[0].city);
            const companyCountries = data.data.map(company => company.addresses[0].country);

            setCompanyName(companyNames);
            setCompanyEmail(companyEmails);
            setCompanyAddress(companyAddresses);
            setCompanyCity(companyCities);
            setCompanyCountry(companyCountries);

            setShowCompanyDetails(true);
        })
            
    }

    const askCompanyQuantity = () => {
        setShowCompanyQuantity(true);
    }

    const hideCompany = () => {
        setShowCompanyDetails(false);
        setShowCompanyQuantity(false);
    }

    return (
        <>
            {showGradient && <div className="gradient-background-hw3" />}
            <Nav />
            <h1 className="fade-in" style={{marginTop: "5rem", display: showPersonDetails || showCompanyDetails ? 'none' : 'block' }}>Homework 3<br/>Faker</h1>
            <p className="fade-in delay-1s" style={{ display: showPersonDetails || showCompanyDetails ? 'none' : 'block' }}>Fetch fake data at the click of a button.</p>

            <div style={{paddingTop: '5rem'}}>
                
                <button className="btn-hw3 fade-in delay-2s" style={{ display: showPersonDetails || showCompanyDetails ? 'none' : 'inline' }}
                    onClick={askPersonQuantity}
                    > Fake Person
                </button>

                <button className="btn-hw3 fade-in delay-2s" style={{ display: showPersonDetails || showCompanyDetails ? 'none' : 'inline' }}
                    onClick={askCompanyQuantity}
                    > Fake Company
                </button>

                <div className="details-wrapper-hw3">
                    {firstName.map((_, index) => (
                        <p key={index} style={{ display: showPersonDetails ? 'block' : 'none', height: 'auto'}}>
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

                    {companyName.map((name, index) => (
                        <p key={index} className= "fade-in" style ={{ display: showCompanyDetails ? 'block' : 'none'}}>
                            Company: {name}
                            <br></br>
                            Email: {companyEmail[index]}
                            <br></br>
                            Address: {companyAddress[index]}, {companyCity[index]}
                            <br></br>
                            {companyCountry[index]}
                        </p>
                    ))}
                    

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

                    <form style={{ display: showCompanyQuantity ? 'block' : 'none'}}>
                        <label>
                            How many companies?
                            <input
                                className="form-control-hw3"
                                type="number"
                                value={companyQuantity}
                                onChange={(e) => setCompanyQuantity(e.target.value)}
                            />
                        </label>
                        <button
                            className="btn-hw3"
                            type="button"
                            onClick={handleCompany}
                        >
                            Submit
                        </button>
                    </form>

                </div>

                <form style={{ display:showPersonDetails ? 'block' : 'none'}}>
                        <button
                            className="btn-hw3"
                            type="button"
                            onClick={hidePerson}
                        >
                            Back
                        </button>
                </form>

                <form style={{ display:showCompanyDetails ? 'block' : 'none'}}>
                        <button
                            className="btn-hw3"
                            type="button"
                            onClick={hideCompany}
                        >
                            Back
                        </button>
                </form>
                
            </div>


            <Footer />
        </>
    )
}

export default Hw3;