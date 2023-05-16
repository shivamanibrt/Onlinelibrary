import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooksActions } from "../../pages/book/bookAction";
import { CustomModal } from "../custom-modal/CustomModal";
import { EditBook } from "../edit-book/EditBook";
import { Button } from "react-bootstrap";
import { setModalShow } from "../../system/systemSlice";

export const BookTable = () => {
  const dispatch = useDispatch();
  const { book } = useSelector((state) => state.books);
  const [selectedBook, setSelectedBook] = useState({});

  useEffect(() => {
    !book.length && dispatch(getAllBooksActions());
  }, [dispatch, book]);

  const handleOnEdit = (obj) => {
    setSelectedBook(obj);
    dispatch(setModalShow(true));
  };

  return (
    <>
      <CustomModal heading="Edit book">
        <EditBook selectedBook={selectedBook} />
      </CustomModal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>info</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {book.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.url} alt="" />
              </td>
              <td>
                <h3>{item.title}</h3>
                <p>
                  {item.name} - {item.year}
                </p>
                <p>{item?.summary}</p>
              </td>

              <td>
                <Button variant="warning" onClick={() => handleOnEdit(item)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
