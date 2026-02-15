package dev.braescher.driversimulator.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import dev.braescher.driversimulator.models.DriverLocation;

@Service
public class LocationProducerService implements ILocationProducerService {
    private final KafkaTemplate<String, Object> kafkaTemplate;
    
    @Value("${kafka.topic.locations}")
    private String topic;

    public LocationProducerService(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @Override
    public void sendLocation(DriverLocation location) {
        try {
            this.kafkaTemplate.send(topic, location.driverId(), location);
        } catch (Exception e) {
            System.out.println("Failed to send location for driver " + location.driverId());
            e.printStackTrace();
        }
    }
}
