import React, { Component } from 'react'
import {Table, Card} from 'react-bootstrap'
import { MdEdit } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import ContatoForm from '../contato/contatoForm'
import DeleteContato from '../contato/contatoDelete'
import './contatoList.css'

//Componente responsavel por renderizar a lista de contatos
export default class ContatoList extends Component{    
    //Busca a string passada dentro da lista de contatos comparando com o nome dos contatos
    searchContato(list, str){
        return list.filter((obj) => {
            if (obj.nome.search(new RegExp(str, "i")) !== -1) {
                return true;
            }
            return false;
        });
    }

    //renderiza a lista de contatos de forma condicional, se uma string de busca for passada 
    //então renderiza a lista com os contato que atendem a busca, se não renderiza a lista completa
    renderList = () => {                
        const contatos = (this.props.str !== '')? 
            this.searchContato(this.props.list, this.props.str) : this.props.list;
        return contatos.map((contato) =>{
            return (
                <IsNew 
                    key={contato.id} 
                    idNewContato={this.props.idNewContato}
                    contato={contato}
                >    
                    <td>
                        <div className="contato-icon" style={{backgroundColor : contato.bgColor}}>
                            {contato.nome.charAt(0)}
                        </div>
                    </td>
                    <td>{contato.nome}</td>
                    <td>{contato.email}</td>
                    <td>{contato.telefone}</td>
                    <td>
                        <div className="actions">
                            <ContatoForm
                                operation="Editar Contato"
                                editcontato={this.props.editcontato}
                                stylebutton="actionButton"
                                contato={contato}
                                edit={true}
                            >
                                < MdEdit />
                            </ContatoForm>
                            <DeleteContato 
                                deleteContato={this.props.deleteContato}
                                contato={contato}
                            >
                                <MdDelete />
                            </DeleteContato>
                        </div>
                    </td>
                </IsNew>   
            )})
    }

    render(){ 
        return (
            <Card className="card-table">
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Contatos</th>
                            <th>E-mail</th>
                            <th>Telefone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}        
                    </tbody>
                </Table>
            </Card>
        )
    }
}

//aplica a classe new-contato na linha onde estive o idNewContato 
function IsNew(props){
    const contato = props.contato;
    
    if (props.idNewContato === contato.id) {
        return (
            <tr className="new-contato">
                {props.children}
            </tr>
        )
    }else{
        return (
            <tr>
                {props.children}
            </tr>
        )
    }
}   