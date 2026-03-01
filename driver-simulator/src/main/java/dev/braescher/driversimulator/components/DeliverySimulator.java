package dev.braescher.driversimulator.components;

import java.util.UUID;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import dev.braescher.driversimulator.models.DriverLocation;
import dev.braescher.driversimulator.services.ILocationProducerService;

@Component
@EnableScheduling
public class DeliverySimulator {
    private final ILocationProducerService locationService;
    private final String driverId = "driver-" + UUID.randomUUID().toString().substring(0, 5);

    public DeliverySimulator(ILocationProducerService locationService) {
        this.locationService = locationService;
    }

    @Scheduled(fixedRate = 2000) // Every 2 sec
    public void simulateMovement() {
        double lat = -30.0333 + (Math.random() - 0.5) / 100;
        double lon = -51.2000 + (Math.random() - 0.5) / 100;

        DriverLocation loc = new DriverLocation(driverId, lat, lon);
        locationService.sendLocation(loc);
        System.out.println("Sent: " + loc);
    }
}
