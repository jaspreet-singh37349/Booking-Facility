import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link,Redirect,withRouter} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AuthFeedBack from '../AuthFeedBack'
import Loader from '../Loader'
import { registerUser } from '../../actions/authActions';
import { connect } from 'react-redux';


class SignUp extends React.Component {

    state = {
        auth:false,
        load:false,
        Fname: '',
        Lname: '',
        email: '',
        password: '',
        password2: '',
        open: false,
        open1: false,
      };

    successs = () =>{
        this.setState({open:true,load:false})
    }
    fail = () =>{
        this.setState({load:false,open1:true})
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open:false})
    };

    handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open1:false})
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({load:true})
    
        const newUser = {
          Fname: this.state.Fname,
          Lname: this.state.Lname,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
        };
    
        this.props.registerUser(newUser,this.successs,this.fail, this.props.history);
    }

    render()
    {

        console.log(this.props)

        let auth=this.state.auth||this.props.auth
        
        if(auth===true)
        {
            return (
                <Redirect to="/" />
            )
        }

        //console.log(this.state)
        const {errors} = this.props
        return (
            <div>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                    <div style={{marginTop: "64px",display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                        {!this.state.open? 
                            <Avatar style={{margin: "8px",backgroundColor: "#dc004e"}}>
                                <LockOutlinedIcon />
                            </Avatar>:
                            <Avatar style={{margin: "8px",backgroundColor: "#4caf50"}}>
                                <LockOpenIcon />
                            </Avatar>
                        }
                        <Typography component="h1" variant="h5">
                        Sign up
                        </Typography>
                        <form style={{ width: '100%', marginTop: "24px"}} noValidate onSubmit={this.onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                error={errors.Fname!==undefined}
                                helperText={errors.Fname?errors.Fname:null}
                                autoComplete="fname"
                                name="Fname"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                error={errors.Lname!==undefined}
                                helperText={errors.Lname?errors.Lname:null}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="Lname"
                                autoComplete="lname"
                                onChange={this.handleChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                error={errors.email!==undefined}
                                helperText={errors.email?errors.email:null}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={this.handleChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                error={errors.password!==undefined}
                                helperText={errors.password?errors.password:null}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                error={errors.password2!==undefined}
                                helperText={errors.password2?errors.password2:null}
                                variant="outlined"
                                required
                                fullWidth
                                name="password2"
                                label="Confirm Password"
                                type="password"
                                id="password2"
                                autoComplete="current-password"
                                onChange={this.handleChange}
                            />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{marginTop:"24px",marginBottom:"16px"}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                            <Link to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                            </Grid>
                        </Grid>
                        </form>
                        <AuthFeedBack 
                            txt="Successfully Registered"
                            open={this.state.open} 
                            autoHideDuration={1000}
                            onClose={this.handleClose}
                            severity="success" 
                        />
                        <AuthFeedBack 
                            txt="Error Occurred"
                            open={this.state.open1} 
                            autoHideDuration={3000}
                            onClose={this.handleClose1}
                            severity="error" 
                        />
                        <Loader open={this.state.load} />
                    </div>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  

export default connect(mapStateToProps, { registerUser })(withRouter(SignUp));
  