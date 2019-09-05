package pl.edu.agh.ticketsales.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.ticketsales.domain.Hall;
import pl.edu.agh.ticketsales.domain.Movie;
import pl.edu.agh.ticketsales.domain.Screening;
import pl.edu.agh.ticketsales.service.HallService;
import pl.edu.agh.ticketsales.service.MovieService;
import pl.edu.agh.ticketsales.service.ScreeningService;
import pl.edu.agh.ticketsales.util.Quasi_screening;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@RestController
@RequestMapping("/api/screening")
public class ScreeningController {
    @Autowired
    private ScreeningService screeningService;
    @Autowired
    private MovieService movieService;
    @Autowired
    private HallService hallService;
    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");

//add screening
    @PostMapping(path="/add")
    public @ResponseBody String addScreening (@RequestBody Quasi_screening quasi_screening) {
        Date startDate = new Date();
        boolean success;
        if(quasi_screening.getStartDateString() != null){

        System.out.println(startDate);
        try {
            startDate = this.sdf.parse(quasi_screening.getStartDateString());
        } catch (ParseException e) { e.printStackTrace(); }
        } else if(quasi_screening.getStartDate() != null){
            startDate = quasi_screening.getStartDate();
        }
        success = screeningService.addScreening(quasi_screening.getHallId(), quasi_screening.getMovieId(), startDate);
        if(success){
            return "Saved screening";
        } else {
            return "Couldn't save screening";
        }
    }

//remove screening
    @PostMapping(path="/remove/{id}")
    public @ResponseBody String removeScreening (@PathVariable("id") Integer id) {
        screeningService.removeScreening(id);
        return "Removed screening";
    }

//update screening
    @PostMapping(path="/update/{id}")
    public @ResponseBody String updateScreening(@PathVariable("id") Integer id, @RequestBody Screening screening) {
        screeningService.updateScreening(id, screening);
        return "Updated screening";
    }

//assign to screening (check timetable for collisions)
    @PostMapping(path="/assignHall/{id}/{hallId}")
    public @ResponseBody String assignHall(@PathVariable("id") Integer id, @PathVariable("hallId") Integer hallId){
        screeningService.assignHall(id, hallId);
        return "Assigned to hall";
    }

//assign movie
@PostMapping(path="/assignMovie/{id}/{movieId}")
    public @ResponseBody String assignMovie(@PathVariable("id") Integer id, @PathVariable("movieId") Integer movieId){
        screeningService.assignMovie(id, movieId);
        return "Assigned movie";
    }

//assign screening date
@PostMapping(path="/assignDate/{id}")
    public @ResponseBody String assignDate(@PathVariable("id") Integer id, @RequestBody Date startDate){
        screeningService.assignStartDate(id, startDate);
        return "Assigned date";
    }

//find
    @GetMapping(path="/all")
    public @ResponseBody Iterable<Screening> getAll(Integer id) { return screeningService.getAll(); }
    @GetMapping(path="/find/{id}")
    public @ResponseBody Screening findById(@PathVariable("id") Integer id) { return screeningService.findById(id); }
    @GetMapping(path="/find/theater/{theaterId}")
    public @ResponseBody Iterable<Screening> findByTheaterId(@PathVariable("theaterId") Integer theaterId) { return screeningService.findByTheaterId(theaterId); }
    @GetMapping(path="/find/hall/{hallId}")
    public @ResponseBody Iterable<Screening> findByHallId(@PathVariable("hallId") Integer hallId) { return screeningService.findByHallId(hallId); }
    @GetMapping(path="/find/movie/{movieId}")
    public @ResponseBody Iterable<Screening> findByMovieId(@PathVariable("movieId") Integer movieId) { return screeningService.findByMovieId(movieId); }
    @GetMapping(path="/find/booking/{bookingId}")
    public @ResponseBody Iterable<Screening> findByBookingId(@PathVariable("bookingId") Integer bookingId) { return screeningService.findByBookingId(bookingId); }
}