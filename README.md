# DrivingLicenseAnalysis - Docker Compose Project

This project uses Docker Compose to set up and manage a multi-service application. The services include a frontend, backend, PostgreSQL database, Prometheus for monitoring, Grafana for visualization, and pgAdmin for database administration.

## Prerequisites

Ensure you have Docker and Docker Compose installed on your machine.

## Services

### przedni_koniec (Frontend)
- **Build Context**: `./client`
- **Ports**: `3000:3000`
- **Networks**: `front_network`
- **Depends on**: `tylni_koniec`

### tylni_koniec (Backend)
- **Build Context**: `./server`
- **Ports**: `8888:8888`
- **Volumes**:
  - `./server/.env:/usr/src/app/.env`
  - `./server/config/config.json:/usr/src/app/config/config.json`
- **Networks**: `back_network`, `front_network`
- **Depends on**: `postgres` (with condition `service_healthy`)

### postgres (Database)
- **Build Context**: `./postgres`
- **Ports**: `5432:5432`
- **Environment Variables**:
  - `POSTGRES_DB=drivingstatisticsdb`
  - `POSTGRES_PASSWORD_FILE=/run/secrets/db_password`
  - `POSTGRES_USER=postgres`
- **Volumes**: `pg_data:/var/lib/postgresql/data`
- **Secrets**: `db_password`
- **Networks**: `back_network`

### prometheus (Monitoring)
- **Build Context**: `./prometheus`
- **Ports**: `9090:9090`
- **Volumes**:
  - `./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml`
  - `prometheus_data:/prometheus`
- **Networks**: `back_network`
- **Depends on**: `tylni_koniec`

### grafana (Visualization)
- **Build Context**: `./grafana`
- **Ports**: `3001:3000`
- **Environment Variables**:
  - `GF_SECURITY_ADMIN_USER=admin@example.com`
  - `GF_SECURITY_ADMIN_PASSWORD=admin`
  - `GF_USERS_ALLOW_SIGN_UP="false"`
- **Volumes**:
  - `grafana_data:/var/lib/grafana`
  - `./grafana/provisioning/:/etc/grafana/provisioning/`
- **Networks**: `back_network`
- **Depends on**: `prometheus`

### pgadmin (Database Administration)
- **Build Context**: `./pgadmin`
- **Ports**: `5050:80`
- **Environment Variables**:
  - `PGADMIN_DEFAULT_EMAIL=admin@example.com`
  - `PGADMIN_DEFAULT_PASSWORD=admin`
- **Networks**: `back_network`
- **Depends on**: `postgres`

## Volumes

- `pg_data`: For PostgreSQL data persistence
- `prometheus_data`: For Prometheus data persistence
- `grafana_data`: For Grafana data persistence

## Networks

- `front_network`: Network for frontend services
- `back_network`: Network for backend services

## Secrets

- `db_password`: Stored in `./postgres/password.txt`

## Configuration Files

Ensure you have the following configuration files in the appropriate directories:

### .env file for Backend
Create a `.env` file in the `./server` directory with the following content:

```plaintext
JWTPRIVATEKEY=abcdefg
SALT=10
```

### config.json file for Backend
Create a `config.json` file in the `./server/config` directory with the following content:

```json
{
  "database": {
    "host": "postgres",
    "port": 5432,
    "username": "postgres",
    "password": "8WYAGw8fXQQG4nnX7THv",
    "database": "drivingstatisticsdb",
    "dialect": "postgres"
  }
}
```

### password.txt file for postgres

Create a `password.txt` file in the `./postgres` directory with the following content:

```plaintext
8WYAGw8fXQQG4nnX7THv
```

## Usage

To start the project, run the following command:

```sh
docker-compose up --build
```

## Stopping the Services

To stop all running services use:

```sh
docker-compose down
```

## Additional Information

- The frontend service is accessible at `http://localhost:3000`
- The backend service is accessible at `http://localhost:8888`
- Prometheus is accessible at `http://localhost:9090`
- Grafana is accessible at `http://localhost:3001`
- pgAdmin is accessible at `http://localhost:5050`

Ensure you configure your environment files and other necessary configurations as required by each service before starting the containers.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
