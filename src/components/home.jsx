import React, { useState, useEffect, Fragment } from 'react'
import "./home.css"

export const Home = () => {
    const [data, setData] = useState([])
    const [noData, setNotData] = useState(true)
    const getData = async () => {
        const res = await fetch('https://lmm43aqox4akdgw3fqta6g5hwa0zbzux.lambda-url.us-east-1.on.aws/', {
            method: "get"
        })
        const response = await res.json();
        if (response.body.length !== 0) {
            setData(response.body)
            setNotData(false)

        } else {
            setNotData(true)
        }

    }
    async function handleDelete(e) {

        const payload = {
            "id": e
        };
        console.log(payload)
        const res = await fetch('https://7mv3kjs2rhjd5m2biuquvzbcrm0kehjf.lambda-url.us-east-1.on.aws', {
            method: "delete",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: payload
        });
        const data = res.json();
        if (data.message === "USER_DELETED") {
            window.alert(data.message);
            getData();
        }
    }
    function handleEdit() {

    }
    useEffect(() => {
        getData();
    }, [data.length])
    return !noData ? (
        <>
            <table >
                <tbody>


                    <tr>
                        <th colSpan="1" style={{ backgroundColor: "lightGreen" }}>Serial No.</th>
                        <th colSpan="2" style={{ backgroundColor: "lightGreen" }}>username</th>
                        <th colSpan="4" style={{ backgroundColor: "lightGreen" }}>Name</th>
                        <th colSpan="2" style={{ backgroundColor: "lightGreen" }}>E-mail</th>
                        <th style={{ backgroundColor: "lightGreen" }}> Edit </th>
                        <th style={{ backgroundColor: "lightGreen" }}> Delete </th>
                    </tr>
                    {data.map((users, index) => {
                        return <Fragment key={users._id}>
                            <tr> <td colSpan="1">{index + 1}</td>
                                <td colSpan="2">{users.username}</td>
                                <td colSpan="4" >{users.name}</td>
                                <td colSpan="2">{users.email}</td>
                                <td ><button className='editBtn' onClick={() => handleEdit(users._id)} >Edit</button></td>
                                <td ><button className='delBtn' onClick={() => handleDelete(users._id)}>Delete</button></td>
                            </tr>

                        </Fragment>
                    })}
                </tbody>
            </table>
        </>
    ) : <>
        <center><h1>Nothing found</h1></center>
    </>
}
