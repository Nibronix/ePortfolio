import { useState, useEffect } from 'react';
import './App.css';
import Footer from './Footer.jsx';
import Nav from './Nav.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'
import './Hw2.css'

function SignUp() {
    const [showGradient, setShowGradient] = useState(false);

    const [states, setStates] = useState([]);
    const [counties, setCounties] = useState([]);
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [zipError, setZipError] = useState('');
    const [username, setUsername] = useState('');
    const [usernameAvailable, setUsernameAvailable] = useState(null);
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPasswordSuggestion, setShowPasswordSuggestion] = useState(false);
    const [passwordSuggestion, setPasswordSuggestion] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [showLatLong, setShowLatLong] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGradient(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const CENSUS_API = import.meta.env.VITE_REACT_APP_CENSUS_API;

    useEffect(() => {
        fetch(`https://api.census.gov/data/2019/acs/acs1?get=NAME&for=state:*&key=${CENSUS_API}`)
            .then(response => response.json())
            .then(data => {
                const stateNames = data.slice(1).map(item => ({ name: item[0], code: item[1] }));
                stateNames.sort((a, b) => a.name.localeCompare(b.name));
                setStates(stateNames);
            })
            .catch(error => console.error('Error fetching states:', error));
    }, [CENSUS_API]);

    const handleZipCodeChange = (e) => {
        const zip = e.target.value;
        setZipCode(zip);

        if (zip.length === 5) {
            fetch(`https://csumb.space/api/cityInfoAPI.php?zip=${zip}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Zip code not found.');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data === false) {
                        throw new Error('Zip code not found.');
                    }

                    setCity(data.city);
                    setLongitude(data.longitude);
                    setLatitude(data.latitude);
                    setZipError('');
                    setShowLatLong(true);
                })
                .catch(() => {
                    setCity('');
                    setLongitude('');
                    setLatitude('');
                    setZipError('Zip code not found. 🐽');
                    setShowLatLong(false);
                });
        } else {
            setCity('');
            setLongitude('');
            setLatitude('');
            setZipError('');
            setShowLatLong(false);
        }
    };

    const handleStateChange = (e) => {
        const stateCode = e.target.value;
        setSelectedState(stateCode);

        fetch(`https://api.census.gov/data/2019/acs/acs1?get=NAME&for=county:*&in=state:${stateCode}&key=${CENSUS_API}`)
            .then(response => response.json())
            .then(data => {
                const countyNames = data.slice(1).map(item => ({ name: item[0], code: item[2] }));
                countyNames.sort((a, b) => a.name.localeCompare(b.name));
                setCounties(countyNames);
            })
            .catch(error => console.error('Error fetching counties:', error));
    };

    const handleUsernameChange = (e) => {
        const user = e.target.value;
        setUsername(user);

        fetch(`https://csumb.space/api/usernamesAPI.php?username=${user}`)
            .then(response => response.json())
            .then(data => {
                setUsernameAvailable(!data.takenUsername);
            })
            .catch(error => {
                console.error('Error fetching username availability: ', error);
                setUsernameAvailable(false);
            })
    };

    const handlePasswordFocus = () => {
        setShowPasswordSuggestion(true);
        fetch('https://webspace.csumb.edu/~lara4594/ajax/suggestedPwd.php?length=8')
            .then(response => response.json())
            .then(data => {
                setPasswordSuggestion(data.password);
            })
            .catch(error => {
                console.error('Error fetching password suggestion URL: ', error);
                setPasswordSuggestion('Error fetching password suggestion');
            })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return;
        }

        if (password !== retypePassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        setPasswordError('');
        window.location.href = '/welcome';
    };

    return (
        <>  
            {showGradient && <div className="gradient-background-signup" />}
            <Nav />
            <div className="content">
                <h1 className="fade-in" style={{ marginTop: "5vh"}}>Sign Up</h1>
                <form className="fade-in delay-1s" onSubmit={handleSubmit}>
                    <div className='latLong' style={{ display: showLatLong ? 'block' : 'none'}}>
                        <p>Longitude: {longitude}</p>
                        <p>Latitude: {latitude}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="zipCode">Zip Code</label>
                        <input
                            type="text"
                            className="form-control-signup"
                            id="zipCode"
                            value={zipCode}
                            onChange={handleZipCodeChange}
                        />
                        {zipError && <p className="text-danger">{zipError}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            className="form-control-signup"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State</label>
                        <select className="form-control-signup" id="state" onChange={handleStateChange}>
                            <option value="">Select a state</option>
                            {states.map((state, index) => (
                                <option key={index} value={state.code}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="county">County</label>
                        <select className="form-control-signup" id="county">
                            <option value="">Select a county</option>
                            {counties.map((county, index) => (
                                <option key={index} value={county.code}>
                                    {county.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control-signup"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        {usernameAvailable === false && (
                            <p className="text-danger">Username is not available 🐽</p>
                        )}
                        {usernameAvailable === true && (
                            <p className="text-success">Username is available!</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control-signup"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={handlePasswordFocus}
                        />
                        {showPasswordSuggestion && (
                            <p>Suggested Password: {passwordSuggestion}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="retypePassword">Retype Password</label>
                        <input
                            type="password"
                            className="form-control-signup"
                            id="retypePassword"
                            value={retypePassword}
                            onChange={(e) => setRetypePassword(e.target.value)}
                        />
                    </div>
                    {passwordError && <small className="text-danger">{passwordError}</small>}
                    <button 
                        type="submit" 
                        className="btn-hw2 btn-primary mt-3"
                        onCLick={() => window.location.href ='/welcome'}
                    >
                        Submit
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default SignUp;