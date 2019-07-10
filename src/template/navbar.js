import React, { Component } from 'react'
import {Navbar, Form, FormControl, Button, Nav} from 'react-bootstrap'
import { MdSearch } from "react-icons/md";
import './navbar.css'

import logo from '../assets/ic-logo.svg'

//Componente responsavel por exibir a navbar e passar
//os valores inseridos no input para a função searchContato 
export default class MyNavbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            str: ''
        }
    }

    //Captura a entrada do input repassa para a função searchContato tratar
    handleOnChangeInput = (event) => {
        const str = event.target.value;
        this.setState({str});
        this.props.searchContato(str);      
    }

    render(){
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#"><img src={logo} alt="Logo da aplicação"></img></Navbar.Brand>
                <Nav>
                    {this.props.children}
                    <Form inline className="search-custom">
                        <FormControl 
                            type="text" 
                            placeholder="Buscar..." 
                            value={this.state.str}
                            onChange={this.handleOnChangeInput}
                            className="mr-sm-2" 
                        />
                        <Button
                            variant="default"
                            className="actionButton"
                        >
                            <MdSearch />
                        </Button>
                    </Form>
                </Nav>
            </Navbar>
        )
    }
}