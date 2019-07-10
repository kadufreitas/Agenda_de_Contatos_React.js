import React, { Component } from 'react'

import {Modal, Button, Container } from 'react-bootstrap';
import './contatoForm.css'

//Componente responsavel por gerar o modal de exclusão 
//do contato e dispara a função deleteContato que dispara a função provida no props 
export default class AddContato extends Component{
    constructor(props){
        super(props);
        this.state = {
            modalShow : false,  
        };
    }

    //Dispara a função props.delete passando o contato a ser deletado
    deleteContato =(event) =>{
        event.preventDefault();
        this.props.deleteContato(this.props.contato);
        this.modalClose();
    }

    //seta modalShow para false fechando o modal
    modalClose = () => this.setState({modalShow:false});
    
    render(){
        return (
            <div>
                <Button
                    variant="success"
                    className="actionButton"
                    onClick={() => this.setState({ modalShow:true })}
                >
                    {this.props.children}
                </Button>

                <Modal
                    show={this.state.modalShow}
                    aria-labelledby="contained-modal-title-vcenter"
                    onHide={this.modalClose}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Excluir Contato
                        </Modal.Title>
                    </Modal.Header>
                    <Container>
                        <Modal.Body>
                            Deseja realmente excluir o contato?
                        </Modal.Body>
                    </Container>
                    <Modal.Footer>
                        <Button variant="link" onClick={this.modalClose}>Cancelar</Button>
                        <Button variant="danger" type="button" onClick={this.deleteContato}>Excluir</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}