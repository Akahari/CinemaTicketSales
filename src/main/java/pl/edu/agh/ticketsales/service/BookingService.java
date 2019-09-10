package pl.edu.agh.ticketsales.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.ticketsales.domain.Booking;
import pl.edu.agh.ticketsales.domain.Screening;
import pl.edu.agh.ticketsales.domain.Seat;
import pl.edu.agh.ticketsales.domain.TicketType;
import pl.edu.agh.ticketsales.repository.BookingRepository;
import pl.edu.agh.ticketsales.repository.ScreeningRepository;
import pl.edu.agh.ticketsales.util.Quasi_booking;
import pl.edu.agh.ticketsales.util.Quasi_seat;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private ScreeningRepository screeningRepository;

//add booking
//    Fields that booking should have
//        "firstName":
//        "lastName":
//        "seats":
//        "screeningId":
    /*public boolean addBooking(Booking booking) {
        boolean success = true;
        Screening screening = new Screening();
        Set<Seat> seats = booking.getSeats();
        if(booking.getScreeningId() != null){   //should always be present
            screening = screeningRepository.findById(booking.getScreeningId());
            booking.setScreeningId(screening);
        } else {
            System.out.println("no screening was selected");
            success = false;
        }
        if(seats != null){
            for(Seat seat : seats){
                if(screening.getSeatStatus(seat.getRow(), seat.getSeat())){
                    success = false;
                }
            }
        } else {
            System.out.println("no seats were selected");
            success = false;
        }
        if(success){
            if(seats != null) {
                for(Seat seat : seats){
                    screening.setSeatStatus(seat.getRow(), seat.getSeat(), true);
                    booking.setSeats(seats);
                }
            }
            screening.addBookingId(booking.getId());
            screening.addBooking(booking);
            screeningRepository.save(screening);
            bookingRepository.save(booking);
        } else {
            bookingRepository.delete(booking);
        }



//        Set<Seat> seats = booking.getSeats();
//        Screening screening = screeningRepository.findById(booking.getScreeningId());
//        for(Seat seat : seats){
//            if(!screening.getSeatStatus(seat.getRow(), seat.getSeat())){
//                screening.setSeatStatus(seat.getRow(), seat.getSeat(), true);
//            } else {
//                success = false;
//            }
//        }
//        if(success){
//            screening.addBookingId(booking.getId());
//            screeningRepository.save(screening);
//            bookingRepository.save(booking);
//        }
        return success;
    }*/

    public boolean addBooking2(Quasi_booking quasi_booking) {
        boolean success = true;
        Set<Quasi_seat> quasi_seats = quasi_booking.getSeats();
        Set<Seat> seats = new HashSet<>();
        Screening screening = screeningRepository.findById(quasi_booking.getScreeningId());
        Booking booking = new Booking();
        bookingRepository.save(booking);
        booking.setFirstName(quasi_booking.getFirstName());
        booking.setLastName(quasi_booking.getLastName());
        booking.setScreeningId(screening);

        if(quasi_seats != null){
            for(Quasi_seat quasi_seat : quasi_seats){
                if(screening.getSeatStatus(quasi_seat.getRow(), quasi_seat.getSeat())){
                    success = false;
                }
                Seat seat = new Seat();
                seat.setRow(quasi_seat.getRow());
                seat.setSeat(quasi_seat.getSeat());
                if(quasi_seat.getTicketType().equals("normal")){
                    seat.setTicketType(TicketType.normal);
                }
                if(quasi_seat.getTicketType().equals("reduced")){
                    seat.setTicketType(TicketType.reduced);
                }
                if(quasi_seat.getTicketType().equals("kids")){
                    seat.setTicketType(TicketType.kids);
                }
                seats.add(seat);
            }
        } else {
            System.out.println("no seats were selected");
        }
        if(success){
            if(seats != null) {
                for(Seat seat : seats){
                    screening.setSeatStatus(seat.getRow(), seat.getSeat(), true);
                    booking.setSeats(seats);
                }
            }
            screening.addBookingId(booking.getId());
            screeningRepository.save(screening);
            bookingRepository.save(booking);
        } else {
            bookingRepository.delete(booking);
        }
        return success;
    }

//remove booking
    public void removeBooking(Integer id) {
        Booking booking = bookingRepository.findById(id);
        Set<Seat> seats = booking.getSeats();
        Screening screening = screeningRepository.findById(booking.getScreeningId());
        screening.removeBookingId(id);

        for(Seat seat : seats){
            screening.setSeatStatus(seat.getRow(), seat.getSeat(), false);
        }
        screeningRepository.save(screening);
        bookingRepository.delete(id);
    }

//update booking
    public void updateBooking(Integer id, Booking booking) {
        Booking n = bookingRepository.findById(id);
        if(booking.getFirstName() != null && n.getFirstName() != booking.getFirstName()) n.setFirstName(booking.getFirstName());
        if(booking.getLastName() != null && n.getLastName() != booking.getLastName()) n.setLastName(booking.getLastName());
        if(booking.getScreeningId() != null && n.getScreeningId() != booking.getScreeningId()) {
            Screening oldScreening = screeningRepository.findById(n.getScreeningId());
            Screening newScreening = screeningRepository.findById(booking.getScreeningId());
            oldScreening.removeBookingId(n.getScreeningId());
            newScreening.addBookingId(booking.getScreeningId());

            Set<Seat> oldSeats = n.getSeats();
            Set<Seat> newSeats = booking.getSeats();
            for(Seat s : oldSeats){
                oldScreening.setSeatStatus(s.getRow(), s.getSeat(), false);
            }
            for(Seat s : newSeats){ //unsecured, unchecked, should actually never be used like that
                newScreening.setSeatStatus(s.getRow(), s.getSeat(), true);
            }

            screeningRepository.save(oldScreening);
            screeningRepository.save(newScreening);
            n.setScreeningId(newScreening);
        }
        if(booking.getSeats() != null && n.getSeats() != booking.getSeats()) n.setSeats(booking.getSeats());
        bookingRepository.save(n);
    }

// manage seats
    //there go some seat management functions if needed

//find
    public Iterable<Booking> getAll() { return bookingRepository.findAll(); }
    public Booking findById(Integer id){ return bookingRepository.findById(id); }
    public Iterable<Booking> findByLastName(String lastName){ return bookingRepository.findByLastName(lastName); }
    public Iterable<Booking> findByFirstName(String firstName){ return bookingRepository.findByFirstName(firstName); }
    public Iterable<Booking> findByBothNames(String firstName, String lastName){
        Set<Booking> foundBookings = new HashSet<>();
        Iterable<Booking> tempBookings = bookingRepository.findByLastName(lastName);
        for(Booking booking : tempBookings){
            if(booking.getFirstName().equals(firstName))  foundBookings.add(booking);
        }
        return foundBookings;
    }
    public Iterable<Booking> findByScreeningId(Integer screeningId){ return bookingRepository.findByScreeningId(screeningId); }
    public Iterable<Booking> findByMovieId(Integer movieId){ return bookingRepository.findByMovieId(movieId); }
    public Iterable<Booking> findByHallId(Integer hallId){ return bookingRepository.findByHallId(hallId); }
    public Iterable<Booking> findByTheaterId(Integer theaterId){ return bookingRepository.findByTheaterId(theaterId); }
}
