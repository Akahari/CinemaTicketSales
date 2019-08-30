package pl.edu.agh.ticketsales.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.ticketsales.domain.Hall;
import pl.edu.agh.ticketsales.service.HallService;

import java.util.ArrayList;

@RestController
@RequestMapping("MovieTheaters/api/hall")
public class HallController {
    @Autowired
    private HallService hallService;

//add new hall
    @PostMapping(path="/add")
    public @ResponseBody String addHall (@RequestBody Hall hall) {
        hallService.addHall(hall);
        return "Saved hall";
    }

//remove hall
    @PostMapping(path="/{id}/remove")
    public @ResponseBody String removeHall (@PathVariable("id") Integer id) {
        hallService.removeHall(id);
        return "Removed hall";
    }

//update hall
    @PostMapping(path="/update/{id}")
    public @ResponseBody String updateHall(@PathVariable("id") Integer id, @RequestBody Hall hall) {
        hallService.updateHall(id, hall);
        return "Updated hall";
    }

//assign to theater
    @PostMapping(path="/{id}/assignTheater/{theaterId}")
    public @ResponseBody String assignTheater(@PathVariable("id") Integer id, @PathVariable("theaterId") Integer theaterId){
        hallService.assignToTheater(id, theaterId);
        return "Assigned to theater";
    }

//find
    //find all halls
    @GetMapping(path="/all")
    public @ResponseBody Iterable<Hall> getAllHalls() {return hallService.getAll();}

    //find by id
    @GetMapping(path="/find/{id}")
    public @ResponseBody Hall findById(@PathVariable("id") Integer id){ return hallService.findById(id);   }

    //find by screening id
    @GetMapping(path="/find/screening/{screeningId}")
    public @ResponseBody Iterable<Hall> findByScreeningId(@PathVariable("screeningId") Integer screeningId){ return hallService.findByScreeningId(screeningId);   }

    //find all halls in theater by theater id
    @GetMapping(path="/find/theaterId/{theaterId}")
    public @ResponseBody Iterable<Hall> findBYTheaterId(@PathVariable("theaterId") Integer theaterId) { return hallService.findByTheaterId(theaterId); }

//edit fields (optional, can just use update)
    //edit theater ID
    @PostMapping(path="/{id}/theaterId/edit")
    public @ResponseBody String editTheaterId(@PathVariable("id") Integer id, @RequestBody Integer theaterId) {
        hallService.editTheaterId(id, theaterId);
        return "Hall's theater id changed";
    }

    //edit rows count
    @PostMapping(path="/{id}/rows/edit")
    public @ResponseBody String editRows(@PathVariable("id") Integer id, @RequestBody int rows) {
        hallService.editRows(id, rows);
        return "Hall's rows count changed";
    }

    //edit rows length
    @PostMapping(path="/{id}/rowLength/edit")
    public @ResponseBody String editRowsLength(@PathVariable("id") Integer id, @RequestBody int rowsLength) {
        hallService.editRowsLength(id, rowsLength);
        return "Hall's rows length changed";
    }

    //edit name
    @PostMapping(path="/{id}/name/edit")
    public @ResponseBody String editName(@PathVariable("id") Integer id, @RequestBody String name) {
        hallService.editName(id, name);
        return "Hall's name changed";
    }

//get fields (retired, no need for that, can just get the whole object)
    //get theater ID of hall
    @GetMapping(path="/{id}/theaterId")
    public @ResponseBody Integer getTheaterId(@PathVariable("id") Integer id) {
        Hall n = hallService.findById(id);
        return n.getTheaterId();
    }

    //get row count
    @GetMapping(path="/{id}/rows")
    public @ResponseBody Integer getRows(@PathVariable("id") Integer id) {
        Hall n = hallService.findById(id);
        return n.getRows();
    }

    //get rows length
    @GetMapping(path="/{id}/rowLength")
    public @ResponseBody Integer getRowLength(@PathVariable("id") Integer id) {
        Hall n = hallService.findById(id);
        return n.getRowLength();
    }

    //get name
    @GetMapping(path="/{id}/name")
    public @ResponseBody String getName(@PathVariable("id") Integer id) {
        Hall n = hallService.findById(id);
        return n.getName();
    }
}
