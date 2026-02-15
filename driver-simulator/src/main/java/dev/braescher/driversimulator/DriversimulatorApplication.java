package dev.braescher.driversimulator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;

@SpringBootApplication
@EnableKafka
public class DriversimulatorApplication {

	public static void main(String[] args) {
		SpringApplication.run(DriversimulatorApplication.class, args);
	}

}
