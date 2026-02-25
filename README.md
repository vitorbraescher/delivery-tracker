# delivery-tracker
Sample project for a real-time logistics tracker.

<img width="831" height="456" alt="Screenshot 2026-02-25 at 15 19 56" src="https://github.com/user-attachments/assets/de4942b4-0a32-4b2a-bac0-1adce204d2de" />

## The Project Idea
Imagine a fleet of delivery vehicles. Each vehicle sends its GPS coordinates every few seconds. The system processes these coordinates and show them on a map in real-time.

### The Architecture

- The Producer (Java/Spring Boot): A microservice that simulates delivery drivers. It generates random GPS coordinates and "emits" them to a Kafka topic called driver-locations.

- The Broker (Kafka): The central hub that receives location data and holds it for consumers.

- The Consumer & Gateway (TypeScript/Node.js): A service that consumes the driver-locations topic and pushes that data to a frontend via WebSockets (Socket.io).

- The UI (TypeScript/React): A simple dashboard that displays trucks' positions based on the incoming data.

## Setup

### docker-compose

I'm using KRaft mode (Kafka Raft), which is the modern way to run Kafka without needing a separate Zookeeper container. I've also included Kafka UI so I can see the messages visually instead of squinting at a terminal.
Both the containers are configured to be in the same network (kafka-net) when deployed in Docker.

1. Install Docker Desktop if you haven't already.
2. Ensure the Docker engine is running.
3. Launch Kafka by opening your terminal in project's root and running `docker-compose up -d`.
4. Verify your browser to `http://localhost:8080`. You should see Kafka UI dashboard.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
