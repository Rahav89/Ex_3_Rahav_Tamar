import React, { useState } from 'react';

export default function FCRegister() {


    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [photo, setPhoto] = useState('');
    const [FirstName, setPrivateName] = useState('');
    const [LastName, setFamilyName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [country, setCountry] = useState('');
    const [streetName, setStreetName] = useState('');
    const [NumberHome, setNumberHome] = useState('');

    const handleUserNameChange = (event) => {
        // מוודא שהטקסט מכיל רק אותיות לועזיות, מספרים ותווים מיוחדים
        const newText = event.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\|\-=]/g, '');
        // מוודא שאורך הטקסט לא יעלה על 60 תווים
        setUserName(newText.substring(0, 60));
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handlePasswordVerifyChange = (e) => {
        setPasswordVerify(e.target.value);
    }

    const handlePhotoChange = (e) => {
        setPhoto(e.target.value);
    }

    const handleNameChange = (e) => {
        setPrivateName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setFamilyName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleDateChange = (e) => {
        setDate(e.target.value);
    }

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    }

    const handleStreetNameChange = (e) => {
        setStreetName(e.target.value);
    }

    const handleNumberHomeChange = (e) => {
        const inputValue = Number(e.target.value);
        if (inputValue >= 0) {
            setNumberHome(inputValue);
        } else {
            // הודעת שגיאה
            console.error('Please enter a positive number');
        }
    }



    return (
        <div>
            <h3>FCRegister</h3>
            <div className="container">
                <form id="pForm">
                    <h3>Enter your details:</h3>

                    <div className="form-group">
                        <label><span className="red-star">★ </span>User Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="userName"
                            placeholder="Enter your user name"
                            value={userName}
                            onChange={handleUserNameChange}
                            required />
                    </div>

                    <div className="form-group">
                        <label><span className="red-star">★ </span>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={handlePasswordChange}
                            required

                        />
                    </div>

                    <div className="form-group">
                        <label><span className="red-star">★ </span>Verify the Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="passwordVerify"
                            placeholder="Enter the password again"
                            value={passwordVerify}
                            onChange={handlePasswordVerifyChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label><span className="red-star">★ </span>Photo</label>
                        <input
                            type="file"
                            className="form-control"
                            id="photo"
                            value={photo}
                            onChange={handlePhotoChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label><span className="red-star">★ </span>First name</label>
                        <input
                            type="text"
                            value={FirstName}
                            className="form-control"
                            id="privateName"
                            placeholder="Enter your name"
                            onChange={handleNameChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label><span className="red-star">★ </span>Last name</label>
                        <input
                            type="text"
                            value={LastName}
                            className="form-control"
                            id="familyName"
                            placeholder="Enter your name"
                            onChange={handleLastNameChange}
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label><span className="red-star">★ </span>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={handleEmailChange}
                            required />
                    </div>


                    <div className="form-group">
                        <label><span className="red-star">★ </span>Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="date"
                            value={date}
                            onChange={handleDateChange}
                            required />
                    </div>

                    <div className="form-group">
                        <label><span className="red-star">★ </span>Contry</label>
                        <input
                            type="text"
                            className="form-control"
                            id="country"
                            value={country}
                            onChange={handleCountryChange}
                            required />
                    </div>

                    <div className="form-group">
                        <label><span className="red-star">★ </span>Street name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="streetName"
                            value={streetName}
                            onChange={handleStreetNameChange}
                            required />
                    </div>

                    <div className="form-group">
                        <label><span className="red-star">★ </span>Number home</label>
                        <input
                            type="number"
                            className="form-control"
                            id="NumberHome"
                            value={NumberHome}
                            onChange={handleNumberHomeChange}
                            required />
                    </div>

                    <input type="submit" value="Submit" className="btnManage" />

                </form>

            </div>






        </div>
    )
}
