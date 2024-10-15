import { useEffect, useState } from "react";
import Table from "./table.component";
import { Modal } from "./modal.component";
import FieldDeclarationService from "../services/field-declaration.service";
import {
  FieldDeclaration,
  GetFieldDeclarationsResponse,
} from "../types/field-declaration.type";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);
  const [fieldDeclaration, setFieldDeclaration] =
    useState<GetFieldDeclarationsResponse>({
      header: [],
      body: {},
    });

  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchFieldDeclarations = async () => {
      try {
        setLoading(true);
        const data: FieldDeclaration[] =
          await FieldDeclarationService.getFieldDeclarations();
        if (data) {
          setLoading(false);
          setFieldDeclaration({
            header: data,
            body: {},
          });
        }
      } catch (error) {
        console.error("Error fetching field declarations:", error);
      }
    };

    fetchFieldDeclarations();
  }, []);

  return (
    <div className="container">
      <main>{isModalOpen && <Modal onRequestClose={toggleModal} />}</main>
      <header className="jumbotron">
        <div className="left-side">
          <h6>Canvas</h6>
          <button
            onClick={toggleModal}
            style={{
              cursor: "pointer",
              color: "green",
              border: "none",
              background: "none",
              fontSize: "24px",
              marginBottom: "10px",
            }}
          >
            ➕
          </button>
          {loading && (
            <div className="wrapper">
              <div className="dot"></div>
              <span className="text">Loading</span>
            </div>
          )}

          <Table
            fieldDeclaration={fieldDeclaration}
            setFieldDeclaration={setFieldDeclaration}
          ></Table>
        </div>
        <div className="right-side">
          <h6>Editor</h6>
          <pre
            style={{
              backgroundColor: "#f8f8f8",
              border: "1px solid #ddd",
              padding: "10px",
              overflowY: "scroll",
              maxHeight: "650px",
            }}
          >
            <code
              style={{
                color: "#c7254e",
                backgroundColor: "#f9f2f4",
                padding: "2px 4px",
                borderRadius: "4px",
              }}
            >
              {JSON.stringify(fieldDeclaration, null, 2)}
            </code>
          </pre>
        </div>
      </header>
    </div>
  );
};

export default Home;
