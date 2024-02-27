import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';

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

export default function EditDetails(props) {

  //לבדוק את היוזר
  let currentUser = props.user; //להתייחס ליוזר הספציפי שמחובר
  if (!currentUser) {
    props.showEditDetail(false);
  }

  // אובייקט של הטופס לפי השדות של היוזר מהסאשן סטוראג - useState 
  const [formData, setFormData] = useState({
    ...currentUser
  });

  //בדיקת שגיאות - useState
  const [formErrors, setFormErrors] = useState({
    userName: false,
    password: false,
    photoUser: false,
    firstName: false,
    lastName: false,
    dateUser: false,
    cityUser: false,
    streetName: false,
    homeNumber: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
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
  //פונקציה הבודקת האם הקלט הוא טקסט בלבד (בשביל שם פרטי ומשפחה בטופס)
  const validateTextOnly = (value) => {
    return ((/^[a-zA-Zא-ת]*$/.test(value)) && value != '');
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const isUserNameValid = validateUserName(formData.userName);
    const isPasswordValid = validatePassword(formData.password);
    const isFirstNameValid = validateTextOnly(formData.firstName);
    const isLastNameValid = validateTextOnly(formData.lastName);
    const isDateValid = validateDate(formData.dateUser);
    const isStreetValid = ((/^[א-ת\s]*$/.test(formData.streetName)) && (formData.streetName != ''));
    const isHomeNumberValid = ((/^\d+$/.test(formData.homeNumber)) && (formData.homeNumber != ''));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      userName: !isUserNameValid,
      password: !isPasswordValid,
      firstName: !isFirstNameValid,
      lastName: !isLastNameValid,
      dateUser: !isDateValid,
      streetName: !isStreetValid,
      homeNumber: !isHomeNumberValid,

    }));

    const fields = Object.keys(formData);
    // בדיקה שיש לפחות שדה אחד שהערך שלו ריק, לא כולל התמונה
    if (fields.some(field => field !== 'photoUser' && formData[field].trim().length === 0)) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Details!',
        text: 'All fields must be filled in except for the image',
      });
    }
    else if (isUserNameValid && isPasswordValid && isFirstNameValid &&
      isLastNameValid && isDateValid && isStreetValid && isHomeNumberValid) {
      Swal.fire("Changed Successfully!", "User changed", "success").then((result) => {
        // Check if the user clicked the "OK" button
        if (result.isConfirmed) {
          props.editUser(formData);
        }
      });

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
            <BorderColorIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit your proflie
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
                  value={formData.userName}
                  label="User Name"
                  autoComplete="username"
                  onChange={handleChange}
                  error={formErrors.userName}
                  helperText={formErrors.userName ? 'User Name must contain foreign letters only, numbers and special characters. No more than 60 characters. ' : ""}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  id="password"
                  value={formData.password}
                  label="Password"
                  autoComplete="new-password"
                  error={formErrors.password}
                  helperText={formErrors.password ? "Password must be 7-12 characters long and include at least one special character, one uppercase letter, and one digit." : ''}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  onChange={handleChange}
                  //value={formData.photoUser} //אי אפשר לאור בעיות אבטחה
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  onChange={handleChange}
                  error={formErrors.firstName}
                  helperText={formErrors.firstName ? 'Only text are allowed.' : ""}
                  value={formData.firstName}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  onChange={handleChange}
                  value={formData.lastName}
                  error={formErrors.lastName}
                  helperText={formErrors.lastName ? 'Only text are allowed.' : ""}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  onChange={handleChange}
                  error={formErrors.dateUser}
                  value={formData.dateUser}
                  helperText={formErrors.dateUser ? 'Age must be between 18 and 120 years old.' : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={countries} // הגדרת האפשרויות לרשימה של מדינות
                  getOptionLabel={(option) => option} // כיצד להציג את כל אפשרות
                  onChange={handleChange_Autocomplete_City}//מטפל ברשימה הנגללת 
                  onInputChange={handleInputChange}//מטפל באיקס של התיבה
                  value={formData.cityUser}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      fullWidth
                      label="City User"
                      type="text"
                      name="cityUser"
                      autoComplete="cityUser"
                      error={formErrors.cityUser}
                      helperText={formErrors.cityUser ? 'You must choose a city' : ''}
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                  onChange={handleChange}
                  value={formData.streetName}
                  helperText={formErrors.streetName ? 'Only Hebrew letters are allowed.' : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  value={formData.homeNumber}
                  inputProps={{
                    min: "0" // מגביל את הערך המינימלי לספרה אחת
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirm
            </Button>
            <Button
              fullWidth
              onClick={() => props.showEditDetail(false)}
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#DC143C', // צבע רקע רגיל
                color: 'white', // צבע טקסט
                '&:hover': {
                  backgroundColor: '#B22222', // צבע רקע במצב hover
                  // אפשר גם לשנות את צבע הטקסט במצב hover אם רוצים
                  '@media (hover: none)': {
                    backgroundColor: '#DC143C', // צבע רקע רגיל ללא אפקט ה-hover במכשירים שאין בהם hover
                  }
                }
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider >
  )
}
