# delivery-tracker
Sample project for a real-time logistics tracker.

## The Project Idea
Imagine a fleet of delivery vehicles. Each vehicle sends its GPS coordinates every few seconds. The system processes these coordinates and show them on a map in real-time.

### The Architecture

- The Producer (Java/Spring Boot): A microservice that simulates delivery drivers. It generates random GPS coordinates and "emits" them to a Kafka topic called driver-locations.

- The Broker (Kafka): The central hub that receives location data and holds it for consumers.

- The Consumer & Gateway (TypeScript/Node.js): TBD

- The UI (TypeScript/React): TBD

## Setup

### docker-compose

I'm using KRaft mode (Kafka Raft), which is the modern way to run Kafka without needing a separate Zookeeper container. I've also included Kafka UI so I can see the messages visually instead of squinting at a terminal.
Both the containers are configured to be in the same network (kafka-net) when deployed in Docker.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
