import React, { useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { emailValidation, nameValidation, firstNameValidation } from "../Utils/utils"



function ChangeProfil(userId, admin) {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageProfileUpload, setImageProfileUpload] = useState([]);
    const [emailError, setEmailError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [firstNameError, setFirstNameError] = useState("")

    let { id } = useParams();
    const token = JSON.parse(localStorage.token)



    const handleProfile = (e) => {

        e.preventDefault();
        if ( email && emailValidation(email) === false ) {
            setEmailError("Veuillez entrez un email valide")
        }
        if (lastName && nameValidation(lastName) === false) {
            setLastNameError("Veuillez entrez un nom valide")
        }

        if (firstName && firstNameValidation(firstName) === false) {
            setFirstNameError("Veuillez entrez un prenom valide")
        }

        let form = new FormData()
        form.append('email', email)
        form.append('lastName', lastName);
        form.append('firstName', firstName)
        form.append('image', imageProfileUpload[0])
        console.log(imageProfileUpload)
        console.log(form);
        axios
            .put(`${process.env.REACT_APP_API_URL}api/auth/${id} `, form, {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log("poster res", res);
                window.location.reload(false);


                if (res.data.error) {
                    console.log(res.data.error)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <form action="" onSubmit={handleProfile} id="profil-form ">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id='email' placeholder="Email" onChange={(e) => setEmail
                    (e.target.value)} value={email}></input>
                <div className='email-error'>{emailError}</div>
                <br />

                <label htmlFor='firstName'>Prenom</label>
                <input type="text" name='firstName' id='firstName' placeholder="Prenom" onChange={(e) => setFirstName
                    (e.target.value)} value={firstName}></input>
                <div className='password error'>{firstNameError}</div>
                <br />

                <label htmlFor="text">Nom de famille</label>
                <input type="text" name="lastName" id='lastName' placeholder="Nom" onChange={(e) => setLastName
                    (e.target.value)} value={lastName}></input>
                <div className='email-error'>{lastNameError}</div>
                <br />

                <label htmlFor="text">Image de profil</label>
                <input type="file" name="profile-picture" id='profile-picture' onChange={(e) => setImageProfileUpload(e.target.files)} filename={imageProfileUpload}></input>

                <input type="submit" className="active-btn" id="change-profil" value="modifier mon profil"></input>
            </form>
        </>
    )


}

export default ChangeProfil;


