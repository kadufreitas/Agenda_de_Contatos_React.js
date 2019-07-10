import React, { Component } from 'react'

import {Modal, Button, Form, Container } from 'react-bootstrap';
import './contatoForm.css'

//Componente resposavel por exibir o modal para adição de um novo contato,
//assim como exibi um modal já preenchido com um contato existente
export default class AddContato extends Component{
    constructor(props){
        super(props);
        const contato = this.props.contato || false;
        //inicializa o state.contato com os valores do contato passado
        //ou inicializa com valores vazios caso nenhum tenha sido passado
        this.state = {
            contato: {
                id : contato.id || '', 
                nome : contato.nome || '' ,
                email : contato.email || '',
                telefone : contato.telefone || '',
                bgColor: contato.bgColor || null
            }, 
            modalShow : false,  
            disableButton : true,
            edit : props.edit || false
        };
    }

    //Captura o evento de submit do form e verifica se a ação de edit foi passada
    handleSubmit =(event) =>{
        event.preventDefault();
        if (this.state.edit) {
            this.editSubmit();
        }else{
            this.addSubmit();
        }
    }

    //retorna um das cores dentro da lista de cores disponivel
    getRandomColor = () =>{
        const listColors = [
            '#f44336',
            '#E91E63',
            '#9C27B0',
            '#673AB7',
            '#3F51B5',
            '#2196F3',
            '#03A9F4',
            '#00BCD4',
            '#009688',
            '#4CAF50',
            '#8BC34A',
            '#CDDC39',
            '#FFEB3B',
            '#FFC107',
            '#FF9800',
            '#FF5722',
            '#795548',
            '#9E9E9E',
            '#607D8B'
        ];
        return listColors[Math.floor(Math.random()*listColors.length)];
    }

    //instancia um novo contato com um ID unico e passa para função addContato e fecha o modal
    addSubmit = () =>{
        const _id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();                
        const color = this.getRandomColor();
        const contato = {...this.state.contato, id: _id,bgColor: color}
        this.props.addcontato(contato);
        
        this.modalClose();
        this.clearForm();
    }

    //passa o contato editado para funçao editContato
    editSubmit = () =>{        
        const contato = { ...this.state.contato }        
        this.props.editcontato(contato);        
        this.modalClose();
    }

    //Atualiza o valores passados pelos inputs do form no estado do componente
    handleInputOnChange = (event) =>{
        const value = event.target.value;
        const nome = event.target.name;
        const contato = this.state.contato;
        contato[nome] = value;

        this.setState({contato});
    }

    //Habilita o botão se algum valor for passado dentro dos inputs
    handleDisableButton = () =>{
        if (this.state.contato.nome === '' && this.state.contato.email === '' && this.state.contato.telefone === '') {
            this.setState({disableButton: true});
        }else{
            this.setState({disableButton: false});
        }
    }

    //Limpa o formilario
    clearForm = () => {
        const contato = this.state.contato;
        for (const key in contato) {
            contato[key] = '';
        }
    }

    //Fecha o modal
    modalClose = () => this.setState({modalShow:false});
    
    render(){
        return (
            <div>
                <Button
                    variant="success"
                    // className="button-add-contact"
                    className={this.props.stylebutton}
                    onClick={() => this.setState({ modalShow:true })}
                >
                    {/* <GoPlusSmall className="icon"/>Criar Contato */}
                    {this.props.children}
                </Button>

                <Modal
                    show={this.state.modalShow}
                    aria-labelledby="contained-modal-title-vcenter"
                    onHide={this.modalClose}
                    centered
                >
                    <Form onSubmit={this.handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                {this.props.operation}
                            </Modal.Title>
                        </Modal.Header>
                        <Container>
                            <Modal.Body>
                                <Form.Group controlId="formNome">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control 
                                            onChange={this.handleInputOnChange}
                                            onKeyUp={this.handleDisableButton}  
                                            value={this.state.contato.nome} 
                                            type="text"  
                                            name="nome"
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>E-mail</Form.Label>
                                        <Form.Control 
                                            onChange={this.handleInputOnChange}
                                            onKeyUp={this.handleDisableButton}  
                                            value={this.state.contato.email} 
                                            type="email"
                                            name="email" 
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formTelefone">
                                        <Form.Label>Telefone</Form.Label>   
                                        <Form.Control 
                                            onChange={this.handleInputOnChange} 
                                            onKeyUp={this.handleDisableButton}  
                                            value={this.state.contato.telefone} 
                                            type="text" 
                                            name="telefone"
                                            required/>
                                    </Form.Group>
                            </Modal.Body>
                        </Container>
                        <Modal.Footer>
                            <Button variant="link" onClick={this.modalClose}>Cancelar</Button>
                            <Button variant="danger" type="submit" disabled={this.state.disableButton}>Salvar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}