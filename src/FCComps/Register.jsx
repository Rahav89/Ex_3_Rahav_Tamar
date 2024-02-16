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

function validateUserName(userName) {
    // Validate userName: Only allow alphanumeric characters and special characters, length up to 60 characters
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
    return userName.length <= 60 && regex.test(userName);
}

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


export default function Register() {

    const [showPassword, setShowPassword] = React.useState(false);

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

    const [formErrors, setFormErrors] = React.useState({
        userName: false,
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        verifyPassword: false,
        photoUser: '',
        dateUser: false,
        countryUser: false,
        streetName: false,
        numberHome: false,
    });

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = formData;
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const isUserNameValid = validateUserName(formData.userName);

        // Check if password matches verifyPassword
        const isPasswordMatch = formData.password === formData.verifyPassword;


        setFormErrors({
            userName: !isUserNameValid,
            email: !isEmailValid,
            password: !isPasswordValid,
            verifyPassword: !isPasswordMatch,

        });

        if (isEmailValid && isPasswordValid && isUserNameValid && isPasswordMatch) {
            console.log('Form is valid. Submitting data:', formData);
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


        // If the input type is 'file', validate the file type
        if (type === 'file') {
            const file = event.target.files[0];
            const allowedTypes = ['image/jpeg', 'image/jpg'];

            if (file && !allowedTypes.includes(file.type)) {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    photoUser: 'Only JPG or JPEG files are allowed.',
                }));
                return;
            } else {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    photoUser: '',
                }));
            }
        }

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


        // Update formData state
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
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
                                    helperText={formErrors.userName ? 'Invalid User Name' : ''}
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
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={formErrors.verifyPassword}
                                    helperText={formErrors.verifyPassword ? 'Passwords do not match' : ''}
                                    name="verifyPassword"
                                    label="Verify Password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="verifyPassword"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={!!formErrors.photoUser}
                                    helperText={formErrors.photoUser}
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
