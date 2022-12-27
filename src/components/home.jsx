import React, { useState, useEffect } from 'react'
import "./home.css"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { GET_USERS_URL, CREATE_USER_URL } from './url_constants'
import { DataCard } from './dataCard';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const roles = [

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
    {
        value: 'ML Engineer',
        label: 'ML Engineer',
    },
];

export const Home = () => {
    const [data, setData] = useState([])
    const [noData, setNotData] = useState(true)
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(0)
    const [pageLoading, setPageLoading] = useState(0)

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

    const getUsers = async () => {
        const res = await fetch(GET_USERS_URL, {
            method: "get"
        })

        const response = await res.json();
        if (response.length === 0) {
            setNotData(1)
            setPageLoading(1)
        } else {
            setData(response)
            setNotData(0)
            setPageLoading(1)

        }
    }


    const handleCreateUser = async (e) => {
        e.preventDefault();
        setLoading(1);

        await fetch(CREATE_USER_URL, {
            method: "post",
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)

        })
        setUserData({ username: "", name: "", email: "", role: "" });
        getUsers();
        setLoading(0)
        handleClickClose();


    }

    function handleEdit() {
        window.alert('Comming')
    }
    useEffect(() => {
        getUsers();
    }, [data.length])
    return pageLoading ? (!noData ? (
        <><div style={{ height: window.innerHeight }} className="header">
            <h1 className='site-name'>UserCloud</h1>
            <p className='site-details'>This website has been designed with a focus on using <strong style={{ color: "blue" }}> serverless technology powered by AWS</strong>. Built with<strong style={{ color: "blue" }}>  ReactJS</strong> and utilizing <strong style={{ color: "blue" }}>AWS Lambda </strong>for the backend, our website offers a reliable and efficient way to manage a database of users  <strong style={{ color: "blue" }}>powered by MongoDB</strong> . In addition to the ability to add, delete, edit, and view users. Thank you for visiting!.</p>
            <img className='scroll-img' src="https://thumbs.gfycat.com/PhonyOffensiveBarbet.webp" alt="x" />
        </div>

            <div className='home'>

                {data.slice().reverse().map((users) => {

                    return <div key={users._id}>
                        <DataCard users={users} getUsers={getUsers} handleEdit={handleEdit} />
                    </div>

                    })}
                <div className="fab">
                    <Button aria-setsize="50" variant='contained' onClick={handleClickOpen} color='secondary'>Add</Button>
                </div>
                <div>

                    <Dialog
                        open={open}
                        scroll='paper'
                        TransitionComponent={Transition}
                        keepMounted
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Add New User"}</DialogTitle>
                        <DialogContent>
                            <div id="alert-dialog-slide-description">

                                <form onSubmit={handleCreateUser} method="post" >

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
                                        {roles.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <Button type='submit' variant='contained' disabled={loading ? true : false} color='success'>{loading ? "Adding" : "ADD"}</Button>
                                    <Button variant="outlined" color='inherit' onClick={handleClickClose}>Cancel</Button>
                                </form>

                            </div>
                        </DialogContent>

                    </Dialog>




                </div>

            </div>
        </>) : <>
        <div style={{ height: window.innerHeight }} className="header">
            <h1 className='site-name'>UserCloud</h1>
            <p className='site-details'>This website has been designed with a focus on using <strong style={{ color: "blue" }}> serverless technology powered by AWS</strong>. Built with<strong style={{ color: "blue" }}>  ReactJS</strong> and utilizing <strong style={{ color: "blue" }}>AWS Lambda </strong>for the backend, our website offers a reliable and efficient way to manage a database of users  <strong style={{ color: "blue" }}>powered by MongoDB</strong> . In addition to the ability to add, delete, edit, and view users. Thank you for visiting!.</p>
            <img className='scroll-img' src="https://thumbs.gfycat.com/PhonyOffensiveBarbet.webp" alt="x" />
        </div>
        <center><h1 style={{ lineHeight: "3ch", margin: "6px" }}>No User In Database</h1></center>
        <center><p style={{ lineHeight: "3ch", marginBottom: "20px" }}>Please Add User</p></center>
            <div className="fab-no-user">
            <Button aria-setsize="50" variant='contained' onClick={handleClickOpen} color='secondary'>Add</Button>
        </div>
        <div>

                <Dialog
                    open={open}
                    scroll='paper'
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Add New User"}</DialogTitle>
                    <DialogContent>
                        <div id="alert-dialog-slide-description">

                            <form onSubmit={handleCreateUser} method="post" >

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
                                    {roles.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <Button type='submit' variant='contained' disabled={loading ? true : false} color='success'>{loading ? "Adding" : "ADD"}</Button>
                                <Button variant="outlined" color='inherit' onClick={handleClickClose}>Cancel</Button>
                            </form>

                        </div>
                    </DialogContent>

                </Dialog>

        </div>

    </>) : (
        <>
            <div style={{ textAlign: "center", display: "flex", height: window.innerHeight, justifyContent: "center", flexDirection: "column" }}>
                <h1 style={{ color: "green", margin: "5px" }}>
                    UserCloud
                </h1>
                <p style={{ color: "black", margin: "0" }}>Serverless Powered By AWS Lambda</p>
                <h3 style={{ color: "red", margin: "5px" }}>Loading</h3>
            </div>

    </>
        )
}
