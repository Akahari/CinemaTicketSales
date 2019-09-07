package pl.edu.agh.ticketsales.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.ticketsales.domain.Theater;
import pl.edu.agh.ticketsales.service.TheaterService;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/theater")
public class TheaterController {
    @Autowired
    private TheaterService theaterService;

    //add new theater
    @PostMapping(path="/add")
    public @ResponseBody String addTheater (@RequestBody Theater theater) {

        Set<Integer> blankSet = new HashSet<>();
        if(theater.getHallIds()== null) theater.setHallIds(blankSet);
        theaterService.addTheater(theater);
        return "Saved theater";
    }

    //remove theater
    @PostMapping(path="/remove/{id}")
    public @ResponseBody String removeTheater (@PathVariable("id") Integer id) {
        theaterService.removeTheater(id);
        return "removed theater";
    }

    //update theater
    @PostMapping(path="/update/{id}")
    public @ResponseBody String updateTheater(@PathVariable("id") Integer id, @RequestBody Theater theater) {
        theaterService.updateTheater(id, theater);
        return "Updated theater";
    }

//find
    //find all theaters
    @GetMapping(path="/all")
    public @ResponseBody Iterable<Theater> getAllTheaters() {return theaterService.getAll();}
    //find by id
    @GetMapping(path="/find/{id}")
    public @ResponseBody Theater findById(@PathVariable("id") Integer id) {return theaterService.findById(id);}
    //find all by city
    @PostMapping(path="/find/city")
    public @ResponseBody Iterable<Theater> findByCity(@RequestBody String city) {return theaterService.findByCity(city);}
    //find by name
    @PostMapping(path="/find/name")
    public @ResponseBody Iterable<Theater> findByName(@RequestBody String name) {return theaterService.findByName(name);}

//add IDs
    @PostMapping(path="/hall/addId/{id}")
    public @ResponseBody String addHallId(@PathVariable("id") Integer id, @RequestBody Integer hallId){
        theaterService.addHallId(id, hallId);
        return "Hall added";
    }
    @PostMapping(path="/hall/addIds/{id}")
    public @ResponseBody String addHallIds(@PathVariable("id") Integer id, @RequestBody Set<Integer> hallIds){
        theaterService.addHallIds(id, hallIds);
        return "Halls added";
    }

//remove IDs
    @PostMapping(path="/hall/removeId/{id}")
    public @ResponseBody String removeHallId(@PathVariable("id") Integer id, @RequestBody Integer hallId){
        theaterService.removeHallId(id, hallId);
        return "Hall removed";
    }

    //get IDs (retired, can just find by id and retrieve from there)
    @GetMapping(path="/hall/getIds/{id}")
    public @ResponseBody Set<Integer> getHallIds(@PathVariable("id") Integer id) {
        Theater n = theaterService.findById(id);
        return n.getHallIds();
    }
}
