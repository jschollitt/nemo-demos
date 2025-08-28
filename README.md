# nemo-demos

## Instructions to run djoser demo

### backend
1. cd djoser-register-login/backend
2. python3 -m venv .
3. source bin/activate
4. pip3 install django django-cors-headers djoser
5. python3 manage.py runserver 8888

### frontend
1. cd djoser-register-login/frontend
2. npm install
3. npm run dev
4. Open http://localhost:5173
5. Enter details in register form and submit
6. Enter registered user in login form and submit
