import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';

// Configuration
dotenv.config();
const brokers = (process.env.KAFKA_BROKERS || 'localhost:9092').split(',').map(b => b.trim());
const clientId = process.env.KAFKA_CLIENT_ID || 'telemetry-service';
const groupId = process.env.KAFKA_GROUP_ID || 'logistics-group';
const topic = process.env.KAFKA_TOPIC || 'driver-locations';
const fromBeginning = (process.env.FROM_BEGINNING || 'false').toLowerCase() === 'true';

// Model
interface DriverLocation {
  driverId: string;
  latitude: number;
  longitude: number;
};

// Kafka connection
const kafka = new Kafka({
  clientId: clientId,
  brokers: brokers
});

const consumer = kafka.consumer({ groupId: groupId });

const run = async () => {
  await consumer.connect();
  console.log('✅ Telemetry Service connected to Kafka');

  await consumer.subscribe({ 
    topic: topic, 
    fromBeginning: fromBeginning 
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;

      try {
        const data: DriverLocation = JSON.parse(message.value.toString());

        console.log(`🚚 Driver: ${data.driverId}`);
        console.log(`📍 Coords: ${data.latitude}, ${data.longitude}`);
        console.log('---');
        
        // TODO: Send data to UI-Dashboard
      } catch (err) {
        console.error('❌ Failed to parse message:', err);
      }
    }
  });
};

run().catch(console.error);