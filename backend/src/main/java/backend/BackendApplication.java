package backend;

import backend.model.Booking;
import backend.model.Place;
import backend.repository.BookingRepository;
import backend.repository.PlaceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(PlaceRepository placeRepository, BookingRepository bookingRepository) {
        return args -> {
            if (placeRepository.count() == 0) {
                placeRepository.save(new Place("Goa"));
                placeRepository.save(new Place("Manali"));
                placeRepository.save(new Place("Kerala"));
                placeRepository.save(new Place("Kashmir"));
            }

            if (bookingRepository.count() == 0) {
                bookingRepository.save(new Booking(
                        "Lakeview Homestay",
                        "Goa",
                        "homestay",
                        "2026-04-15",
                        "2026-04-18",
                        3,
                        7500.0,
                        "free",
                        null,
                        "Demo User",
                        "demo@example.com",
                        "2026-04-07T10:00:00"
                ));
            }
        };
    }
}