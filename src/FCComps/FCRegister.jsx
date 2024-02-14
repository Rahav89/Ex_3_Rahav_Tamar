import React, { useState } from 'react';

export default function FCRegister() {


    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [privateName, setPrivateName] = useState('');
    const [familyName, setFamilyName] = useState('');


    const handleChange = (event) => {
        // מוודא שהטקסט מכיל רק אותיות לועזיות, מספרים ותווים מיוחדים
        const newText = event.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\|\-=]/g, '');
        // מוודא שאורך הטקסט לא יעלה על 60 תווים
        setUserName(newText.substring(0, 60));
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handlePasswordVerifyChange = (event) => {
        setPasswordVerify(event.target.value);
    }

    const handleNameChange = (event) => {
        setPrivateName(event.target.value);
    }

    const handleFamilyNameChange = (event) => {
        setFamilyName(event.target.value);
    }
    return (
        <div>
            <h3>FCRegister</h3>
            <div className="container">
                <form id="pForm">
                    <h3>Enter your details</h3>

                    <div className="form-group">
                        <label><span className="red-star">★ </span>User Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="userName"
                            placeholder="Enter your user name"
                            value={userName} 
                            onChange={handleChange}
                            maxLength={60}
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
                            minLength={9}
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
                            minLength={9}
                            pattern={password} // השוואת הסיסמה לשדה הראשון
                        />
                    </div>

                    <div className="form-group">
                        <label><span className="red-star">★ </span>Name</label>
                        <input
                            type="text"
                            value={privateName}
                            className="form-control"
                            id="privateName"
                            placeholder="Enter your name"
                            onChange={handleNameChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label><span className="red-star">★ </span>Family name</label>
                        <input
                            type="text"
                            value={familyName}
                            className="form-control"
                            id="familyName"
                            placeholder="Enter your name"
                            onChange={handleFamilyNameChange}
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label><span className="red-star">★ </span>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            required />
                    </div>


                    <div className="form-group">
                        <input type="checkbox" id="checkPassword" onclick="showPassword()" />
                        <label>Show Password</label>
                    </div>

                    <div className="form-group">
                        <label>
                            Note!
                            After you click the Submit button, you will go back to menu to Log in!
                        </label>
                    </div>

                    <input type="submit" value="Submit" className="btnManage" />
                    <input type="button" value="Back to Menu" className="btnManage" onclick="redirectToMenu()" />

                </form>

            </div>






        </div>
    )
}
