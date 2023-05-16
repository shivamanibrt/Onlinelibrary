import Card from "react-bootstrap/Card";
import { Rating } from "../rating/Rating";
import { Link } from "react-router-dom";

export const CustomCard = ({ name, year, title, id, url, rating }) => {
  return (
    <Link to={`/book/${id}`} className="nav-link">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title className="fw-bold">{title}</Card.Title>
          <Card.Text>
            <h5>
              {name} - {year}
            </h5>

            <Rating rate={5} />
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};
