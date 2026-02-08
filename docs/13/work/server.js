import { serveDir } from "@std/http";
import { DatabaseSync } from "node:sqlite";

const DB_PATH = "docs/13/work/todo.db";
const PUBLIC_ROOT = "docs/13/work/public";

const db = new DatabaseSync(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER DEFAULT 0
  );
`);

const listStmt = db.prepare(
  "SELECT id, title, done FROM todos ORDER BY id DESC",
);
const findStmt = db.prepare("SELECT id, title, done FROM todos WHERE id = ?");
const insertStmt = db.prepare("INSERT INTO todos (title, done) VALUES (?, ?)");
const updateStmt = db.prepare(
  "UPDATE todos SET title = ?, done = ? WHERE id = ?",
);
const deleteStmt = db.prepare("DELETE FROM todos WHERE id = ?");

function convertTodo(row) {
  return { id: row.id, title: row.title, done: row.done === 1 };
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function errorResponse(message, status = 400) {
  return jsonResponse({ error: message }, status);
}

Deno.serve({ port: 8000 }, (request) => {
  const url = new URL(request.url);
  const { pathname } = url;

  if (pathname === "/api/todos" || pathname.startsWith("/api/todos/")) {
    const id = pathname.split("/")[3];

    if (request.method === "GET" && pathname === "/api/todos") {
      const rows = listStmt.all();
      return jsonResponse(rows.map(convertTodo));
    }

    if (request.method === "POST" && pathname === "/api/todos") {
      return request.json().then((body) => {
        insertStmt.run(body.title, 0);
        const rowId = db.prepare("SELECT last_insert_rowid() as id").get().id;
        const created = convertTodo(findStmt.get(rowId));
        return jsonResponse(created, 201);
      });
    }

    if (request.method === "PUT" && id !== null) {
      return request.json().then((body) => {
        updateStmt.run(body.title, body.done ? 1 : 0, id);
        const updated = convertTodo(findStmt.get(id));
        return jsonResponse(updated);
      });
    }

    if (request.method === "DELETE" && id !== null) {
      deleteStmt.run(id);
      return new Response(null, { status: 204 });
    }

    return errorResponse("対応していない API です", 405);
  }

  return serveDir(request, { fsRoot: PUBLIC_ROOT });
});
