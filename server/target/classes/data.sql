TRUNCATE TABLE employees RESTART IDENTITY CASCADE;
TRUNCATE TABLE departments RESTART IDENTITY CASCADE;


-- Departments
INSERT INTO departments (id, name, description)
VALUES
(1, 'Human Resources', 'Handles HR operations'),
(2, 'Finance', 'Manages company finances'),
(3, 'Marketing', 'Oversees marketing and advertising'),
(4, 'Sales', 'Drives sales and revenue'),
(5, 'Research & Development', 'Develops new products'),
(6, 'Customer Support', 'Handles customer issues'),
(7, 'IT', 'Maintains systems and technology'),
(8, 'Operations', 'Ensures smooth business operations'),
(9, 'Legal', 'Manages legal compliance'),
(10, 'Administration', 'Coordinates internal operations');


-- Employees
-- Human Resources
INSERT INTO employees (name, email, phone, job_title, date_of_joining, date_of_birth, gender, marital_status, emergency_contact, address, department_id, salary )
VALUES
('Alice Johnson', 'alice.johnson@company.com', '9876543210', 'HR Manager', '2020-03-15', '1990-05-12', 'Female', 'Married', '8765432109', '123 HR Street, Mumbai', (SELECT id FROM departments WHERE name = 'Human Resources'), 75000),
('Ravi Kumar', 'ravi.kumar@company.com', '9988776655', 'Recruiter', '2022-07-20', '1996-04-02', 'Male', 'Single', '9098765432', '45 Talent Ave, Delhi', (SELECT id FROM departments WHERE name = 'Human Resources'), 45000 ),
('Priya Shah', 'priya.shah@company.com', '9812345678', 'Payroll Specialist', '2021-11-01', '1994-10-09', 'Female', 'Single', '9812311223', '202 HR Block, Ahmedabad', (SELECT id FROM departments WHERE name = 'Human Resources'), 50000 ),
('Sneha Nair', 'sneha.nair@company.com', '9812348899', 'HR Executive', '2023-04-01', '1997-02-05', 'Female', 'Single', '9812235566', '45 HR Heights, Kochi', (SELECT id FROM departments WHERE name = 'Human Resources'), 48000 ),
('Arun Das', 'arun.das@company.com', '9845667788', 'Training Coordinator', '2022-10-17', '1994-09-21', 'Male', 'Married', '9845123456', 'Talent Plaza, Trivandrum', (SELECT id FROM departments WHERE name = 'Human Resources'), 52000);

-- Finance
INSERT INTO employees (name, email, phone, job_title, date_of_joining, date_of_birth, gender, marital_status, emergency_contact, address, department_id, salary )
VALUES
('Arjun Singh', 'arjun.singh@company.com', '9821456789', 'Finance Manager', '2019-12-05', '1988-02-12', 'Male', 'Married', '9810022445', '10 Money Park, Jaipur', (SELECT id FROM departments WHERE name = 'Finance'), 85000),
('Vikas Mehta', 'vikas.mehta@company.com', '9856231478', 'Finance Analyst', '2021-04-10', '1991-06-15', 'Male', 'Married', '9856239999', '21 Bank Lane, Pune', (SELECT id FROM departments WHERE name = 'Finance'), 60000 ),
('Nisha Patel', 'nisha.patel@company.com', '9875632145', 'Accountant', '2020-09-14', '1993-07-22', 'Female', 'Single', '9998765432', '55 Ledger Road, Surat', (SELECT id FROM departments WHERE name = 'Finance'), 52000 ),
('Pooja Agarwal', 'pooja.agarwal@company.com', '9822211122', 'Junior Accountant', '2023-01-12', '1998-05-09', 'Female', 'Single', '9876654321', 'Ledger Heights, Indore', (SELECT id FROM departments WHERE name = 'Finance'), 42000 );

-- Information Technology
INSERT INTO employees (name, email, phone, job_title, date_of_joining, date_of_birth, gender, marital_status, emergency_contact, address, department_id, salary )
VALUES
('Karan Verma', 'karan.verma@company.com', '9876543101', 'Software Engineer', '2021-05-17', '1997-03-22', 'Male', 'Single', '9988776655', 'Tech Street 42, Bangalore', (SELECT id FROM departments WHERE name = 'IT'), 65000 ),
('Simran Kaur', 'simran.kaur@company.com', '9822001122', 'System Administrator', '2020-10-11', '1995-08-02', 'Female', 'Single', '9876665544', '15 Server Colony, Chandigarh', (SELECT id FROM departments WHERE name = 'IT'), 70000),
('Rahul Nair', 'rahul.nair@company.com', '9911332244', 'IT Manager', '2019-02-10', '1990-12-05', 'Male', 'Married', '9988223344', 'Network Hub 7, Kochi', (SELECT id FROM departments WHERE name = 'IT'), 95000);

-- Marketing
INSERT INTO employees (name, email, phone, job_title, date_of_joining, date_of_birth, gender, marital_status, emergency_contact, address, department_id, salary )
VALUES
('Tina George', 'tina.george@company.com', '9833445566', 'Marketing Manager', '2020-06-21', '1992-11-13', 'Female', 'Married', '9823456789', '44 Brand Road, Chennai', (SELECT id FROM departments WHERE name = 'Marketing'), 88000),
('Mohammed Ali', 'mohammed.ali@company.com', '9811122233', 'Digital Marketing Executive', '2021-08-09', '1995-03-15', 'Male', 'Single', '9811445566', 'Market Street, Hyderabad', (SELECT id FROM departments WHERE name = 'Marketing'), 52000 ),
('Sneha Desai', 'sneha.desai@company.com', '9922334455', 'Content Strategist', '2022-04-05', '1996-12-20', 'Female', 'Single', '9812345678', 'Media Lane, Pune', (SELECT id FROM departments WHERE name = 'Marketing'), 48000 ),
('Rohit Kapoor', 'rohit.kapoor@company.com', '9871112233', 'Brand Strategist', '2023-03-14', '1996-10-01', 'Male', 'Single', '9812345566', 'Promo Park, Delhi', (SELECT id FROM departments WHERE name = 'Marketing'), 60000 ),
('Aarav Joshi', 'aarav.joshi@company.com', '9887766554', 'Graphic Designer', '2022-11-18', '1997-07-25', 'Male', 'Single', '9887761234', 'Design Bay, Pune', (SELECT id FROM departments WHERE name = 'Marketing'), 55000 ),
('Kriti Sharma', 'kriti.sharma@company.com', '9819988776', 'Market Research Analyst', '2021-09-09', '1995-03-29', 'Female', 'Single', '9819988775', 'Insight Tower, Gurgaon', (SELECT id FROM departments WHERE name = 'Marketing'), 58000 ),
('Anil Chauhan', 'anil.chauhan@company.com', '9845567788', 'SEO Specialist', '2023-02-02', '1998-08-14', 'Male', 'Single', '9845123344', 'SEO Hub, Bangalore', (SELECT id FROM departments WHERE name = 'Marketing'), 50000 ),
('Rachna Patel', 'rachna.patel@company.com', '9833345566', 'Marketing Associate', '2022-08-20', '1996-11-11', 'Female', 'Single', '9833345511', 'Promo Street, Ahmedabad', (SELECT id FROM departments WHERE name = 'Marketing'), 47000 ),
('Harpreet Singh', 'harpreet.singh@company.com', '9876677889', 'Event Coordinator', '2023-04-15', '1997-05-30', 'Male', 'Single', '9812234455', 'Event Zone, Amritsar', (SELECT id FROM departments WHERE name = 'Marketing'), 49000 ),
('Sana Sheikh', 'sana.sheikh@company.com', '9823345567', 'Social Media Manager', '2023-06-01', '1995-09-17', 'Female', 'Married', '9811223344', 'Digital Park, Mumbai', (SELECT id FROM departments WHERE name = 'Marketing'), 62000 );

-- Sales
INSERT INTO employees (name, email, phone, job_title, date_of_joining, date_of_birth, gender, marital_status, emergency_contact, address, department_id, salary )
VALUES
('Rajesh Gupta', 'rajesh.gupta@company.com', '9898989898', 'Sales Manager', '2021-01-15', '1994-09-05', 'Male', 'Married', '9870011223', 'Sales Tower, Mumbai', (SELECT id FROM departments WHERE name = 'Sales'), 90000 ),
('Anita Reddy', 'anita.reddy@company.com', '9812312345', 'Account Manager', '2020-08-10', '1993-02-14', 'Female', 'Married', '9910099888', 'Client Street, Hyderabad', (SELECT id FROM departments WHERE name = 'Sales'), 60000 ),
('Deepak Kumar', 'deepak.kumar@company.com', '9870001112', 'Sales Coordinator', '2022-05-12', '1998-07-07', 'Male', 'Single', '9900112233', 'Sales Hub, Noida', (SELECT id FROM departments WHERE name = 'Sales'), 50000 ),
('Kiran Lal', 'kiran.lal@company.com', '9810011223', 'Sales Representative', '2022-03-11', '1998-10-22', 'Male', 'Single', '9811122233', 'Sales Road, Jaipur', (SELECT id FROM departments WHERE name = 'Sales'), 48000 ),
('Pallavi Reddy', 'pallavi.reddy@company.com', '9822233445', 'Sales Analyst', '2021-06-01', '1996-07-13', 'Female', 'Single', '9822233444', 'Sales Plaza, Hyderabad', (SELECT id FROM departments WHERE name = 'Sales'), 53000 ),
('Amit Sharma', 'amit.sharma@company.com', '9876654433', 'Regional Sales Manager', '2019-08-20', '1989-04-11', 'Male', 'Married', '9876654321', 'Client Road, Delhi', (SELECT id FROM departments WHERE name = 'Sales'), 85000 ),
('Bhavana Mehta', 'bhavana.mehta@company.com', '9817766554', 'Customer Relations Officer', '2023-03-29', '1997-10-18', 'Female', 'Single', '9812233344', 'Sales Park, Surat', (SELECT id FROM departments WHERE name = 'Sales'), 47000 ),
('Vineet Sharma', 'vineet.sharma@company.com', '9834456677', 'Account Executive', '2020-07-07', '1993-12-19', 'Male', 'Married', '9811122234', 'Sales Hub, Pune', (SELECT id FROM departments WHERE name = 'Sales'), 62000 ),
('Asha Thomas', 'asha.thomas@company.com', '9823345567', 'Sales Associate', '2022-09-12', '1996-01-14', 'Female', 'Single', '9812233345', 'Client Road, Bangalore', (SELECT id FROM departments WHERE name = 'Sales'), 46000 ),
('Rohan Patil', 'rohan.patil@company.com', '9845566677', 'Sales Support', '2023-01-20', '1998-11-09', 'Male', 'Single', '9845561234', 'Sales Bay, Pune', (SELECT id FROM departments WHERE name = 'Sales'), 44000),
('Kavya Deshmukh', 'kavya.deshmukh@company.com', '9834455566', 'Business Development Executive', '2021-12-01', '1994-09-29', 'Female', 'Married', '9811123322', 'Business Street, Nagpur', (SELECT id FROM departments WHERE name = 'Sales'), 59000 ),
('Naveen Kumar', 'naveen.kumar@company.com', '9811223344', 'Territory Sales Officer', '2020-05-18', '1992-03-27', 'Male', 'Married', '9811122233', 'Territory Lane, Lucknow', (SELECT id FROM departments WHERE name = 'Sales'), 64000 ),
('Preeti Sinha', 'preeti.sinha@company.com', '9876654433', 'Inside Sales Rep', '2023-02-05', '1998-05-23', 'Female', 'Single', '9876653344', 'Sales Center, Kolkata', (SELECT id FROM departments WHERE name = 'Sales'), 45000 ),
('Ramesh Pillai', 'ramesh.pillai@company.com', '9821112233', 'Key Account Executive', '2021-09-30', '1993-01-05', 'Male', 'Married', '9811122334', 'Sales Zone, Kochi', (SELECT id FROM departments WHERE name = 'Sales'), 61000 ),
('Geeta Jain', 'geeta.jain@company.com', '9845667788', 'Regional Coordinator', '2022-07-10', '1995-07-15', 'Female', 'Single', '9812345678', 'Sales Office, Indore', (SELECT id FROM departments WHERE name = 'Sales'), 52000 );

-- Research and Development
INSERT INTO employees (name, email, phone, job_title, date_of_joining, date_of_birth, gender, marital_status, emergency_contact, address, department_id, salary )
VALUES
('Sonal Mehta', 'sonal.mehta@company.com', '9823344556', 'R&D Engineer', '2020-03-10', '1992-09-11', 'Female', 'Single', '9812233445', 'Innovation Park, Bangalore', (SELECT id FROM departments WHERE name = 'Research & Development'), 72000 ),
('Harish Rao', 'harish.rao@company.com', '9911556677', 'Product Designer', '2021-12-05', '1994-01-01', 'Male', 'Married', '9812234556', 'Design Center, Chennai', (SELECT id FROM departments WHERE name = 'Research & Development'), 78000 ),
('Kavita Iyer', 'kavita.iyer@company.com', '9822456677', 'R&D Manager', '2019-07-15', '1990-08-16', 'Female', 'Married', '9871234567', 'Lab Block, Pune', (SELECT id FROM departments WHERE name = 'Research & Development'), 95000 ),
('Aditya Menon', 'aditya.menon@company.com', '9821122233', 'Data Scientist', '2023-02-18', '1996-11-05', 'Male', 'Single', '9821112233', 'Lab Center, Bangalore', (SELECT id FROM departments WHERE name = 'Research & Development'), 72000 ),
('Nidhi Varma', 'nidhi.varma@company.com', '9819988775', 'Prototype Engineer', '2023-06-10', '1995-03-22', 'Female', 'Single', '9819988774', 'Innovation Lane, Hyderabad', (SELECT id FROM departments WHERE name = 'Research & Development'), 65000 );

-- Customer Support
INSERT INTO employees (name, email, phone, job_title, date_of_joining, date_of_birth, gender, marital_status, emergency_contact, address, department_id, salary )
VALUES
('John Mathew', 'john.mathew@company.com', '9845678901', 'Customer Support Executive', '2021-03-20', '1995-02-02', 'Male', 'Single', '9845671234', 'Support Center, Kochi', (SELECT id FROM departments WHERE name = 'Customer Support'), 40000 ),
('Meera Nair', 'meera.nair@company.com', '9821567890', 'Team Lead', '2020-10-01', '1993-05-05', 'Female', 'Married', '9811122334', 'Helpdesk Tower, Trivandrum', (SELECT id FROM departments WHERE name = 'Customer Support'), 65000 ),
('Vineeth Raj', 'vineeth.raj@company.com', '9812233445', 'Support Manager', '2019-01-25', '1990-09-09', 'Male', 'Married', '9812231234', 'Support Zone, Chennai', (SELECT id FROM departments WHERE name = 'Customer Support'), 80000 ),
('Abhishek Sharma', 'abhishek.sharma@company.com', '9845667788', 'Support Associate', '2023-04-15', '1998-01-12', 'Male', 'Single', '9845123455', 'Helpdesk Road, Delhi', (SELECT id FROM departments WHERE name = 'Customer Support'), 42000 ),
('Lekha Suresh', 'lekha.suresh@company.com', '9812233344', 'Customer Care Executive', '2022-09-09', '1996-06-18', 'Female', 'Married', '9811122335', 'Support Wing, Kochi', (SELECT id FROM departments WHERE name = 'Customer Support'), 43000 ),
('Ashok Nair', 'ashok.nair@company.com', '9823344455', 'Support Specialist', '2023-03-20', '1997-08-25', 'Male', 'Single', '9823345566', 'Helpdesk Area, Trivandrum', (SELECT id FROM departments WHERE name = 'Customer Support'), 46000 ),
('Ananya Ghosh', 'ananya.ghosh@company.com', '9812235567', 'Team Coordinator', '2021-05-02', '1994-12-03', 'Female', 'Single', '9811122334', 'Support Complex, Kolkata', (SELECT id FROM departments WHERE name = 'Customer Support'), 52000 ),
('Rajat Verma', 'rajat.verma@company.com', '9845567789', 'Technical Support Executive', '2022-12-18', '1997-09-12', 'Male', 'Single', '9845123344', 'Support Center, Mumbai', (SELECT id FROM departments WHERE name = 'Customer Support'), 47000 ),
('Preeti Das', 'preeti.das@company.com', '9833344455', 'Customer Experience Officer', '2023-02-22', '1996-02-09', 'Female', 'Single', '9833344454', 'Helpdesk Hub, Pune', (SELECT id FROM departments WHERE name = 'Customer Support'), 48000 ),
('Rohit Sen', 'rohit.sen@company.com', '9812234455', 'Call Center Operator', '2023-05-01', '1998-10-20', 'Male', 'Single', '9811123345', 'Support House, Delhi', (SELECT id FROM departments WHERE name = 'Customer Support'), 41000 ),
('Anusha Reddy', 'anusha.reddy@company.com', '9822233344', 'Escalation Officer', '2023-06-25', '1995-05-25', 'Female', 'Married', '9812233345', 'Help Center, Hyderabad', (SELECT id FROM departments WHERE name = 'Customer Support'), 55000 );

-- Legal
INSERT INTO employees (name, email, phone, job_title, date_of_joining, date_of_birth, gender, marital_status, emergency_contact, address, department_id, salary )
VALUES
('Neha Sharma', 'neha.sharma@company.com', '9871122334', 'Legal Advisor', '2020-09-15', '1992-11-25', 'Female', 'Single', '9879988776', 'Law Lane, Delhi', (SELECT id FROM departments WHERE name = 'Legal'), 75000 ),
('Amit Bansal', 'amit.bansal@company.com', '9812345567', 'Compliance Officer', '2021-01-05', '1989-03-03', 'Male', 'Married', '9812223344', 'Legal Hub, Gurugram', (SELECT id FROM departments WHERE name = 'Legal'), 90000 ),
('Reena Thomas', 'reena.thomas@company.com', '9823345566', 'Head of Legal', '2018-10-10', '1987-09-09', 'Female', 'Married', '9812233444', 'Policy Street, Bangalore', (SELECT id FROM departments WHERE name = 'Legal'), 110000 );

-- Operations
INSERT INTO employees (name, email, phone, job_title, date_of_joining, date_of_birth, gender, marital_status, emergency_contact, address, department_id, salary )
VALUES
('Manoj Pillai', 'manoj.pillai@company.com', '9845566778', 'Operations Manager', '2020-04-22', '1988-08-11', 'Male', 'Married', '9845561122', 'Ops Center, Coimbatore', (SELECT id FROM departments WHERE name = 'Operations'), 95000 ),
('Rita Das', 'rita.das@company.com', '9812234455', 'Logistics Coordinator', '2021-09-13', '1994-05-18', 'Female', 'Single', '9813345566', 'Warehouse Road, Kolkata', (SELECT id FROM departments WHERE name = 'Operations'), 55000 ),
('Anand Raj', 'anand.raj@company.com', '9833344455', 'Inventory Specialist', '2022-03-29', '1996-07-21', 'Male', 'Single', '9812235678', 'Storage Zone, Chennai', (SELECT id FROM departments WHERE name = 'Operations'), 50000 ),
('Kishore Patil', 'kishore.patil@company.com', '9813345566', 'Procurement Officer', '2023-04-11', '1993-02-16', 'Male', 'Married', '9812234455', 'Ops Hub, Pune', (SELECT id FROM departments WHERE name = 'Operations'), 58000 );
-- Administration
INSERT INTO employees (name, email, phone, job_title, date_of_joining, date_of_birth, gender, marital_status, emergency_contact, address, department_id, salary )
VALUES
('Joseph Fernandez', 'joseph.fernandez@company.com', '9821123344', 'Admin Officer', '2020-02-18', '1989-09-09', 'Male', 'Married', '9811122333', 'Admin Block, Mumbai', (SELECT id FROM departments WHERE name = 'Administration'), 78000 ),
('Divya Menon', 'divya.menon@company.com', '9833345566', 'Office Assistant', '2021-06-10', '1995-04-14', 'Female', 'Single', '9812233344', 'Office Lane, Kochi', (SELECT id FROM departments WHERE name = 'Administration'), 42000 ),
('Suresh Iyer', 'suresh.iyer@company.com', '9812234456', 'Facility Manager', '2022-05-22', '1992-03-19', 'Male', 'Married', '9812234455', 'Admin Park, Chennai', (SELECT id FROM departments WHERE name = 'Administration'), 65000 );
