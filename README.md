# NerdAlert

## About
https://devpost.com/software/nerdalert?ref_content=user-portfolio&ref_feature=in_progress

## Usage

Clone the repo

```bash
git clone https://github.com/ViditPushkarna/project-kv.git
```

### Getting Started

### Frontend

Go to the client folder by command cd client and then install frontend dependecies using the command-

```bash
npm install
```

### `Running`

```bash
npm run dev

```

Client running on - http://localhost:5173/

### Node Server

Go to the server folder by command cd server and then install dependecies using the command-

```bash
npm install
```

### `Running`

```bash
nodemon index.js

```
Node server running on - http://localhost:8081

### Django Server

Go to the PyServer folder by command cd PyServer and then install dependecies using the command (make a virtal environment first, preferably)-

```bash
pip install -r requirements.txt
```

Run the Django server by running the below command-

```bash
python manage.py runserver
```

Python server running on - http://localhost:8000

### `ENV Variables`

Create a .env file in the root and add the following

```bash
NODE_ENV=development
MONGO_URI="Your mongo uri"
NODEMAILER_EMAIL="nodemailer email id"
NODEMAILER_PASSWORD="nodemailer password"
```
