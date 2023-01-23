import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Invoice() {
    const location = useLocation();
    const navigate = useNavigate()
    const [country, setCountry] = useState([]);
    const [countryvalue, setCountryValue] = useState([]);
    const [state, setState] = useState([]);
    const [statevalue, setStateValue] = useState([]);
    const [city, setCity] = useState([]);
    const [formvalues, setFormValues] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        country: "",
        state: "",
        city: "",
    });
    const [error, setError] = useState(null);

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    useEffect(() => {
        axios.get("https://countriesnow.space/api/v0.1/countries")
            .then((res) => {
                setCountry(res.data.data)
            }
            )
    }, []);
    function callbackMethod(event) {
        setCountryValue(event.target.value);
        const { name, value } = event.target;
        setFormValues((prev) => {
            return { ...prev, [name]: value }
        })
    }
    useEffect(() => {
        axios.post("https://countriesnow.space/api/v0.1/countries/states", {
            "country": countryvalue
        }).then((response) => {
            setState(response.data.data.states)
        }
        )
    }, [countryvalue])
    function callbackMethods(event) {
        setStateValue(event.target.value);
        const { name, value } = event.target;
        setFormValues((prev) => {
            return { ...prev, [name]: value }
        })
    }
    useEffect(() => {
        axios.post("https://countriesnow.space/api/v0.1/countries/state/cities", {
            "country": countryvalue,
            "state": statevalue
        }).then((res) => {
            setCity(res.data.data)
        }
        )
    }, [countryvalue, statevalue])
    function handleinputvalues(event) {
        const { name, value } = event.target;
        setFormValues((prev) => {
            return { ...prev, [name]: value }
        })
        if (!isValidEmail(event.target.value)) {
            setError('Email is invalid');
        } else {
            setError(null);
        }
    }
    function handleSubmit(event) {
        event.preventDefault();
        console.log(formvalues);
        navigate("/thanks");
    }
    return (
        <>
        <h1 className='home-div'>INVOICE</h1>
            <div>
                <table>
                    <tr>
                        <th>Type</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Sub Total</th>
                    </tr>
                    <tr>
                        <td>{location.state.id[0].type}</td>
                        <td><img src={location.state.id[0].image} alt="" className='img' /></td>
                        <td>{location.state.id[0].name}</td>
                        <td>{location.state.id[0].price}/Rs</td>
                        <td>{location.state.id3}</td>
                        <td>{location.state.id2}/Rs</td>
                    </tr>
                </table>
            </div>
            <form onSubmit={handleSubmit} >
                <label >First Name</label>
                <input
                    type="text"
                    autoComplete='off'
                    placeholder='Enter First Name'
                    name='fname'
                    onChange={handleinputvalues}
                />
                <label >Last Name</label>
                <input type="text"
                    autoComplete='off'
                    placeholder='Enter Last Name'
                    name='lname'
                    onChange={handleinputvalues}
                />
                <label >Phone Number</label>
                <input type="text"
                    autoComplete='off'
                    placeholder='Enter Phone Number'
                    name='phone'
                    onChange={handleinputvalues}
                />
                <label >Email Address</label>
                <input type="text"
                    autoComplete='off'
                    placeholder='Enter Email Address'
                    name='email'
                    onChange={handleinputvalues}
                />
                <span style={{ color: 'red' }}>{error}</span><br></br>
                <label>Select Country</label>
                <select onChange={callbackMethod} name='country'>
                    <option>Select Country</option>
                    {
                        country.map((con, id) => {
                            return (
                                <option
                                    key={id}>{con.country}
                                </option>
                            )
                        })
                    }
                </select>
                <label>Select State</label>
                <select onChange={callbackMethods} name='state'>
                    <option>Select State</option>
                    {
                        state.map((st, id) => {
                            return (
                                <option
                                    key={id} >{st.name}
                                </option>
                            )
                        })
                    }
                </select>
                <label>Select City</label>
                <select name='city' onChange={handleinputvalues}>
                    <option>Select City</option>
                    {
                        city.map((cities, id) => {
                            return (
                                <option
                                    key={id} >{cities}
                                </option>
                            )
                        })
                    }
                </select>
                <input type='submit' />
            </form>
        </>
    )
}
