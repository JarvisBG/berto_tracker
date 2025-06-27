INSERT INTO shops (name, zone) VALUES ('Boutique PK 12', 'Douala');
INSERT INTO shops (name, zone) VALUES ('Boutique Zachman', 'Douala');

INSERT INTO users (name, username, password, role, shop_id) VALUES ('Admin', 'admin', '$2b$10$6m/8hG6fW./zWi6UDvgGGuRHL/hT0o/rhtEbFp875kvT1sB4NdAzC', 'admin', NULL);
INSERT INTO users (name, username, password, role, shop_id) VALUES ('Manager PK 12', 'manager_pk12', '$2b$10$IlTn3KKrCMxVRDKruK5N4uE9Un8FFmEyVP6/h9v8ZRYmuk9RjZ3FC', 'manager', 1);
INSERT INTO users (name, username, password, role, shop_id) VALUES ('Manager Zachman', 'manager_zachman', '$2b$10$p5UFXc0KRQwUl7336zZiYeXA.iTON3rgJq5bArKSjryKIyoMgXy7u', 'manager', 2);

INSERT INTO employees (name, shop_id, department, schedule, hire_date) VALUES ('Jean Dupont', 1, 'Commercial', '07h30-15h', '2025-01-01');
INSERT INTO employees (name, shop_id, department, schedule, hire_date) VALUES ('Marie Dubois', 2, 'Caissière', '15h-21h', '2025-02-01');

INSERT INTO time_records (employee_id, date, arrival_time, departure_time, breaks, status) VALUES (1, '2025-06-23', '07:30', '15:00', 30, 'present');
INSERT INTO time_records (employee_id, date, arrival_time, departure_time, breaks, status) VALUES (2, '2025-06-23', '15:15', '21:00', 15, 'late');