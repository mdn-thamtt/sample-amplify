import { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import FieldDeclarationService from "../services/field-declaration.service";
import { FieldDeclarationInput } from "../types/field-declaration.type";

export const Modal = ({ onRequestClose }: any) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    fieldName: Yup.string().required("Field name is required"),
    type: Yup.string().required("Type is required"),
    offsetFrom: Yup.string().required("Offset from is required"),
    offsetTo: Yup.string().required("Offset to is required"),
  });

  const formik: {
    values: FieldDeclarationInput;
  } = useFormikContext();

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const response = await FieldDeclarationService.createFieldDeclaration(
        values
      );
      if (response) {
        window.location.reload();
      }
    } catch (error: any) {
      setLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage);
    }
  };

  useEffect(() => {
    function onKeyDown(event: any) {
      if (event.keyCode === 27) {
        onRequestClose();
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div className="modal__backdrop">
      <div className="modal__container">
        <Formik
          initialValues={{
            fieldName: "",
            type: "",
            offsetFrom: "",
            offsetTo: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="fieldName">
                  <span className="require-field">*</span> Field Name
                </label>
                <Field name="fieldName" type="text" className="form-control" />
                <ErrorMessage
                  name="fieldName"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">
                  <span className="require-field">*</span> Type
                </label>
                <Field
                  as="select"
                  name="mySelect"
                  className="form-control"
                  onChange={(e: any) => setFieldValue("type", e.target.value)}
                >
                  <option value=""></option>
                  <option value="Number">Number</option>
                  <option value="String">String</option>
                </Field>

                <ErrorMessage
                  name="type"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="offsetFrom">
                  <span className="require-field">*</span> Offset From
                </label>
                <Field name="offsetFrom" type="text" className="form-control" />
                <ErrorMessage
                  name="offsetFrom"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="offsetTo">
                  <span className="require-field">*</span> Offset to
                </label>
                <Field name="offsetTo" type="text" className="form-control" />
                <ErrorMessage
                  name="offsetTo"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Field
                  name="description"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Save</span>
                </button>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
