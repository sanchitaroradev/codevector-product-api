export interface CursorData {
  updatedAt: string;
  _id: string;
}

export function encodeCursor(cursor: CursorData): string {
  return Buffer.from(JSON.stringify(cursor)).toString("base64");
}

export function decodeCursor(cursor: string): CursorData {
  return JSON.parse(
    Buffer.from(cursor, "base64").toString("utf-8")
  ) as CursorData;
}