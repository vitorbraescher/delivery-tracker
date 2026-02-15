package dev.braescher.driversimulator.services;

import dev.braescher.driversimulator.models.DriverLocation;

public interface ILocationProducerService {
    void sendLocation(DriverLocation location);
}
