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
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//  מערך של ערים בישראל
const countries = [
    'ירושלים',
    'תל אביב',
    'חיפה',
    'ראשון לציון',
    'פתח תקווה',
    'אשדוד',
    'נתניה',
    'באר שבע',
    'בני ברק',
    'בת ים',
];

export default function Register() {

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

    // פונקציה המטפלת בצ'אק בוקס של הסיסמא - בכל לחיצה נשנה מאמת לשקר ולהפך
    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    //פונקציה הבודקת האם הקלט הוא טקסט בלבד (בשביל שם פרטי ומשפחה בטופס)
    const validateTextOnly = (value) => {
        return /^[a-zA-Z ]*$/.test(value);
    }

    //פונקציה הבודקת את הולידציה של המייל
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z-]+\.com$/;
        return regex.test(email);
    }

    //פונקציה הבודקת את הולידציה של תאריך לידה
    const validateDate = (dateOfBirth) => {
        const dob = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        //בדיקה של החודשים - אם לא היה לו עדיין חודש יומולדת נוריד מהגיל (הפרש בין השנים) שנה
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        if (age < 18 || age > 120) {
            console.log(false, "under 18 or above 120")
            return false; // התאריך לא הגיוני אם הגיל קטן מ-18 או גדול מ-120
        }
        return true;
    }

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
        cityUser: '',
        streetName: '',
        homeNumber: 0,
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
        cityUser: false,
        streetName: false,
        homeNumber: false,
    });


    //פונקציה המטפלת בכפתור הסדמיט
    const handleSubmit = (event) => {
        event.preventDefault();
        const isUserNameValid = validateUserName(formData.userName);
        const isPasswordValid = validatePassword(formData.password);
        const isPasswordMatch = validateVerifyPassword(formData);
        const isFirstNameValid = validateTextOnly(formData.firstName);
        const isLastNameValid = validateTextOnly(formData.lastName);
        const isEmailValid = validateEmail(formData.email);
        const isDateValid = validateDate(formData.dateUser);
        const isStreetValid = /^[א-ת\s]*$/.test(formData.streetName);
        // const isHomeNumberValid =parseInt(formData.homeNumber)>=0 ;
        const isHomeNumberValid = /^\d+$/.test(formData.homeNumber);

        console.log(formData);

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            userName: !isUserNameValid,
            password: !isPasswordValid,
            verifyPassword: !isPasswordMatch,
            firstName: !isFirstNameValid,
            lastName: !isLastNameValid,
            email: !isEmailValid,
            dateUser: !isDateValid,
            streetName: !isStreetValid,
            homeNumber: !isHomeNumberValid,

        }));

        if (isEmailValid && isHomeNumberValid && isPasswordValid && isStreetValid && isUserNameValid && isPasswordMatch && isFirstNameValid && isLastNameValid && isDateValid) {
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
        //ולידציה של התמונה לאחר בחירת המשתמש את התמונה
        else if (type === 'file') {
            const file = files[0]; //הקובץ שהמשתמש בחר להעלות
            const allowedTypes = ['image/jpeg', 'image/jpg'];
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                photoUser: !(file && allowedTypes.includes(file.type)),
            }));
            //הגדרת הערך של התמונה בשביל האובייקט של הסט-סטייט
            val = file;
        }

        else val = value;

        //שמאפיין את כל שדות הטופס (עדכון של האובייקט) useState-שמירת הערך שנכתב בשדה ל  
        setFormData((prevData) => ({
            ...prevData,
            [name]: val,
        }));

    };
    const handleInputChange = (event, newInputValue) => {
        // If the input value is cleared, prevent it from being cleared
        if (!newInputValue) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                ['cityUser']: true,// Set error to true if the number is negative
            }));
        }
    };
    const handleChange_Autocomplete_City = (event, newValue) => {
        setFormData(prevData => ({
            ...prevData,
            ['cityUser']: newValue,
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
                                    type='file'
                                    required
                                    fullWidth
                                    error={formErrors.photoUser}
                                    helperText={formErrors.photoUser ? 'Only JPG or JPEG files are allowed.' : ""}
                                    name="photoUser"
                                    label="Photo User"
                                    id="photoUser"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    required
                                    fullWidth
                                    name="firstName"
                                    id="firstName"
                                    label="First Name"
                                    onChange={handleChange}
                                    error={formErrors.firstName}
                                    helperText={formErrors.firstName ? 'Only text are allowed.' : ""}
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
                                    error={formErrors.lastName}
                                    helperText={formErrors.lastName ? 'Only text are allowed.' : ""}
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
                                    type='date'
                                    required
                                    fullWidth
                                    error={formErrors.dateUser}
                                    helperText={formErrors.dateUser ? 'Invalid date. Age must be between 18 and 120 years old.' : ''}
                                    id="dateUser"
                                    label="Date"
                                    name="dateUser"
                                    autoComplete="dateUser"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    options={countries} // הגדרת האפשרויות לרשימה של מדינות
                                    getOptionLabel={(option) => option} // כיצד להציג את כל אפשרות
                                    onChange={handleChange_Autocomplete_City}//מטפל ברשימה הנגללת 
                                    onInputChange={handleInputChange}//מטפל באיקס של התיבה
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            required
                                            fullWidth
                                            error={!!formErrors.cityUser}
                                            helperText={formErrors.cityUser ? 'You must choose a city' : ''}
                                            label="City User"
                                            type="text"
                                            name="cityUser"
                                            autoComplete="cityUser"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={formErrors.streetName}
                                    helperText={formErrors.streetName ? 'Please write street name in Hebrew only.' : ''}
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
                                    id="homeNumber"
                                    label="Number Home"
                                    type='number'
                                    name="homeNumber"
                                    autoComplete="homeNumber"
                                    helperText={formErrors.homeNumber ? 'Please enter a positive number' : ''}
                                    error={formErrors.homeNumber}
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
