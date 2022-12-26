import React, { useState } from 'react';
import './home.css'
import { DELETE_USER } from './url_constants';
export const DataCard = (users) => {
    const [loading, setLoading] = useState(0)
    async function handleDelete(e) {
        setLoading(1)
        const payload = {
            "id": e
        };

        await fetch(DELETE_USER, {
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
    return <div className='data' key={users.users._id}>

        <div className="item">

            <p> <strong>username:</strong>  </p>
            <p  >{users.users.username}</p>
        </div>
        <div className="item">
            <p> <strong>Name:</strong>  </p>
            <p  >{users.users.name}</p>
        </div><div className="item">
            <p> <strong>E-mail:</strong>  </p>
            <a href={url}>{users.users.email}</a>

        </div>
        <div className="item">
            <p> <strong>Role:</strong>  </p>
            <p>{users.users.role}</p>

        </div>
        <div className="buttons">
            <button className='editBtn' onClick={() => users.handleEdit(users.users._id)} >Edit</button>
            <button className='delBtn' onClick={() => handleDelete(users.users._id)}>{loading ? "Deleting" : "Delete"} </button>
        </div>


    </div>
}


    // #endregion

