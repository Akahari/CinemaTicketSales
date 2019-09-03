package pl.edu.agh.ticketsales.controller;


import jdk.nashorn.internal.ir.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.ticketsales.domain.Booking;
import pl.edu.agh.ticketsales.domain.Screening;
import pl.edu.agh.ticketsales.domain.Seat;
import pl.edu.agh.ticketsales.service.BookingService;
import pl.edu.agh.ticketsales.util.Quasi_booking;

import java.util.ArrayList;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/booking")
public class BookingController {
    @Autowired
    BookingService bookingService;

    //add
    @PostMapping(path="/add")
    public @ResponseBody String addBooking(@RequestBody Quasi_booking quasi_booking) {
        boolean success;
        success = bookingService.addBooking2(quasi_booking);
        if(success){
            return "Saved booking";
        } else {
            return "Couldn't save booking";
        }
    }

    //remove
    @PostMapping(path="/remove/{id}")
    public @ResponseBody String removeBooking (@PathVariable("id") Integer id) {
        bookingService.removeBooking(id);
        return "Removed booking";
    }

    //update
    @PostMapping(path="/update/{id}")
    public @ResponseBody String updateBooking(@PathVariable("id") Integer id, @RequestBody Booking booking) {
        bookingService.updateBooking(id, booking);
        return "Updated booking";
    }

    //find
    @GetMapping(path="/all")
    public @ResponseBody
    Iterable<Booking> getAll(Integer id) { return bookingService.getAll(); }
    @GetMapping(path="/find/{id}")
    public @ResponseBody Booking findById(@PathVariable("id") Integer id) { return bookingService.findById(id); }
    @GetMapping(path="/find/theater/{theaterId}")
    public @ResponseBody Iterable<Booking> findByTheaterId(@PathVariable("theaterId") Integer theaterId) { return bookingService.findByTheaterId(theaterId); }
    @GetMapping(path="/find/hall/{hallId}")
    public @ResponseBody Iterable<Booking> findByHallId(@PathVariable("hallId") Integer hallId) { return bookingService.findByHallId(hallId); }
    @GetMapping(path="/find/movie/{movieId}")
    public @ResponseBody Iterable<Booking> findByMovieId(@PathVariable("movieId") Integer movieId) { return bookingService.findByMovieId(movieId); }
    @GetMapping(path="/find/screening/{screeningId}")
    public @ResponseBody Iterable<Booking> findByBookingId(@PathVariable("screeningId") Integer screeningId) { return bookingService.findByScreeningId(screeningId); }
    @GetMapping(path="/find/firstName")
    public @ResponseBody Iterable<Booking> findByFirstName(@RequestBody String firstName) { return bookingService.findByFirstName(firstName); }
    @GetMapping(path="/find/lastName")
    public @ResponseBody Iterable<Booking> findByLastName(@RequestBody String lastName) { return bookingService.findByLastName(lastName); }
    @GetMapping(path="/find/names")
    public @ResponseBody Iterable<Booking> findByNames(@RequestBody ArrayList<String> names) { return bookingService.findByBothNames( names.get(0),  names.get(1));}
}
