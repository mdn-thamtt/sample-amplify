import { useEffect, useState } from "react";
import { FieldDeclaration } from "../types/field-declaration.type";
import FieldDeclarationService from "../services/field-declaration.service";

const Table = ({ fieldDeclaration, setFieldDeclaration }: any) => {
  const headers: FieldDeclaration[] = fieldDeclaration.header;
  const [data, setData] = useState<FieldDeclaration[]>([]);

  useEffect(() => {
    setData(headers);
  }, [fieldDeclaration]);

  const handleDelete = async (id: string) => {
    const updatedData = data.filter((item: FieldDeclaration) => item.id !== id);
    setData(updatedData);
    setFieldDeclaration({
      header: updatedData,
      body: {},
    });
    await FieldDeclarationService.deleteFieldDeclaration(id);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {data.map((item: FieldDeclaration) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.label}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.offsetsExpression.start}:{item.offsetsExpression.end} (
                {item.offsetsExpression.end - item.offsetsExpression.start + 1})
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{
                    cursor: "pointer",
                    color: "red",
                    border: "none",
                    background: "none",
                  }}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
