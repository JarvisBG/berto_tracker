CREATE TABLE IF NOT EXISTS time_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  employee_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  arrival_time TEXT,
  departure_time TEXT,
  breaks INTEGER,
  status TEXT CHECK(status IN ('present', 'absent', 'late')),
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);