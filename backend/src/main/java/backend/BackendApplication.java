package backend;

import backend.model.Booking;
import backend.model.Homestay;
import backend.repository.BookingRepository;
import backend.repository.HomestayRepository;
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
    CommandLineRunner initDatabase(HomestayRepository homestayRepository, BookingRepository bookingRepository) {
        return args -> {
            if (homestayRepository.count() == 0) {
                homestayRepository.save(new Homestay("Goa Homestay", "Beautiful beach homestay", "Goa", 150.0, 4, "WiFi, Pool", "goa.jpg"));
                homestayRepository.save(new Homestay("Manali Retreat", "Mountain view homestay", "Manali", 200.0, 6, "Fireplace, Hiking", "manali.jpg"));
                homestayRepository.save(new Homestay("Kerala Backwater", "Traditional Kerala homestay", "Kerala", 180.0, 5, "Boat, Ayurveda", "kerala.jpg"));
                homestayRepository.save(new Homestay("Kashmir Houseboat", "Lake view houseboat", "Kashmir", 250.0, 8, "Lake access, Fishing", "kashmir.jpg"));
            }

            // Sample booking if needed
            // bookingRepository.save(new Booking(...));
        };
    }
}