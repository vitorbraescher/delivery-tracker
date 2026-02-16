# delivery-tracker
Sample project for a real-time logistics tracker.

## The Project Idea
Imagine a fleet of delivery vehicles. Each vehicle sends its GPS coordinates every few seconds. The system processes these coordinates and show them on a map in real-time.

### The Architecture

- The Producer (Java/Spring Boot): A microservice that simulates delivery drivers. It generates random GPS coordinates and "emits" them to a Kafka topic called driver-locations.

- The Broker (Kafka): The central hub that receives location data and holds it for consumers.

- The Consumer & Gateway (TypeScript/Node.js): TBD

- The UI (TypeScript/React): TBD

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
