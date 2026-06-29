# Todo App - CRUD Application with Jenkins & Docker

A simple, scalable Todo application with full CRUD operations, containerized with Docker, and automated deployment via Jenkins on AWS.

## Features

- ✅ **CRUD Operations**: Create, Read, Update, Delete todos
- 🐳 **Docker & Docker Compose**: Easy deployment
- 🔄 **CI/CD Pipeline**: Jenkins integration
- ☁️ **AWS Deployment**: EC2 and ECS ready
- 🧪 **Jest Tests**: Automated testing
- 📊 **Health Checks**: Built-in health endpoints

## Prerequisites

- Node.js 16+
- Docker & Docker Compose
- Jenkins (for CI/CD)
- AWS Account (for deployment)

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/savlaj79/to-app-test.git
cd to-app-test
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run tests
```bash
npm test
```

### 4. Start with Docker Compose
```bash
docker-compose up -d
```

### 5. Access the app
- API: `http://localhost:3000`
- Health Check: `http://localhost:3000/health`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/:id` | Get single todo |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |
| GET | `/health` | Health check |

## Sample Requests

### Create a Todo
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Jenkins","description":"Setup CI/CD pipeline"}'
```

### Get All Todos
```bash
curl http://localhost:3000/api/todos
```

### Update a Todo
```bash
curl -X PUT http://localhost:3000/api/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

### Delete a Todo
```bash
curl -X DELETE http://localhost:3000/api/todos/{id}
```

## Docker Build & Run

### Build Image
```bash
docker build -t todo-app:latest .
```

### Run Container
```bash
docker run -p 3000:3000 todo-app:latest
```

### Using Docker Compose
```bash
docker-compose up -d
docker-compose logs -f
docker-compose down
```

## Jenkins Setup

### 1. Create Jenkins Job
- New Item → Pipeline
- GitHub project URL: `https://github.com/savlaj79/to-app-test`
- Pipeline → Pipeline script from SCM
- SCM: Git
- Repository URL: `https://github.com/savlaj79/to-app-test.git`
- Script Path: `Jenkinsfile`

### 2. Configure Credentials
- Add AWS credentials in Jenkins
- Add DockerHub/ECR credentials

### 3. Run Pipeline
- Build Now
- Monitor in Jenkins console

## AWS Deployment

### Deploy to EC2

```bash
bash deploy-to-aws.sh
```

### Deploy with CloudFormation

```bash
aws cloudformation create-stack \
  --stack-name todo-app-stack \
  --template-body file://cloudformation-template.yaml \
  --region us-east-1
```

## Project Structure

```
to-app-test/
├── server.js                    # Express server
├── package.json                 # Dependencies
├── Dockerfile                   # Docker image config
├── docker-compose.yml           # Docker Compose setup
├── Jenkinsfile                  # CI/CD pipeline
├── cloudformation-template.yaml # AWS IaC
├── deploy-to-aws.sh            # AWS deployment script
├── build-docker.sh             # Docker build script
├── tests/
│   └── app.test.js            # Jest tests
├── .gitignore
└── README.md
```

## Development

### Run in Development Mode
```bash
npm install --save-dev
npm run dev
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

## Troubleshooting

### Docker build fails
```bash
docker builder prune
docker build -t todo-app:latest --no-cache .
```

### Port 3000 already in use
```bash
lsof -i :3000
kill -9 <PID>
```

### Jenkins connection issues
- Check AWS credentials in Jenkins
- Verify ECR repository exists
- Check IAM permissions

## License

ISC

## Support

For issues, please create a GitHub issue or contact the maintainer.
