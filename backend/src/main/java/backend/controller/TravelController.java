package backend.controller;

import backend.repository.PlaceRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/travel")
@CrossOrigin(origins = "http://localhost:5173")
public class TravelController {

    private final PlaceRepository placeRepository;

    public TravelController(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    @GetMapping("/places")
    public List<String> getPlaces() {
        return placeRepository.findAll().stream()
                .map(place -> place.getName())
                .toList();
    }
}