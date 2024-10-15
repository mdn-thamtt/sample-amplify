export interface OffsetsExpression {
  type: string;
  start: number;
  end: number;
}

enum FieldDeclarationType {
  String = "string",
  Number = "Number",
}

export interface FieldDeclaration {
  id: string;
  label: string;
  type: FieldDeclarationType;
  offsetsExpression: OffsetsExpression;
}

export interface GetFieldDeclarationsResponse {
  header: FieldDeclaration[];
  body: Record<string, any>;
}

export interface FieldDeclarationInput {
  fieldName: string;
  type: FieldDeclarationType;
  offsetFrom: number;
  offsetTo: number;
  description: string;
}
