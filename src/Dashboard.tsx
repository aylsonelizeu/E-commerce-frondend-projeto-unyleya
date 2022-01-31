
//Projeto Full Stack destinado atividade Unyleya - Aylson Elizeu
// Backend - Springboot com integraacao Frontend - Framework React com banco Mongodb

import axios from "axios";
import React, { Component } from "react";
import { IoCardOutline, IoAdd, IoAtSharp  } from "react-icons/io5";
import { Button, Card, CardBody, CardFooter, CardTitle, Col, Container, Navbar, NavbarBrand, Row } from "reactstrap";
import { CreationModal } from "./CreationModal";



interface MyState {
    isOpen: boolean,
    products: [];

}

export class Dashboard extends Component<{}, MyState> {

    state: MyState = {
        isOpen : false,
        products: []
    };

            componentDidMount (){
                axios.get('http://localhost:7070/list')
                .then(res => {
                   const products =  res.data
                    this.setState({products})
                })
            }

toggle = () =>{
    
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
}

render(){
    return (
        <div>
            <Navbar color="dark" ligth mb-2>
                <NavbarBrand className="text-white">
                    <IoAtSharp className="font-size-xxl"/>
                    <span className="font-size-l ml-3"> E-COMMERCE </span>
                </NavbarBrand>
            </Navbar>
        


        <Container className="mt-3">
            <Row>
               <Col sn='4'>
                   <Card body>
                   <CardTitle tag="h5">
                       <IoAdd className="font-size-xl"/> Cadastro de Produtos
                   </CardTitle>            
                   </Card>
                </Col> 
            </Row>

        </Container>

        <CreationModal isOpen = {this.state.isOpen} toggle = {this.toggle}></CreationModal>

        <Container className="mt-4">
            <Row>
                <Col sn="12">
                    <Button block color="success" onClick= {this.toggle}>
                        <span className="font-size-l">Cadastrar um novo Produto</span>
                    </Button>
                </Col>
            </Row>

        </Container>

        <Container className="mt-5">
            {this.state.products.map(product =>renderProduct(product))}
        </Container>

        </div>

    );

    }
}

        function renderProduct(product) {
            return (
                <Row>
                    <Col sm="12">
                        <Card body>
                            <CardTitle tag="h5">
                                <IoCardOutline className="font-size-xl" />
                                {product.productName}
                            </CardTitle>
                            <CardBody>
                                <Row>
                                    <Col sm="4" className="text-center">
                                    <span className="font-weight-bold"></span>
                                    <span> Produto cadastrado </span>
                                    </Col>
                                </Row>
                            </CardBody>
    
                            <CardFooter>
                                <Row>
                                    <Col sm-6>
                                        <Button block outline color="primary">
                                            Editar Produto                                
                                        </Button>
                                    </Col>
                                    <Col sm-6>
                                        <Button block outline color="danger" onClick={() => deleteProduct(product.id)}>
                                            Remover
                                        </Button>
                                    </Col>
                                </Row>
                            </CardFooter>
    
                        </Card>
                    </Col>
    
                </Row>
            );
    
        }


function deleteProduct(id: any): void {
    axios.post(`http://localhost:7070/delete/${id}`)
}

