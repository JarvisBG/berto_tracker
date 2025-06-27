CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  shop_id INTEGER NOT NULL,
  department TEXT NOT NULL CHECK(department IN ('Supervision Réseau', 'Commercial', 'Comptabilité', 'SAV', 'Caissière')),
  schedule TEXT NOT NULL,
  hire_date TEXT NOT NULL,
  FOREIGN KEY (shop_id) REFERENCES shops(id)
);