import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AuthFeedBack from '../AuthFeedBack'
import { loginUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import Loader from '../Loader'


class Login extends React.Component {

    state = {
        auth:false,
        email: '',
        password: '',
        open: false,
        open1: false,
        load: false,
    }

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

        const userData = {
          email: this.state.email,
          password: this.state.password
        };
    
        this.props.loginUser(userData,this.successs,this.fail);
    }

    render()
    {

        const {errors} = this.props
        //console.log(this.state)
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
                        Sign in
                        </Typography>
                        <form style={{width: '100%', marginTop: "8px"}} noValidate onSubmit={this.onSubmit}>
                        <TextField
                            error={errors.Error!==undefined}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={this.handleChange}
                        />
                        <TextField
                            error={errors.Error!==undefined}
                            helperText={errors.Error?errors.Error:null}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.handleChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{marginTop:"24px",marginBottom:"16px"}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            <Link to="/">
                                Forgot password?
                            </Link>
                            </Grid>
                            <Grid item>
                            <Link to="/signup">
                                Don't have an account? Sign Up
                            </Link>
                            </Grid>
                        </Grid>
                        </form>
                        <AuthFeedBack 
                            txt="Successfully Logged In"
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
  
export default connect(mapStateToProps, { loginUser })(Login);