import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import withRouter from './withRouter';

class UpdateEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.params.id,
            firstName :'',
            lastName :'',
            emailId :''
        }
        
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            let employee = res.data;
            this.setState({firstName:employee.firstName,
                lastName: employee.lastName,
                emailId: employee.emailId
            });
        });    
    }

    updateEmployee = (e) =>{
        e.preventDefault();
        let employee = {firstName : this.state.firstName, lastName : this.state.lastName, emailId : this.state.emailId};
        console.log('employee =>' + JSON.stringify(employee));
        
        EmployeeService.updateEmployee(employee, this.state.id).then(res =>{
            const { navigate } = this.props;
            navigate('/employees')
        });
        
    }



    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value})
    }

    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value})
    }

    changeEmailHandler = (event) => {
        this.setState({emailId: event.target.value})
    }

    cancel(){
        const { navigate } = this.props;
        navigate('/employees');
    }

    render() {
        return (
            <div>
                    <div className='container'>
                        <div className='row'>
                            <div className='card col-md-6 offset-md-3 offset-md-3'>
                                <h3 className='text-center'>Update Employee</h3>
                                <div className='card-body'>
                                    <form action="">
                                       <div className='from-group'>
                                        <label>First Name: </label>
                                        <input placeholder='First Name' name='firstName' className='from-control' 
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                        </div> <br />
                                        <div className='from-group'>
                                        <label>Last Name: </label>
                                        <input placeholder='Last Name' name='lastName' className='from-control' 
                                            value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                        </div> <br />
                                        <div className='from-group'>
                                        <label>Email Address: </label>
                                        <input placeholder='Email Address' name='emailId' className='from-control' 
                                            value={this.state.emailId} onChange={this.changeEmailHandler} />
                                        </div> <br />

                                        <button className='btn btn-success' onClick={this.updateEmployee}>Update</button>
                                        <button className='btn btn-danger' onClick={this.cancel.bind(this)} style = {{marginLeft:'10px'}}>Cancel</button>
                                    </form>
                                </div>
                            
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default withRouter(UpdateEmployeeComponent);