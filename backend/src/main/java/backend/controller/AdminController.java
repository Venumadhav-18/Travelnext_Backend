package backend.controller;

import backend.model.Booking;
import backend.model.Guide;
import backend.model.Homestay;
import backend.model.User;
import backend.repository.BookingRepository;
import backend.repository.GuideRepository;
import backend.repository.HomestayRepository;
import backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final HomestayRepository homestayRepository;
    private final GuideRepository guideRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    public AdminController(HomestayRepository homestayRepository, GuideRepository guideRepository,
                          BookingRepository bookingRepository, UserRepository userRepository) {
        this.homestayRepository = homestayRepository;
        this.guideRepository = guideRepository;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

    // Homestay management
    @GetMapping("/homestays")
    public List<Homestay> getAllHomestays() {
        return homestayRepository.findAll();
    }

    @PostMapping("/homestays")
    public Homestay createHomestay(@RequestBody Homestay homestay) {
        return homestayRepository.save(homestay);
    }

    @PutMapping("/homestays/{id}")
    public Homestay updateHomestay(@PathVariable Long id, @RequestBody Homestay homestay) {
        homestay.setId(id);
        return homestayRepository.save(homestay);
    }

    @DeleteMapping("/homestays/{id}")
    public void deleteHomestay(@PathVariable Long id) {
        homestayRepository.deleteById(id);
    }

    // Guide management
    @GetMapping("/guides")
    public List<Guide> getAllGuides() {
        return guideRepository.findAll();
    }

    @PostMapping("/guides")
    public Guide createGuide(@RequestBody Guide guide) {
        return guideRepository.save(guide);
    }

    @PutMapping("/guides/{id}")
    public Guide updateGuide(@PathVariable Long id, @RequestBody Guide guide) {
        guide.setId(id);
        return guideRepository.save(guide);
    }

    @DeleteMapping("/guides/{id}")
    public void deleteGuide(@PathVariable Long id) {
        guideRepository.deleteById(id);
    }

    // Booking management
    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @PutMapping("/bookings/{id}/assign-guide/{guideId}")
    public Booking assignGuideToBooking(@PathVariable Long id, @PathVariable Long guideId) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        Guide guide = guideRepository.findById(guideId).orElseThrow();
        booking.setGuide(guide);
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        return bookingRepository.save(booking);
    }

    // User management
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}