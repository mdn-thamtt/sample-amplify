import axios from "axios";
import authHeader from "./auth-header";
import { FieldDeclarationInput } from "../types/field-declaration.type";

class FieldDeclarationService {
  async getFieldDeclarations() {
    const response = await axios.get("/field-declaration", {
      headers: authHeader(),
    });
    return response?.data;
  }

  async createFieldDeclaration(values: FieldDeclarationInput) {
    const response = await axios.post(
      "/field-declaration",
      {
        field_name: values.fieldName,
        field_type: values.type,
        offset_from: values.offsetFrom,
        offset_to: values.offsetTo,
        description: values.description,
      },
      {
        headers: authHeader(),
      }
    );
    return response?.data;
  }

  async deleteFieldDeclaration(id: string) {
    const response = await axios.delete(`/field-declaration?id=${id}`, {
      headers: authHeader(),
    });
    return response?.data;
  }
}

const fieldDeclarationService = new FieldDeclarationService();

export default fieldDeclarationService;
