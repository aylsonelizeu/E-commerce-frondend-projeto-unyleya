//Projeto Full Stack destinado atividade Unyleya - Aylson Elizeu
// Backend - Springboot com integraacao Frontend - Framework React com banco Mongodb

import axios from "axios";
import { Component } from "react";
import { Col, Form, Row, Modal, ModalHeader, Button, ModalBody, } from "reactstrap";

type MyProps ={
    isOpen : boolean,
    toggle
}

export class CreationModal extends Component<MyProps>{

    handleSubmit = (event) => {
       
        event.preventDefault()
        const data = new FormData(event.target)

        const product = {
            productName : data.get("productName")
        }
        axios.post("http://localhost:7070/create", product)
        this.props.toggle();

    }

    render(){
        

        return(
        
        <Modal ispOpen={this.props.isOpen} toggle={this.props.toggle}>
            <ModalHeader toggle={this.props.toggle}>
                Cadastrar um novo produto
            </ModalHeader>
            
            <ModalBody>
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col>
                    <label>Nome do Produto</label>
                    </Col>
                    <Col>
                    <input id="productName" name="productName" type="text"/>
                    </Col>
                </Row>
                <Button color="primary">Cadastrar um produto</Button>
            </Form>

            </ModalBody>

        </Modal>
        )
    }
}