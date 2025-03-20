import { useState, useEffect } from 'react';
import './App.css';
import Footer from './footer.jsx';
import Nav from './Nav.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUp() {
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
            fetch(`https://api.zippopotam.us/us/${zip}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Zip code not found.');
                    }
                    return response.json();
                })
                .then(data => {
                    setCity(data.places[0]['place name']);
                    setLongitude(data.places[0].longitude);
                    setLatitude(data.places[0].latitude);
                    setZipError('');
                })
                .catch(error => {
                    setCity('');
                    setLongitude('');
                    setLatitude('');
                    setZipError('Zip code not found');
                });
        } else {
            setCity('');
            setLongitude('');
            setLatitude('');
            setZipError('');
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

        setTimeout(() => {
            if (user === 'takenUsername') {
                setUsernameAvailable(false);
            } else {
                setUsernameAvailable(true);
            }
        }, 500);
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
            <Nav />
            <div className="container mt-5">
                <h1 className="text-center" style={{ marginTop: "10vh"}}>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="zipCode" style={{ marginTop: "2vh"}}>Zip Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="zipCode"
                            value={zipCode}
                            onChange={handleZipCodeChange}
                        />
                        {zipError && <small className="text-danger">{zipError}</small>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            value={city}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="longitude">Longitude</label>
                        <input
                            type="text"
                            className="form-control"
                            id="longitude"
                            value={longitude}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="latitude">Latitude</label>
                        <input
                            type="text"
                            className="form-control"
                            id="latitude"
                            value={latitude}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State</label>
                        <select className="form-control" id="state" onChange={handleStateChange}>
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
                        <select className="form-control" id="county">
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
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        {usernameAvailable === false && (
                            <small className="text-danger">Username is not available</small>
                        )}
                        {usernameAvailable === true && (
                            <small className="text-success">Username is available</small>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={handlePasswordFocus}
                        />
                        {showPasswordSuggestion && (
                            <p>{passwordSuggestion}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="retypePassword">Retype Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="retypePassword"
                            value={retypePassword}
                            onChange={(e) => setRetypePassword(e.target.value)}
                        />
                    </div>
                    {passwordError && <small className="text-danger">{passwordError}</small>}
                    <button type="submit" className="btn btn-primary mt-3">
                        Submit
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default SignUp;