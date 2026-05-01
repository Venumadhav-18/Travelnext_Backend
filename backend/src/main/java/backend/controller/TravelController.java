package backend.controller;

import backend.model.Homestay;
import backend.repository.HomestayRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/travel")
@CrossOrigin(origins = "http://localhost:5173")
public class TravelController {

    private final HomestayRepository homestayRepository;

    public TravelController(HomestayRepository homestayRepository) {
        this.homestayRepository = homestayRepository;
    }

    @GetMapping("/homestays")
    public List<Homestay> getHomestays() {
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
}