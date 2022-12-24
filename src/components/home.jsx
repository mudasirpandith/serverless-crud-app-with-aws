import React, { useState, useEffect, Fragment } from 'react'
import "./home.css"
import UserPic from '../images/username.png'
import UserNamePic from '../images/name.png'
import EmailPic from '../images/email.png'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const currencies = [
    {
        value: 'React Developer',
        label: 'React Developer',
    },
    {
        value: 'Frontend Developer',
        label: 'Frontend Developer',
    },
    {
        value: 'Backend Developer',
        label: 'Backend Developer',
    },
    {
        value: 'Full Stack Developer',
        label: 'Full Stack Developer',
    },
];

export const Home = () => {
    const [data, setData] = useState([])
    const [noData, setNotData] = useState(true)
    const [open, setOpen] = React.useState(false);

    const [userData, setUserData] = useState({
        username: "",
        name: "",
        email: "",
        role: ""

    })
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserData(values => ({ ...values, [name]: value }))

    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        handleClickClose()

        await fetch("https://njcz4w5gzj5lavhmkk7mjk3xji0qfmyp.lambda-url.us-east-1.on.aws", {
            method: "post",
            mode: 'no-cors',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)

        })
        setUserData({ username: "", name: "", email: "", role: "" });
        getData()


    }
    const getData = async () => {
        const res = await fetch('https://lmm43aqox4akdgw3fqta6g5hwa0zbzux.lambda-url.us-east-1.on.aws/', {
            method: "get"
        })

        const response = await res.json();
        if (response.length === 0) {
            setNotData(1)
        } else {
            setData(response)
            setNotData(0)

        }
    }
    async function handleDelete(e) {

        const payload = {
            "id": e
        };

        await fetch('https://7mv3kjs2rhjd5m2biuquvzbcrm0kehjf.lambda-url.us-east-1.on.aws', {
            method: "post",
            mode: 'no-cors',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
      });

        getData();


    }
    function handleEdit() {

    }
    useEffect(() => {
        getData();
    }, [data.length])
    return !noData ? (
        <><div className="header">
            <h1 className='site-name'>UserCloud</h1>
            <p className='site-details'>Our website has been designed with a focus on using <strong> serverless technology powered by AWS</strong>. Built with<strong>  ReactJS</strong> and utilizing <strong>AWS Lambda </strong>for the backend, our website offers a reliable and efficient way to manage a database of users powered by MongoDB. In addition to the ability to add, delete, edit, and view users. Thank you for visiting!.</p>
        </div>

            <div className='home'>

                {data.map((users) => {
                    const url = `mailto:` + users.email
                    return <div className='data' key={users._id}>

                        <div className="item">
                            <img src={UserPic} alt="user" />
                            <p  >{users.username}</p>
                        </div>
                        <div className="item">
                            <img src={UserNamePic} alt="user" />
                            <p  >{users.name}</p>
                        </div><div className="item">
                            <img src={EmailPic} alt="user" />
                            <a href={url}>{users.email}</a>

                        </div>
                        <div className="item">
                            <img src={EmailPic} alt="user" />
                            <p>{users.role}</p>

                        </div>
                        <div className="buttons">
                            <button className='editBtn' onClick={() => handleEdit(users._id)} >Edit</button>
                            <button className='delBtn' onClick={() => handleDelete(users._id)}>Delete</button>
                        </div>


                    </div>
                    })}
                <div className="fab">
                    {/* <Fab color='success' size='large' onClick={handleClickOpen} children="ADD" /> */}
                    <Button aria-setsize="50" variant='contained' onClick={handleClickOpen} color='secondary'>Add</Button>
                </div>
                <div>

                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted

                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Add New User"}</DialogTitle>
                        <DialogContent>
                            <div id="alert-dialog-slide-description">

                                <form onSubmit={handleSubmit} method="post" >

                                    <TextField required id="filled-basic" label="username" name='username' value={userData.username} variant="filled" onChange={handleChange} />
                                    <TextField required id="filled-basic" label="Name" name='name' variant="filled" value={userData.name} onChange={handleChange} />
                                    <TextField required id="filled-basic" label="E-mail" name='email' variant="filled" value={userData.email} onChange={handleChange} />
                                    <TextField required
                                        id="outlined-select-currency"
                                        select
                                        label="Select"
                                        defaultValue="React Developer"
                                        helperText="Please select your role"
                                        name='role'
                                        value={userData.role}
                                        onChange={handleChange}
                                    >
                                        {currencies.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <Button type='submit' variant='contained' color='success'>Submit</Button>
                                    <Button variant="outlined" color='inherit' onClick={handleClickClose}>Cancel</Button>
                                </form>

                            </div>
                        </DialogContent>

                    </Dialog>
                </div>

            </div>
        </>) : <>
        <div className="header">
            <h1 className='site-name'>UserCloud</h1>
            <p className='site-details'>Our website has been designed with a focus on using <strong> serverless technology powered by AWS</strong>. Built with<strong>  ReactJS</strong> and utilizing <strong>AWS Lambda </strong>for the backend, our website offers a reliable and efficient way to manage a database of users powered by MongoDB. In addition to the ability to add, delete, edit, and view users. Thank you for visiting!.</p>
        </div>
        <center><h1 style={{ lineHeight: "3ch", margin: "6px" }}>No User In Database</h1></center>
        <center><p style={{ lineHeight: "3ch", marginBottom: "20px" }}>Please Add User</p></center>
        <div className="fab-no-user">
            {/* <Fab color='success' size='large' onClick={handleClickOpen} children="ADD" /> */}
            <Button aria-setsize="50" variant='contained' onClick={handleClickOpen} color='secondary'>Add</Button>
        </div>
        <div>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted

                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Add New User"}</DialogTitle>
                <DialogContent>
                    <div id="alert-dialog-slide-description">

                        <form onSubmit={handleSubmit} method="post" >

                            <TextField required id="filled-basic" label="username" name='username' value={userData.username} variant="filled" onChange={handleChange} />
                            <TextField required id="filled-basic" label="Name" name='name' variant="filled" value={userData.name} onChange={handleChange} />
                            <TextField required id="filled-basic" label="E-mail" name='email' variant="filled" value={userData.email} onChange={handleChange} />
                            <TextField required
                                id="outlined-select-currency"
                                select
                                label="Select"
                                defaultValue="React Developer"
                                helperText="Please select your role"
                                name='role'
                                value={userData.role}
                                onChange={handleChange}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <Button type='submit' variant='contained' color='success'>Submit</Button>
                            <Button variant="outlined" color='inherit' onClick={handleClickClose}>Cancel</Button>
                        </form>

                    </div>
                </DialogContent>

            </Dialog>
        </div>

    </>
}
