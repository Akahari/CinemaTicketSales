package pl.edu.agh.ticketsales.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.ticketsales.domain.Hall;
import pl.edu.agh.ticketsales.service.HallService;

@RestController
@RequestMapping("/api/hall")
public class HallController {
    @Autowired
    private HallService hallService;

//add new hall
    @PostMapping(path = "/add")
    public @ResponseBody
    String addHall(@RequestBody Hall hall) {
        hallService.addHall(hall);
        return "Saved hall";
    }

//remove hall
    @PostMapping(path = "/remove/{id}")
    public @ResponseBody
    String removeHall(@PathVariable("id") Integer id) {
        hallService.removeHall(id);
        return "Removed hall";
    }

//update hall
    @PostMapping(path = "/update/{id}")
    public @ResponseBody
    String updateHall(@PathVariable("id") Integer id, @RequestBody Hall hall) {
        hallService.updateHall(id, hall);
        return "Updated hall";
    }

//assign to theater
    @PostMapping(path = "/assignTheater{id}/{theaterId}")
    public @ResponseBody
    String assignTheater(@PathVariable("id") Integer id, @PathVariable("theaterId") Integer theaterId) {
        hallService.assignToTheater(id, theaterId);
        return "Assigned to theater";
    }

//find
    //find all halls
    @GetMapping(path = "/all")
    public @ResponseBody
    Iterable<Hall> getAllHalls() {
        return hallService.getAll();
    }

    //find by id
    @GetMapping(path = "/find/{id}")
    public @ResponseBody
    Hall findById(@PathVariable("id") Integer id) {
        return hallService.findById(id);
    }

    //find by screening id
    @GetMapping(path = "/find/screening/{screeningId}")
    public @ResponseBody
    Hall findByScreeningId(@PathVariable("screeningId") Integer screeningId) {
        return hallService.findByScreeningId(screeningId);
    }

    //find all halls in theater by theater id
    @GetMapping(path = "/find/theaterId/{theaterId}")
    public @ResponseBody
    Iterable<Hall> findBYTheaterId(@PathVariable("theaterId") Integer theaterId) {
        return hallService.findByTheaterId(theaterId);
    }
}
