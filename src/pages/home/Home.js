import React, { useEffect, useRef, useState } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { HomeCarousel } from "../../components/carousel/HomeCarousel";
import { Col, Container, Row } from "react-bootstrap";
import { CustomCard } from "../../components/custom-card/CustomCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooksActions } from "../book/bookAction";
import { CustomInpute } from "../../components/custom-inpute/CustomInpute";

const Home = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState([]);
  const { book } = useSelector((state) => state.books);

  useEffect(() => {
    !display.length && dispatch(getAllBooksActions());
    setDisplay(book);
  }, [dispatch, book]);

  // on handle change get typed value

  const handleOnChange = (e) => {
    const { value } = e.target;

    const filteredItem = book.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setDisplay(filteredItem);
  };
  // use filter to filter book based on the typed value overide display state
  //use display statet to loop throught

  return (
    <MainLayout>
      <HomeCarousel />
      <Container className="mt-4">
        <Row>
          <Col>
            <h1>Exlopre the library</h1>
            <div className="d-flex justify-content-between mt-5">
              <div> {display.length} Books found!</div>
              <CustomInpute
                placeholder="Search book by title"
                className=" "
                onChange={handleOnChange}
              />
            </div>
            <hr />
            <div className=" d-flex justify-content-between flex-wrap gap-2">
              {display.map((item) => (
                <CustomCard key={item.id} {...item} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default Home;
