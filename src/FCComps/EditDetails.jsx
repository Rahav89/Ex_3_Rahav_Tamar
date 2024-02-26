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
  let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  if (!currentUser) {
    props.showEditDetail(false);
  }


  // אובייקט של הטופס - useState 
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    photoUser: null,
    firstName: '',
    lastName: '',
    email: '',
    dateUser: '',
    cityUser: '',
    streetName: '',
    homeNumber: 0,
    ...currentUser
  });

  // Update session storage whenever formData changes
  useEffect(() => {
    sessionStorage.setItem('currentUser', JSON.stringify(formData));
  }, [formData])

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
    // setFormErrors((prevErrors) => ({
    //   ...prevErrors,
    //   ['cityUser']: !vaildFlag,// Set error to true if the number is negative
    // }));
  };

  //מטפל בשינוי של הרשימה הנגללת 
  const handleChange_Autocomplete_City = (event, newValue) => {
    setFormData(prevData => ({
      ...prevData,
      ['cityUser']: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically handle the submission, e.g., sending data to a server
    console.log(formData); // For demonstration purposes
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
                  value={currentUser ? currentUser.userName : ""}
                  label="User Name"
                  autoComplete="username"
                  onChange={handleChange}
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
                  value={currentUser ? currentUser.password : ''}
                  label="Password"
                  autoComplete="new-password"
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
                  //value={currentUser ? currentUser.photoUser : ''}
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
                  value={currentUser ? currentUser.firstName : ''}
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
                  value={currentUser ? currentUser.lastName : ''}
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
                  value={currentUser ? currentUser.dateUser : ''}
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
                  value={currentUser ? currentUser.cityUser : ''}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      fullWidth
                      label="City User"
                      type="text"
                      name="cityUser"
                      autoComplete="cityUser"
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
                  onChange={handleChange}
                  value={currentUser ? currentUser.streetName : ''}
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
                  // id="homeNumber"
                  id="outlined-homeNumber"
                  label="Home Number"
                  autoComplete="homeNumber"
                  onChange={handleChange}
                  // defaultValue="Home Number"
                  value={currentUser ? currentUser.homeNumber : ''}
                  inputProps={{
                    min: "0" // מגביל את הערך המינימלי לספרה אחת
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
