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
import { useEffect } from 'react';

//פונקציה הבודקת את הולידציה של שם משתמש
function validateUserName(userName) {
    // תבנית של אותיות לועזיות בלבד מספרים ותווים מיוחדים
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
    // אם האורך מתחת ל 60 תווים וגם עומד בתנאי התווים של התבנית true מחזיר
    return userName.length <= 60 && regex.test(userName);
}

//פונקציה הבודקת את הולידציה של הסיסמא
function validatePassword(password) {
    //בודק שהסיסמא בין 7 ל-12 תווים 
    if (password.length < 7 || password.length > 12) {
        return false;
    }
    //בודק שהסיסמא מכילה לפחות תו מיוחד אחד, אות גדולה אחת ומספר אחד
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    const uppercaseLetter = /[A-Z]/;
    const digit = /[0-9]/;
    return (
        specialCharacters.test(password) &&
        uppercaseLetter.test(password) &&
        digit.test(password)
    );
}

//פונקציה הבודקת האם הסיסמאות שוות 
const validateVerifyPassword = (formData) => {
    return formData.password === formData.verifyPassword;
}


//פונקציה הבודקת את התמונה 
const validatePhotoUser = (filesPhotoUser) => {
    const file = filesPhotoUser[0];
    const allowedTypes = ['image/jpeg', 'image/jpg'];
    return (file && allowedTypes.includes(file.type));

}

//פונקציה הבודקת את הולידציה של המייל
const validateEmail = (email) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Register() {
    //צאק בוקס של צפייה בסיסמא - useState
    const [showPassword, setShowPassword] = React.useState(false);

    // אובייקט של הטופס - useState 
    const [formData, setFormData] = React.useState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        verifyPassword: '',
        allowExtraEmails: false,
        photoUser: null,
        dateUser: '',
        countryUser: '',
        streetName: '',
        numberHome: 0,
    });

    //בדיקת שגיאות - useState
    const [formErrors, setFormErrors] = React.useState({
        userName: false,
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        verifyPassword: false,
        photoUser: false,
        dateUser: false,
        countryUser: false,
        streetName: false,
        numberHome: false,
    });

    // פונקציה המטפלת בצ'אק בוקס של הסיסמא - בכל לחיצה נשנה מאמת לשקר ולהפך
    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    //פונקציה המטפלת בכפתור הסדמיט
    const handleSubmit = (event) => {
        event.preventDefault();
        const isUserNameValid = validateUserName(formData.userName);
        const isPasswordValid = validatePassword(formData.password);
        const isPasswordMatch = validateVerifyPassword(formData);
        const isEmailValid = validateEmail(formData.email);
        const isPhotoValid = validatePhotoUser(formData.photoUser);

        console.log(formData);

        setFormErrors({
            userName: !isUserNameValid,
            password: !isPasswordValid,
            verifyPassword: !isPasswordMatch,
            email: !isEmailValid,
            photoUser: !isPhotoValid,

        });

        if (isEmailValid && isPasswordValid && isUserNameValid && isPasswordMatch && isPhotoValid) {
            console.log('Form is valid. Submitting data:', formData);
        } else {
            console.log('Form has errors. Please fix them.');
        }
    };




    const handleChange = (event) => {
        //const name = event.target.name  :דרך קיצור לכתוב כמה פעמים   
        const { name, value, type, checked, files } = event.target;

        let val = null;
        if (type === 'checkbox') {
            val = checked;
        }
        else if (type === 'file') {
            val = files;
        }
        else val = value;

        //שמאפיין את כל שדות הטופס (עדכון של האובקייט) useState שמירת הערך שנכתב בשדה ל  
        setFormData((prevData) => ({
            ...prevData,
            [name]: val,
        }));

        // הוספת בדיקה לשם הרחוב
        if (name === 'streetName') {
            const isValidStreetName = /^[א-ת\s]*$/.test(value);
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                streetName: !isValidStreetName ? 'יש להזין רק אותיות בעברית' : '',
            }));
        }

        // If the input type is 'date'
        if (type === 'date') {
            const selectedDate = new Date(value);
            const currentDate = new Date();
            const minDate = new Date(currentDate);
            minDate.setFullYear(minDate.getFullYear() - 120);
            const maxDate = new Date(currentDate);
            maxDate.setFullYear(maxDate.getFullYear() - 18);

            if (selectedDate < maxDate || selectedDate > minDate) {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    dateUser: 'Invalid date. Age must be between 18 and 120 years old.',
                }));
                return;
            } else {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    dateUser: '',
                }));
            }
        }

        // If the input type is 'number' and name is 'numberHome'
        if (type === 'number' && name === 'numberHome') {
            // Check if the value is a positive number
            if (parseInt(value) >= 0) {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: false, // Clear any existing error for this field
                }));
            } else {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: true, // Set error to true if the number is negative
                }));
            }
        }
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
                    }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="username"
                                    name="userName"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="User Name"
                                    autoFocus
                                    error={formErrors.userName}
                                    helperText={formErrors.userName ? 'User name invalid. User Name must contain foreign letters only, numbers and special characters. No more than 60 characters. ' : ""}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={formErrors.password}
                                    helperText={formErrors.password ? 'Password must be between 7 to 12 characters long and contain at least one special character, one uppercase letter, and one digit.' : ''}
                                    name="password"
                                    label="Password"
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={formErrors.verifyPassword}
                                    helperText={formErrors.verifyPassword ? 'Passwords do not match, try again' : ''}
                                    name="verifyPassword"
                                    label="Verify Password"
                                    id="verifyPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={formErrors.photoUser}
                                    helperText={formErrors.photoUser ? 'Only JPG or JPEG files are allowed.' : ""}
                                    name="photoUser"
                                    label="Photo User"
                                    type='file'
                                    id="photoUser"
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={formData.firstName}
                                    onChange={handleChange}
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
                                    value={formData.lastName}
                                    onChange={handleChange}

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
                                    error={formErrors.dateUser}
                                    helperText={formErrors.dateUser}
                                    id="dateUser"
                                    label="Date"
                                    type='date'
                                    name="dateUser"
                                    autoComplete="dateUser"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={formErrors.countryUser}
                                    helperText={formErrors.countryUser}
                                    id="countryUser"
                                    label="Country User"
                                    type='text'
                                    name="countryUser"
                                    autoComplete="countryUser"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    helperText={formErrors.streetName}
                                    id="streetName"
                                    label="Street Name"
                                    type='text'
                                    name="streetName"
                                    autoComplete="streetName"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="numberHome"
                                    label="Number Home"
                                    type='number'
                                    name="numberHome"
                                    autoComplete="numberHome"
                                    helperText={formErrors.numberHome ? 'Please enter a positive number' : ''}
                                    error={formErrors.numberHome}
                                    onChange={handleChange}
                                    inputProps={{
                                        min: "0" // מגביל את הערך המינימלי לספרה אחת
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox name="allowExtraEmails" color="primary" onChange={handleCheckboxChange} />}
                                    label="Show Password"
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
