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
    function handleDelete() {
        console.log("de")
    }
    function handleEdit() {

    }
    useEffect(() => {
        getData();
    }, [data.length])
    return !noData ? (
        <>
            <table >
                <tr>
                    <th colSpan="2" style={{ backgroundColor: "lightGreen" }}>username</th>
                    <th colSpan="4" style={{ backgroundColor: "lightGreen" }}>Name</th>
                    <th colSpan="2" style={{ backgroundColor: "lightGreen" }}>E-mail</th>
                    <th style={{ backgroundColor: "lightGreen" }}> Edit </th>
                    <th style={{ backgroundColor: "lightGreen" }}> Delete </th>
                </tr>
                {data.map((users) => {
                    return <Fragment key={users._id}>
                        <tr>
                            <td colSpan="2">{users.username}</td>
                            <td colSpan="4" >{users.name}</td>
                            <td colSpan="2">{users.email}</td>
                            <td ><button onClick={handleDelete} >Edit</button></td>
                            <td ><button onClick={handleEdit}>Delete</button></td>
                        </tr>

                    </Fragment>
                })}

            </table>
        </>
    ) : <>
        <center><h1>Nothing found</h1></center>
    </>
}
