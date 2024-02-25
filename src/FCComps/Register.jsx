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

export default function Register(props) {


    //פונקציה הבודקת את הולידציה של שם משתמש
    function validateUserName(userName) {
        // תבנית של אותיות לועזיות בלבד מספרים ותווים מיוחדים
        const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
        // אם האורך מתחת ל 60 תווים וגם עומד בתנאי התווים של התבנית true מחזיר
        return userName.length <= 60 && regex.test(userName) && userName != '';
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
        return ((formData.password === formData.verifyPassword) && (formData.verifyPassword != ''));
    }

    // פונקציה המטפלת בצ'אק בוקס של הסיסמא - בכל לחיצה נשנה מאמת לשקר ולהפך
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    //פונקציה הבודקת האם הקלט הוא טקסט בלבד (בשביל שם פרטי ומשפחה בטופס)
    const validateTextOnly = (value) => {
        return ((/^[a-zA-Zא-ת]*$/.test(value)) && value != '');
    }

    //פונקציה הבודקת את הולידציה של המייל
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z-]+\.com$/;
        return ((regex.test(email)) && email != '');
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

        if (age < 18 || age > 120 || dateOfBirth == '') {
            return false; // התאריך לא הגיוני אם ריק או שהגיל קטן מ-18 או גדול מ-120
        }
        return true;
    }

    //צאק בוקס של צפייה בסיסמא - useState
    const [showPassword, setShowPassword] = React.useState(false);


    // אובייקט של הטופס - useState 
    const [formData, setFormData] = React.useState({
        userName: '',
        password: '',
        verifyPassword: '',
        photoUser: null,
        firstName: '',
        lastName: '',
        email: '',
        dateUser: '',
        cityUser: '',
        streetName: '',
        homeNumber: 0,
        ShowPassword: false,
    });


    //בדיקת שגיאות - useState
    const [formErrors, setFormErrors] = React.useState({
        userName: false,
        password: false,
        verifyPassword: false,
        photoUser: false,
        firstName: false,
        lastName: false,
        email: false,
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
        const isStreetValid = ((/^[א-ת\s]*$/.test(formData.streetName)) && (formData.streetName != ''));
        const isHomeNumberValid = ((/^\d+$/.test(formData.homeNumber)) && (formData.homeNumber != ''));

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

        if (isUserNameValid && isPasswordValid && isPasswordMatch && isFirstNameValid &&
            isLastNameValid && isEmailValid && isDateValid && isStreetValid && isHomeNumberValid &&
            formErrors.photoUser === false && formData.photoUser != null
            && formErrors.cityUser === false && formData.cityUser != ' ') {

            Swal.fire("Added Successfully!", "User added", "success").then((result) => {
                // Check if the user clicked the "OK" button
                if (result.isConfirmed) {
                    console.log("send to app");
                    // שולחים את כל אובייקט השדות חוץ מהצגת הסיסמה ע"י פיצול האובייקט
                    const { ShowPassword, ...formDataToSend } = formData;
                    props.sendUserToApp(formDataToSend);
                }
            });
        }
        //בדיקה לשדות שלא עשינו להם ולידציה בלחיצה על סאבמיט
        else if (formData.photoUser === null) {
            setFormErrors((prevData) => ({
                ...prevData,
                ['photoUser']: true,
            }));
        }
        if (formData.cityUser === '') {
            setFormErrors((prevData) => ({
                ...prevData,
                ['cityUser']: true,
            }));
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
            //שמירת התמונה בפורמט מתאים ללוקאל סטוראג
            const reader = new FileReader();
            reader.onload = (event) => {
                // Once the file is loaded, set the result to the value
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: event.target.result, // Use event.target.result here
                }));
            };
            // Start reading the file
            reader.readAsDataURL(file);
        }
        else val = value;

        //שמאפיין את כל שדות הטופס (עדכון של האובייקט) useState-שמירת הערך שנכתב בשדה ל  
        setFormData((prevData) => ({
            ...prevData,
            [name]: val,
        }));

    };

    //מטפל באיקס של התיבת עיר
    const handleInputChange = (event, newInputValue) => {
        let vaildFlag;
        if (newInputValue) {
            vaildFlag = true;
        }
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            ['cityUser']: !vaildFlag,// Set error to true if the number is negative
        }));
    };

    //מטפל בשינוי של הרשימה הנגללת 
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
                                    required
                                    fullWidth
                                    autoFocus
                                    name="userName"
                                    id="userName"
                                    label="User Name"
                                    autoComplete="username"
                                    error={formErrors.userName}
                                    helperText={formErrors.userName ? 'User Name must contain foreign letters only, numbers and special characters. No more than 60 characters. ' : ""}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    id="password"
                                    label="Password"
                                    autoComplete="new-password"
                                    error={formErrors.password}
                                    helperText={formErrors.password ? "Password must be 7-12 characters long and include at least one special character, one uppercase letter, and one digit." : ''}
                                    onChange={handleChange}
                                    type={showPassword ? 'text' : 'password'}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="verifyPassword"
                                    id="verifyPassword"
                                    label="Verify Password"
                                    autoComplete="new-password"
                                    error={formErrors.verifyPassword}
                                    helperText={formErrors.verifyPassword ? 'Passwords do not match, try again' : ''}
                                    onChange={handleChange}
                                    type={showPassword ? 'text' : 'password'}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox name="ShowPassword" color="primary" onChange={handleShowPassword} />}
                                    label="Show Password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    style={{ "direction": "rtl" }}
                                    type='file'
                                    required
                                    fullWidth
                                    name="photoUser"
                                    id="photoUser"
                                    label="User Photo"
                                    error={formErrors.photoUser}
                                    helperText={formErrors.photoUser ? 'Only JPG or JPEG files are allowed.' : ""}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="firstName"
                                    id="firstName"
                                    label="First Name"
                                    autoComplete="given-name"
                                    error={formErrors.firstName}
                                    helperText={formErrors.firstName ? 'Only text are allowed.' : ""}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="lastName"
                                    id="lastName"
                                    label="Last Name"
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
                                    name="email"
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    error={formErrors.email}
                                    helperText={formErrors.email ? 'Invalid email' : ''}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    style={{ "direction": "rtl" }}
                                    type='date'
                                    required
                                    fullWidth
                                    name="dateUser"
                                    id="dateUser"
                                    label="Date"
                                    autoComplete="dateUser"
                                    error={formErrors.dateUser}
                                    helperText={formErrors.dateUser ? 'Age must be between 18 and 120 years old.' : ''}
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
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="streetName"
                                    id="streetName"
                                    label="Street Name"
                                    autoComplete="streetName"
                                    error={formErrors.streetName}
                                    helperText={formErrors.streetName ? 'Only Hebrew letters are allowed.' : ''}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type='number'
                                    required
                                    fullWidth
                                    name="homeNumber"
                                    id="homeNumber"
                                    label="Home Number"
                                    autoComplete="homeNumber"
                                    error={formErrors.homeNumber}
                                    helperText={formErrors.homeNumber ? 'Please enter a positive number' : ''}
                                    onChange={handleChange}
                                    inputProps={{
                                        min: "0" // מגביל את הערך המינימלי לספרה אחת
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Already have an account? Click to sign in"}
                                </Link>
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
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
