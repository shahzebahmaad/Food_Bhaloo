import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Menu from './Menu.json';


export default function Cart() {
    // eslint-disable-next-line
    const [val, setVal] = useState(Menu);
    const [count, setCount] = useState(1);
    const params = useParams();
    const newarr = val.filter(ele => {
        return (
            // eslint-disable-next-line
            ele.id == params.id

        )
    });

    const [subtotal, setSubTotal] = useState(newarr.price);

    function increment() {
        if (count >= 1 && count < 5) {
            setCount(count + 1);
            newarr.map((res) => {
                return (
                    setSubTotal(res.price * count)

                );
            })



            // console.log(location.state.id[0].price * count);
        }
    }

    function decrement() {
        if (count > 1 && count <= 5) {
            setCount(count - 1);
            newarr.map((res) => {
                return (
                    setSubTotal(res.price * count)

                );
            })
        }


    }
    useEffect(() => {
        newarr.map((res) => {
            return (
                setSubTotal(res.price * count)
            );
        })
    }, [count])
    
    const navigate = useNavigate()
    function handleClick(resul) {
        navigate("/invoice", { state: { id: [resul], id2: subtotal, id3: count } });
    }
    
    return (
        <>
            <h1 className='home-div'>CART</h1>

            <div>
                <table>
                    <tr>
                        <th>Type</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Sub Total</th>
                        <th>Buy Now</th>
                    </tr>

                    {newarr.map((resul, index) => {
                        return (
                            <><tr key={index} >
                                <td >{resul.type}</td>
                                <td><img src={resul.image} alt="Not Found" className='img' /></td>
                                <td>{resul.name}</td>
                                <td>{resul.price}/Rs</td>
                                <td>
                                    <button className='count-btn' onClick={decrement} disabled={count === 1}>-</button>
                                    <span>{count}</span>
                                    <button className='count-btn' onClick={increment} disabled={count === 5}>+</button>
                                </td>
                                <td><h4 className='sub-total'>{subtotal}/Rs</h4></td>
                                <td><button className='buy-btn' onClick={() => handleClick(resul)} >BUY NOW</button></td>
                            </tr></>
                        );
                    })}


                </table>
            </div>
        </>
    )
}
