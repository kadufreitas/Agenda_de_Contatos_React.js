import React, {Component} from 'react'
import book from '../assets/ic-book.svg'

import './agenda.css'
import ContatoForm from '../contato/contatoForm'
import SimpleStorage from 'react-simple-storage'
import ContatoList from '../contato/contatoList'
import Navbar from '../template/navbar'
import ShowComponent from '../utils/showComponent'
import { GoPlusSmall } from 'react-icons/go'

//Componente agenda faz o controle dos contatos,
//passa os valores necessarios para os componentes filhos
//e mantem o estado da agenda atualizado para quando esta 
//for vazia ou tiver elementos para serem exibidos
export default class Agenda extends Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            str_search : '',
            agendaEmpty : true,
            idNewContato : null
        };
        this.initialState = this.state;
    }

    //Contador para tirar a indicação do novo contato após 10s
    newContactTime = () => {        
        setTimeout(
            () => { 
                this.setState({idNewContato : null});
            }
        , 10000);
    }    

    //verifica se o array de contatos está vazio, se não estiver o state é alterado
    agendaIsEmpty = () => {        
        if (this.state.list.length !== 0) {
            this.setState({ agendaEmpty:false })
        }
    }

    //Adiciona um novo contato na lista
    handleAddContato = (contato) => {
        const list = [...this.state.list];
        const idNewContato = contato.id;
        
        list.push(contato);     
        this.setState({...this.state, list, agendaEmpty:false, idNewContato});
        this.newContactTime();
    }

    //Edita um contato já existente
    handleEditContato = (contato) => {
        const list = [...this.state.list];
        const contato_index = this.findContato(contato.id, list);

        list[contato_index] = contato;
        this.setState({list});
    }

    //Deleta um contato
    handleDeleteContato = (contato) => {
        const list = this.state.list;       
        const new_list = list.filter((obj) => {
            if (contato.id === obj.id) {
                return false;
            }
            return true;
        });

        this.setState({list : new_list});
        if (new_list.length === 0) {
            this.setState({ agendaEmpty:true })
        }        
    }

    //Altera o valor da string de busca atual
    handleSearchContato = (str) => {
        this.setState({str_search : str});        
    }

    //encontra o contato com este id dentro do array e retorna seu index
    findContato = (id, arr) => {
        return arr.findIndex((element, index, array) => {
            if (id === element.id) {
                return true;
            }
            return false;
        })
    }


    render(){
        return (
            <div id="agenda">
                <SimpleStorage 
                    parent={this} 
                    onParentStateHydrated={this.agendaIsEmpty} 
                    blacklist={['idNewContato','str_search','agendaEmpty']}
                />
                <Navbar 
                    searchContato={this.handleSearchContato}
                >
                    <ShowComponent show={!this.state.agendaEmpty} >
                        <ContatoForm
                            operation="Adicionar Contato"
                            addcontato={this.handleAddContato}
                            stylebutton="button-add-contact"
                        >
                            <GoPlusSmall className="icon"/>Criar Contato
                        </ContatoForm>
                    </ShowComponent>
                </Navbar>
                <HasContact 
                    isEmpty={this.state.agendaEmpty}
                    list={this.state.list}
                    handleAddContato={this.handleAddContato}
                    handleEditContato={this.handleEditContato}
                    handleDeleteContato={this.handleDeleteContato}
                    idNewContato={this.state.idNewContato}
                    str_search={this.state.str_search}
                />        
            </div>
        )
    }
}

function HasContact(props) {
    if (props.isEmpty) {
      return (
        <div className="emptyBook">
            <img src={book} alt="book ilustration" />
            <span>Nenhum contato foi craido ainda</span>
            <ContatoForm
                operation="Adicionar Contato"
                addcontato={props.handleAddContato}
                stylebutton="button-add-contact"
            >
                <GoPlusSmall className="icon"/>Criar Contato
            </ContatoForm>
        </div>
      );
    }
    return (
        <ContatoList 
            list={props.list}
            editcontato={props.handleEditContato}
            deleteContato={props.handleDeleteContato}
            idNewContato={props.idNewContato}
            str={props.str_search}
        />
    );
}