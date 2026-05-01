package backend.controller;

import backend.model.Booking;
import backend.model.Guide;
import backend.repository.BookingRepository;
import backend.repository.GuideRepository;
import backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/guide")
@CrossOrigin(origins = "http://localhost:5173")
public class GuideController {

    private final GuideRepository guideRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    public GuideController(GuideRepository guideRepository, BookingRepository bookingRepository, UserRepository userRepository) {
        this.guideRepository = guideRepository;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/profile")
    public Guide getProfile(Authentication authentication) {
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .flatMap(user -> guideRepository.findAll().stream()
                        .filter(guide -> guide.getUser().getId().equals(user.getId()))
                        .findFirst())
                .orElseThrow();
    }

    @PutMapping("/profile")
    public Guide updateProfile(Authentication authentication, @RequestBody Guide guide) {
        String username = authentication.getName();
        Guide existingGuide = userRepository.findByUsername(username)
                .flatMap(user -> guideRepository.findAll().stream()
                        .filter(g -> g.getUser().getId().equals(user.getId()))
                        .findFirst())
                .orElseThrow();

        existingGuide.setName(guide.getName());
        existingGuide.setBio(guide.getBio());
        existingGuide.setExperienceYears(guide.getExperienceYears());
        existingGuide.setLanguages(guide.getLanguages());
        existingGuide.setSpecialties(guide.getSpecialties());
        existingGuide.setDescription(guide.getDescription());
        existingGuide.setContactInfo(guide.getContactInfo());
        existingGuide.setRating(guide.getRating());
        existingGuide.setImageUrl(guide.getImageUrl());

        return guideRepository.save(existingGuide);
    }

    @GetMapping("/bookings")
    public List<Booking> getAssignedBookings(Authentication authentication) {
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .map(user -> bookingRepository.findAll().stream()
                        .filter(booking -> booking.getGuide() != null && booking.getGuide().getUser().getId().equals(user.getId()))
                        .collect(Collectors.toList()))
                .orElse(List.of());
    }

    @PutMapping("/bookings/{id}/accept")
    public Booking acceptBooking(@PathVariable Long id) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        return bookingRepository.save(booking);
    }

    @PutMapping("/bookings/{id}/reject")
    public Booking rejectBooking(@PathVariable Long id) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        return bookingRepository.save(booking);
    }
}