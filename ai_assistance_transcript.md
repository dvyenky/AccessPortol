I used AI tools like ChatGPT for guidance and debugging support while building the project, especially for resolving backend and integration issues. However, I implemented and understood the logic and code structure myself.

1. Database Connection Issue (PostgreSQL)

Problem:
Backend failing to connect to PostgreSQL due to incorrect DATABASE_URL format.

User: Why is my database connection failing?

AI: Your connection string is incorrect. The password contains special character '@' which breaks the URL parsing.
Fix it using URL encoding or quote handling:
in my database password i have the @ symbol so that need to replace by %40
postgresql://postgres:databasepassword@localhost:5432/access_portal


2. FastAPI Response Validation Error

Problem:
Date field throwing validation error in API response.

User: My API is throwing ResponseValidationError for date field

AI: Pydantic expects string but you're returning datetime.date.
Fix: Convert date to string before returning:
requested_date = str(db_object.requested_date)



3. Missing Table Error in PostgreSQL

Problem:
relation "requests" does not exist

Problem:

AI: Your table is not created in PostgreSQL.
Fix:
- Ensure Base.metadata.create_all(bind=engine) is executed
- Or manually run SQL:
CREATE TABLE requests (...)


4. Frontend API Not Submitting Data

Problem:
React form submits but backend not receiving correct payload.

User: My form is not submitting correctly

AI: Check field names match backend schema exactly.
Example mismatch:
React: employee_name
Backend: employeeId (causes failure)
Fix alignment in schema + frontend.


5. Import Error in FastAPI

Problem:
ImportError: cannot import name 'RequestUpdate'

AI: Your schema is missing or incorrectly named.
Fix:
- Check schemas.py
- Ensure RequestUpdate class exists
- Restart FastAPI server after changes