// import React, { useState } from 'react';

// export default function FCRegister() {


//     const [userName, setUserName] = useState('');
//     const [password, setPassword] = useState('');
//     const [passwordVerify, setPasswordVerify] = useState('');
//     const [photo, setPhoto] = useState('');
//     const [FirstName, setPrivateName] = useState('');
//     const [LastName, setFamilyName] = useState('');
//     const [email, setEmail] = useState('');
//     const [date, setDate] = useState('');
//     const [country, setCountry] = useState('');
//     const [streetName, setStreetName] = useState('');
//     const [NumberHome, setNumberHome] = useState('');

//     const handleUserNameChange = (event) => {
//         // מוודא שהטקסט מכיל רק אותיות לועזיות, מספרים ותווים מיוחדים
//         const newText = event.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\|\-=]/g, '');
//         // מוודא שאורך הטקסט לא יעלה על 60 תווים
//         setUserName(newText.substring(0, 60));
//     }

//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//     }

//     const handlePasswordVerifyChange = (e) => {
//         setPasswordVerify(e.target.value);
//     }

//     const handlePhotoChange = (e) => {
//         setPhoto(e.target.value);
//     }

//     const handleNameChange = (e) => {
//         setPrivateName(e.target.value);
//     }

//     const handleLastNameChange = (e) => {
//         setFamilyName(e.target.value);
//     }

//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//     }

//     const handleDateChange = (e) => {
//         setDate(e.target.value);
//     }

//     const handleCountryChange = (e) => {
//         setCountry(e.target.value);
//     }

//     const handleStreetNameChange = (e) => {
//         setStreetName(e.target.value);
//     }

//     const handleNumberHomeChange = (e) => {
//         const inputValue = Number(e.target.value);
//         if (inputValue >= 0) {
//             setNumberHome(inputValue);
//         } else {
//             // הודעת שגיאה
//             console.error('Please enter a positive number');
//         }
//     }



//     return (
//         <div>
//             <h3>FCRegister</h3>
//             <div className="container">
//                 <form id="pForm">
//                     <h3>Enter your details:</h3>

//                     <div className="form-group">
//                         <label><span className="red-star">★ </span>User Name</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="userName"
//                             placeholder="Enter your user name"
//                             value={userName}
//                             onChange={handleUserNameChange}
//                             required />
//                     </div>

//                     <div className="form-group">
//                         <label><span className="red-star">★ </span>Password</label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             id="password"
//                             placeholder="Enter password"
//                             value={password}
//                             onChange={handlePasswordChange}
//                             required

//                         />
//                     </div>

//                     <div className="form-group">
//                         <label><span className="red-star">★ </span>Verify the Password</label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             id="passwordVerify"
//                             placeholder="Enter the password again"
//                             value={passwordVerify}
//                             onChange={handlePasswordVerifyChange}
//                             required
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label><span className="red-star">★ </span>Photo</label>
//                         <input
//                             type="file"
//                             className="form-control"
//                             id="photo"
//                             value={photo}
//                             onChange={handlePhotoChange}
//                             required
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label><span className="red-star">★ </span>First name</label>
//                         <input
//                             type="text"
//                             value={FirstName}
//                             className="form-control"
//                             id="privateName"
//                             placeholder="Enter your name"
//                             onChange={handleNameChange}
//                             required
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label><span className="red-star">★ </span>Last name</label>
//                         <input
//                             type="text"
//                             value={LastName}
//                             className="form-control"
//                             id="familyName"
//                             placeholder="Enter your name"
//                             onChange={handleLastNameChange}
//                             required
//                         />
//                     </div>


//                     <div className="form-group">
//                         <label><span className="red-star">★ </span>Email</label>
//                         <input
//                             type="email"
//                             className="form-control"
//                             id="email"
//                             value={email}
//                             placeholder="Enter your email"
//                             onChange={handleEmailChange}
//                             required />
//                     </div>


//                     <div className="form-group">
//                         <label><span className="red-star">★ </span>Date</label>
//                         <input
//                             type="date"
//                             className="form-control"
//                             id="date"
//                             value={date}
//                             onChange={handleDateChange}
//                             required />
//                     </div>

//                     <div className="form-group">
//                         <label><span className="red-star">★ </span>Contry</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="country"
//                             value={country}
//                             onChange={handleCountryChange}
//                             required />
//                     </div>

//                     <div className="form-group">
//                         <label><span className="red-star">★ </span>Street name</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="streetName"
//                             value={streetName}
//                             onChange={handleStreetNameChange}
//                             required />
//                     </div>

//                     <div className="form-group">
//                         <label><span className="red-star">★ </span>Number home</label>
//                         <input
//                             type="number"
//                             className="form-control"
//                             id="NumberHome"
//                             value={NumberHome}
//                             onChange={handleNumberHomeChange}
//                             required />
//                     </div>

//                     <input type="submit" value="Submit" className="btnManage" />

//                 </form>

//             </div>






//         </div>
//     )
// }
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function validateEmail(email) {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
    // Check if password is between 7 to 12 characters long
    if (password.length < 7 || password.length > 12) {
        return false;
    }
    // Check if password contains at least one special character, one uppercase letter, and one digit
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    const uppercaseLetter = /[A-Z]/;
    const digit = /[0-9]/;
    return (
        specialCharacters.test(password) &&
        uppercaseLetter.test(password) &&
        digit.test(password)
    );
}

function SignUp() {
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        allowExtraEmails: false,
    });
    const [formErrors, setFormErrors] = React.useState({
        email: false,
        password: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = formData;
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        setFormErrors({
            email: !isEmailValid,
            password: !isPasswordValid,
        });

        if (isEmailValid && isPasswordValid) {
            console.log('Form is valid. Submitting data:', formData);
            // Add your form submission logic here
        } else {
            console.log('Form has errors. Please fix them.');
        }
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: val,
        }));
    };

    return (
        <ThemeProvider theme={createTheme()}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={formErrors.email}
                                    helperText={formErrors.email ? 'Invalid email' : ''}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={formErrors.password}
                                    helperText={formErrors.password ? 'Password must be at least 6 characters' : ''}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox name="allowExtraEmails" color="primary" onChange={handleChange} />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SignUp;
