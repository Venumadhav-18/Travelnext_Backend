package backend.controller;

import backend.model.Booking;
import backend.model.User;
import backend.repository.BookingRepository;
import backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/travel/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    public BookingController(BookingRepository bookingRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Booking> getAllBookings(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        if (user.getRole() == User.Role.ADMIN) {
            return bookingRepository.findAll();
        } else {
            return bookingRepository.findAll().stream()
                    .filter(booking -> booking.getUser().getId().equals(user.getId()))
                    .collect(Collectors.toList());
        }
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        booking.setUser(user);
        booking.setStatus(Booking.BookingStatus.PENDING);

        Booking saved = bookingRepository.save(booking);
        return ResponseEntity.ok(saved);
    }
}