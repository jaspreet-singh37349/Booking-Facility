import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import Calender from './Calendar'
import Button from '@material-ui/core/Button';

export default class FacilityCard extends Component {

    state={
        BookedFrom: new Date(),
        BookedTo: new Date()
    }

    handleBookedFrom = (date) =>{
        this.setState({BookedFrom:date})
    }
    handleBookedTo = (date) =>{
        this.setState({BookedTo:date})
    }

    render() {
        
        return (
        <Card style={{marginTop:"50px",width:"80%"}}>
            <h3 style={{marginLeft:"30px"}}>{this.props.facility.name}</h3>
            <div style={{display:"flex",flexWrap:"wrap"}}>

                <img style={{width:"300px",height:"200px",marginTop:"10px"}} src={this.props.facility.image} alt="aaa" />
                <div style={{border:"1px solid black",width:"200px",marginLeft:"30px",marginTop:"10px"}}>
                    <div style={{paddingLeft:"30px",paddingTop:"20px"}}>
                        Booking From DATE & TIME
                        <Calender date={this.state.BookedFrom} handleDateChange={this.handleBookedFrom} />
                    </div>
                </div>
                <div style={{border:"1px solid black",width:"200px",marginLeft:"30px",marginTop:"10px"}}>
                    <div style={{paddingLeft:"30px",paddingTop:"20px"}}>
                        Booking To DATE & TIME
                        <Calender date={this.state.BookedTo} handleDateChange={this.handleBookedTo} />
                    </div>
                </div>
                <Button
                    onClick={()=>{this.props.Book(this.props.facility.name,this.state.BookedFrom,this.state.BookedTo)}}
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{marginTop:"24px",marginBottom:"16px",marginLeft:"10%",marginRight:"10%"}}
                >
                    Book
                </Button>
            </div>
        </Card>
        )
    }
}