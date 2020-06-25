import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter,Redirect} from 'react-router-dom'
import { logoutUser } from '../actions/authActions';
import axios from 'axios'
import tennis from '../images/tennis.jpg'
import pool from '../images/pool.jpg'
import badminton from '../images/badminton.jpg'
import gym from '../images/gym.jpg'
import club from '../images/club.jpg'
import cycle from '../images/cycle.jpg'
import AuthFeedBack from './AuthFeedBack'
import FacilityCard from './FacilityCard'
import Loader from './Loader'
import { Button } from '@material-ui/core';

class DashBoard extends Component{


    state={
        open: false,
        open1: false,
        load: false,
        success:"",
        fail:""
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

    handleLogout = (e)=> {
        e.preventDefault();
        this.props.logoutUser();
    }

    BookFacility = (Facility,BookedFrom,BookedTo)=>{
        this.setState({load:true})

        if(BookedFrom>=BookedTo)
        {
            this.setState({load:false,open1:true,fail:"Please Choose the Slot correctly."})
        }
        else
        {
            axios.post("https://facility-book.herokuapp.com/book",{
                "FacilityType":Facility,
                BookedFrom,
                BookedTo
            }).then(res=>{
                if(res.data==="Slot Booked")
                {
                    this.setState({load:false,success:res.data,open:true})
                }
                else
                {
                    this.setState({load:false,fail:res.data,open1:true})
                }
            })
        }
    }

    render()
    {


        if(!this.props.auth.isAuthenticated)
            return <Redirect to="/login" />

        const facilities = [
            {
                name:"Tennis Court",
                image:tennis
            },
            {
                name:"Swimming Pool",
                image:pool
            },
            {
                name:"Badminton Court",
                image:badminton
            },
            {
                name:"Gym",
                image:gym
            },
            {
                name:"Club House",
                image:club
            },
            {
                name:"Cycle Tracks",
                image:cycle
            }
        ]

        return (
            <div style={{marginBottom:"50px",display:"flex",alignItems:"center",flexDirection:"column"}}>

                <Button
                    onClick={this.handleLogout}
                    variant="contained"
                    color="primary"
                    style={{marginTop:"24px",marginRight:"2%",position:"fixed",right:0}}
                >
                    LOGOUT
                </Button>

                <h1 style={{marginTop:"50px"}}>Available Facilities</h1>
                {facilities.map(facility=>{
                    return <FacilityCard key={facility.name} facility={facility} Book={this.BookFacility} />
                })}

                <AuthFeedBack 
                    txt={this.state.success}
                    open={this.state.open} 
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    severity="success" 
                />
                <AuthFeedBack 
                    txt={this.state.fail}
                    open={this.state.open1} 
                    autoHideDuration={3000}
                    onClose={this.handleClose1}
                    severity="error" 
                />

                <Loader open={this.state.load} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
  

export default connect(mapStateToProps, { logoutUser })(withRouter(DashBoard));
