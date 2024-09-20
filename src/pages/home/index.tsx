import { Col, Container, Row } from "react-bootstrap";
import DigitForm from "../../components/DigitForm";

const HomePage = ({code}:{code:number}) => {
	return (
		<Container fluid={true} className="App-header">
			<Row>
				<Col sm={12}>
					<h1>Te enviamos un SMS</h1>
					<p>ingresá el codigó que te enviamos al +506 8888 8888</p>
					<div style={{ marginTop: "5em" }}>
						<DigitForm code={code}/>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default HomePage;
