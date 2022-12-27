import React, { useState } from 'react';
import './dataCard.css'
import { DELETE_USER_URL } from './url_constants';
export const DataCard = (users) => {
    const [loading, setLoading] = useState(0)
    async function handleDelete(e) {
        setLoading(1)
        const payload = {
            "id": e
        };

        await fetch(DELETE_USER_URL, {
            method: "post",
            mode: 'no-cors',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        users.getUsers();
        setLoading(0)

    }
    const url = "mailto" + users.email;

    return <>
        <div className="card">
            <div className="grid-top">

                <h2 className='user-name'>{users.users.name}</h2>
                <h4 className='user-role'>{users.users.role}</h4>
               
            </div>
            <div className="grid">
                <div className="icon-based">
                    <img src="https://img.icons8.com/small/16/null/secured-letter.png"  alt='#'/>
                    <p className="small-text"> {users.users.username}</p>

                </div>
                <div className="icon-based">
                    <img src="https://img.icons8.com/small/16/null/secured-letter.png" alt='#' />
                    <p className="small-text"><a href={url}>{users.users.email}</a></p>

                </div> 
                <div className="icon-based">
                    <img src="https://img.icons8.com/small/16/null/phone.png" alt='#' />
                    <p className="small-text"> {users.users._id}</p>


                </div>


                <div className="user-btns">
                    <button className='editBtn' onClick={() => users.handleEdit(users.users._id)} >Edit</button>
                    <button className='delBtn' onClick={() => handleDelete(users.users._id)}>{loading ? "Deleting" : "Delete"} </button>

                </div>
            </div>
        </div>
    </>

}


