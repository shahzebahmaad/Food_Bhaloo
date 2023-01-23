import React, { useState } from 'react';
import {  useNavigate } from "react-router-dom";
import Menu from './Menu.json';

export default function Home() {
    const [val, setVal] = useState(Menu);
    const [filtervalue, setFilterValue] = useState([]);
    const [handlefilter, setHandleFilter] = useState('');
    const [btn, setBtn] = useState(true);
    // var i = 1;

    // Filtering JSON File Array Of Objects & Getting Unique Values Of Types

    const unique = [...new Set(Menu.map(obj => obj.type))]


    //Filtering JSON File Array Of Objects & Getting Values of Selected Types
    function handler(event) {
        const selectedtype = event.target.value;
        const newarr = Menu.filter(ele => {
            return (
                ele.type === selectedtype
            )
        });
        setVal(newarr);
        setFilterValue(newarr);
        setBtn(false);
    }

    // Search Bar Filter According To Name
    function handlesearch() {
        if (handlefilter === '') {
            setVal(filtervalue)
        } else {
            const filterresult = filtervalue.filter((item) => item.name.toLowerCase()
                .includes(handlefilter.toLowerCase()))
            setVal(filterresult)
        }
    }
    // Getting Object ADD To Cart Value 
    const navigate = useNavigate()
    function handleClick  (result) {
        // navigate("/cart", { state: { id: [result] } });
        navigate(`cart/${result.id}`);
    }
    
    return (
        <><div className='home-div'>
            <h1>Food Bhaloo</h1>
            <select className='dropdown' onChange={handler} >
                <option selected disabled>--Select Type--</option>

                {unique.map((response, index) => {
                    return (
                        <option key={index}>{response}</option>
                    );
                })}

            </select>
            <input type="text" placeholder='Search Dish' onChange={(e) => setHandleFilter(e.target.value)} disabled={btn} />
            <button className='search-btn' onClick={handlesearch} disabled={btn}>Search</button>

        </div>
            <div className='checkout-div'>
            </div>
            <div className='home-div'>
                <h1>Menu List</h1>
                <table>
                    <tr>
                        <th>Sr no.</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>

                    {val.map((result, index) => {
                        return (
                            <><tr key={index} >
                                <td >{result.id}</td>
                                <td><img src={result.image} alt="" className='img' /></td>
                                <td>{result.name}</td>
                                <td>{result.price}/Rs</td>
                                <td><button className='Cart' onClick={() => handleClick(result)}>
                                    ADD TO CART</button></td>
                            </tr></>
                        );
                    })}

                </table>

            </div>
        </>
    )
}
