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

Deno.serve({ port: 8000 }, (request) => {
  return serveDir(request, { fsRoot: PUBLIC_ROOT });
});
