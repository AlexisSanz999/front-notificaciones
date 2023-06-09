import React, { useState } from "react";
import axios from "axios";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { useSelector } from 'react-redux';
import { createPost } from '../../Redux/actions';
import { useDispatch } from "react-redux";
import Estrellas from "../Comments/Estrellas";
import './estrellas.css'

// reactstrap components
import {
  Button,
  Card,
  FormFeedback,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  FormText,
  Modal,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel,
} from "reactstrap";

// core components
import NavBrain from "../NavBar/NavBrain";
import Footer from "../Footer/Footer";

const carouselItems = [
  {
    src: require("../../assets/img/brain-three.jpg"),
    altText: "Slide 1",
    caption: "Selecciona tu Imágen",
  },
  {
    src: require("../../assets/img/brain-two.jpg"),
    altText: "Slide 2",
    caption: "Carga tu Imágen",
  },
  {
    src: require("../../assets/img/brain-one.jpg"),
    altText: "Slide 3",
    caption: "Deja que la IA se encarge del resto",
  },
];


let ps = null;

export default function Patient() {



  //parte commentar funciones y constantes ----------------------------------------------


  const comments = useSelector((state) => state.comments)
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState(null);
  


{//------------------------------------------------------------------------------------------------------------

}



  const handleSaveRating = (rating) => {
    setRating(rating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {

    event.preventDefault();
    console.log(comment);
    console.log(rating);
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    dispatch(createPost({ texto: comment, puntuacion: rating, usuario: activeUser.usuario, id: activeUser.id }));
    setNewComment({
      usuario_paciente: activeUser.usuario,
      comentario: comment,
      puntuacion: rating
    });

    setComment('')
    setRating('')
    console.log(activeUser.usuario);
  };

  //------------------------------------------------------------------------------------------------------------------------

  const [demoModal, setDemoModal] = React.useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  function uploadImage(imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile);

    return axios
      .post("http://localhost:5000/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data.url);
  }

  const handleFileInputChange = (event) => {
    const file = setSelectedFile(event.target.files[0]);
    uploadImage(file)
      .then((imageUrl) => {
        // Usa la URL pública devuelta por Flask
        console.log(imageUrl);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Obtener los valores de entrada del usuario
    const usuario = activeUser.usuario; // este valor debe estar disponible en tus props
    const current_password = document.getElementById("current-password").value;
    const new_password = document.getElementById("new-password").value;

    // Enviar una solicitud HTTP POST al servidor Python
    axios
      .post("http://localhost:5000/password", {
        usuario: usuario,
        current_password: current_password,
        new_password: new_password,
      })
      .then((response) => {
        // Manejar la respuesta del servidor Python si la solicitud se completa correctamente
        console.log(response);
      })
      .catch((error) => {
        // Manejar cualquier error si la solicitud no se completa correctamente
        console.log(error);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Selecciona un archivo para subir.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("http://localhost:5000/detection", formData)
      .then((response) => {
        setResult(response.data);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setResult(null);
        setError("Hubo un error al procesar la imagen.");
      });
  };

  const [tabs, setTabs] = React.useState(1);
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
      document.body.classList.toggle("profile-page");
    };
  }, []);
  return (
    <>
      <NavBrain />
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="dots"
            src={require("../../assets/img/dots.png")}
          />
          <img
            alt="..."
            className="path"
            src={require("../../assets/img/path4.png")}
          />
          <Container className="align-items-center">
            <Row>
              <Col lg="6" md="6">
                <h1 className="profile-title text-left">
                  Te Damos la Bienvenida!
                </h1>
                <h5 className="text-on-back">01</h5>
                <p className="profile-description">
                  Para comenzar a utilizar la aplicación, simplemente ten a la
                  mano la imágen que deseas analizar. Una vez que hayas subido
                  la imágen, la aplicación la procesará utilizando nuestra
                  tecnología de detección de tumores cerebrales.
                </p>
                <div className="btn-wrapper profile pt-3">
                  <Button
                    className="btn-icon btn-round"
                    color="twitter"
                    href="https://twitter.com/creativetim"
                    id="tooltip639225725"
                    target="_blank"
                  >
                    <i className="fab fa-twitter" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip639225725">
                    Follow us
                  </UncontrolledTooltip>
                  <Button
                    className="btn-icon btn-round"
                    color="facebook"
                    href="https://www.facebook.com/creativetim"
                    id="tooltip982846143"
                    target="_blank"
                  >
                    <i className="fab fa-facebook-square" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip982846143">
                    Like us
                  </UncontrolledTooltip>
                  <Button
                    className="btn-icon btn-round"
                    color="dribbble"
                    href="https://dribbble.com/creativetim"
                    id="tooltip951161185"
                    target="_blank"
                  >
                    <i className="fab fa-dribbble" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip951161185">
                    Follow us
                  </UncontrolledTooltip>
                </div>
              </Col>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={activeUser.imagen}
                    />
                    <h3 className="title">Bienvenido/a!</h3>
                    <h4 className="title">{activeUser.nombre}</h4>
                  </CardHeader>
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#pablo"
                        >
                          Info
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#pablo"
                        >
                          Seguridad
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#pablo"
                        >
                          MRI
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary"></thead>
                          <tbody>
                            <tr>
                              <td>Usuario</td>
                              <td>{activeUser.usuario}</td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td>{activeUser.correo}</td>
                            </tr>
                            <tr>
                              <td>Dirección</td>
                              <td>{activeUser.direccion}</td>
                            </tr>
                            <tr>
                              <td>Teléfono</td>
                              <td>{activeUser.telefono}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Clave actual:</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                id="current-password"
                                placeholder="Contraseña Actual"
                                type="password"
                              />
                              <FormText color="default" tag="span">
                                Ingrese su contraseña actual.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Clave nueva:</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                id="new-password"
                                placeholder="Contraseña Nueva"
                                type="password"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          id="change-password-btn"
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Imágen</th>
                              <th className="header">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>The Daily: Nexo to Pay on Stable...</td>
                              <td>The Daily: Nexo to Pay on Stable...</td>
                            </tr>
                            <tr>
                              <td>Venezuela Begins Public of Nation...</td>
                              <td>Venezuela Begins Public of Nation...</td>
                            </tr>
                            <tr>
                              <td>PR: BitCanna – Dutch Blockchain...</td>
                              <td>PR: BitCanna – Dutch Blockchain...</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section">
          <Container>
            <Row className="justify-content-between">
              <Col md="6">
                <Row className="justify-content-between align-items-center">
                  <UncontrolledCarousel items={carouselItems} />
                </Row>
              </Col>
              <Col md="5">
                <h1 className="profile-title text-left">Sube tu Imágen</h1>
                <h5 className="text-on-back">02</h5>
                <p className="profile-description text-left">
                  Después de que la imagen haya sido procesada, recibirás un
                  informe que incluirá información detallada sobre el posible
                  tumor cerebral. Este informe te permitirá tomar medidas
                  tempranas y buscar tratamiento si es necesario. Para
                  asegurarte de que obtienes la mejor experiencia posible con
                  nuestra aplicación, asegúrate de que la imagen que estás
                  subiendo sea clara y nítida, sin obstrucciones o
                  interferencias.
                </p>
                <div className="btn-wrapper pt-3">
                  <form onSubmit={handleFormSubmit}>
                    <label htmlFor="file-upload" className="btn btn-info">
                      <i className="tim-icons icon-cloud-upload-94" /> Subir
                      archivo
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleFileInputChange}
                      style={{ display: "none" }}
                    />
                    <Button
                      type="submit"
                      className="btn-simple"
                      color="primary"
                      onClick={() => setDemoModal(true)}
                    >
                      <i className="tim-icons icon-book-bookmark" /> Ver
                      Resultado
                    </Button>
                  </form>
                  {error && <p>{error}</p>}
                  {result && (
                    <div>
                      <Modal
                        isOpen={demoModal}
                        toggle={() => setDemoModal(false)}
                      >
                        <div className="modal-header justify-content-center">
                          <button
                            className="close"
                            onClick={() => setDemoModal(false)}
                          >
                            <i className="tim-icons icon-simple-remove" />
                          </button>
                          <h4 className="title title-up">Modal title</h4>
                        </div>
                        <div className="modal-body">
                          <p>Resultado: {result.predicted_results}</p>
                        </div>
                        <div className="modal-footer">
                          <Button color="default" type="button">
                            Nice Button
                          </Button>
                          <Button
                            color="danger"
                            type="button"
                            onClick={() => setDemoModal(false)}
                          >
                            Close
                          </Button>
                        </div>
                      </Modal>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <section className="section">
          <Container>
            <Row>
              <Col md="6">
                <Card className="card-plain">
                  <CardHeader>
                    <h1 className="profile-title text-left">
                      Dejanos un Feedback
{//--------------------ESCRIBIR COMENTARIO--------------------------------------------------------------------------------------------------------------------------
}
                    </h1>
                    <h5 className="text-on-back">03</h5>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleCommentSubmit} >
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Comentanos tu experencia!</label>
                            <Input maxLength="100"  invalid={comment.length > 99}  placeholder="Escribir comentario" value={comment} onChange={handleCommentChange} />
                            <FormFeedback>Alcanzaste el número maximo de caracteres </FormFeedback>
                            <label>Dejanos una calificación: </label>
                            <div className="estrellas-row" >
                              <Estrellas rating={rating} setSavedRating={handleSaveRating} hoverRating={hoverRating} setHoverRating={setHoverRating} />
                            </div>          
                          </FormGroup>
                        </Col>
                      </Row>          

{//------------------------MODAL----------------------------------------------------------------------------------------------------------------------------------------------------------------

}

{/* 

<Modal isOpen={showModal} toggle={() => setShowModal(false)}>
  <ModalHeader toggle={() => setShowModal(false)}>Error</ModalHeader>
  <ModalBody>Por favor, seleccione una calificación antes de enviar el formulario.</ModalBody>
  <ModalFooter>
    <Button color="primary" onClick={() => setShowModal(false)}>
      Aceptar
    </Button>
  </ModalFooter>
</Modal> */}







                      <Button
                        className="btn-round float-right"
                        color="primary"
                        data-placement="right"
                        id="tooltip341148792"
                        type="submit"
                        onClick={handleCommentSubmit}
                      >
                        Send text
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="right"
                        target="tooltip341148792"
                      >
{//-------------------------------------------------------------------------------------------------------------------------------------------------------------------

}
                        Can't wait for your message
                      </UncontrolledTooltip>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto" md="4">
                <div className="info info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-square-pin" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Find us at the office</h4>
                    <p>
                      Bld Mihail Kogalniceanu, nr. 8, <br />
                      7652 Bucharest, <br />
                      Romania
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-mobile" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Give us a ring</h4>
                    <p>
                      Michael Jordan <br />
                      <a href="tel:+54-9-11-4418-0197">
                        +54-9-11-4418-0197
                      </a><br />
                      Mon - Fri, 8:00-22:00
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </div>
    </>
  );
}
