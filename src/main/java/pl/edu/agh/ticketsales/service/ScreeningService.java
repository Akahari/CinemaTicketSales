package pl.edu.agh.ticketsales.service;

import org.apache.commons.lang.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.ticketsales.domain.Booking;
import pl.edu.agh.ticketsales.domain.Hall;
import pl.edu.agh.ticketsales.domain.Movie;
import pl.edu.agh.ticketsales.domain.Screening;
import pl.edu.agh.ticketsales.repository.HallRepository;
import pl.edu.agh.ticketsales.repository.MovieRepository;
import pl.edu.agh.ticketsales.repository.ScreeningRepository;
import pl.edu.agh.ticketsales.util.Quasi_screening;

import java.util.ArrayList;
import java.util.Date;
import java.util.Set;

@Service
public class ScreeningService {
    @Autowired
    private ScreeningRepository screeningRepository;
    @Autowired
    private HallRepository hallRepository;
    @Autowired
    private MovieRepository movieRepository;

//add screening
    public boolean addScreening(Quasi_screening quasi_screening) {

        boolean success = true;
        Movie movie = movieRepository.findById(quasi_screening.getMovieId());
        Hall hall = hallRepository.findById(quasi_screening.getHallId());
        Screening screening = new Screening();
        screening.setMovieId(movie);
        screening.setHallId(hall);

        Set<Integer> bookedScreeningIds = hall.getScreeningId();
        if(!bookedScreeningIds.isEmpty()) {
            for (Integer screeningId : bookedScreeningIds) {
                Screening tempScreening = screeningRepository.findById(screeningId);
                Date tempStartDate = tempScreening.getStartDate();
                Date tempEndDate = tempScreening.getEndDate();
                Date endDate = DateUtils.addMinutes(quasi_screening.getStartDate(), screening.getDuration());
                if ((quasi_screening.getStartDate().compareTo(tempStartDate) >= 0 && quasi_screening.getStartDate().compareTo(tempEndDate) <= 0) || (endDate.compareTo(tempStartDate) >= 0 && endDate.compareTo(tempEndDate) <= 0)) {
                    //that means the screening I want to add clashes with already scheduled screening
                    success = false;
                }
            }
        }
        if(success) {
            screening.setStartDate(quasi_screening.getStartDate());
            screeningRepository.save(screening);
            hall.addScreeningId(screening);
            hallRepository.save(hall);
        }
        return success;
    }

//remove screening
    public void removeScreening(Integer id) {
        //maybe some pre-processing, remove any artifacts
        //also needs to be removed from hall timetable
        screeningRepository.delete(id);
    }

//update screening
    public void updateScreening(Integer id, Quasi_screening quasi_screening){

        Screening n = screeningRepository.findById(id);
        if(quasi_screening.getStartDate() != null && n.getStartDate() != quasi_screening.getStartDate()) {  //situation = rescheduling a screening
            //possibly reschedule all the bookings of this screening too?
            n.setStartDate(quasi_screening.getStartDate());
        }
        if(quasi_screening.getHallId() != null && !n.getHallId().equals(quasi_screening.getHallId())) {     //situation = moving screening to another hall
            //if there are no bookings for the screening yet, then no problem
            //if there are some bookings already and the hall have the same size, no problem
            //if there are and new hall have different size (should never happen) then solution might be too complicated to bother, so just ditch all the booking IDs
            Hall h = hallRepository.findById(quasi_screening.getHallId());
            n.setHallId(h); //setHallId has some kind of self-defense mechanism implemented anyway
        }
        if(quasi_screening.getMovieId() != null &&  !n.getMovieId().equals(quasi_screening.getMovieId())) {  //situation = changing movie
            Movie m = movieRepository.findById(quasi_screening.getMovieId());
            n.setMovieId(m);
        }
        screeningRepository.save(n);
    }

//assign to hall (check timetable for collisions)
    public String assignHall(Integer id, Integer hallId) {
        Hall hall = hallRepository.findById(hallId);
        Screening screening = screeningRepository.findById(id);
        boolean success = true;
        //check for schedule collision
        //does the screening even have a movie or starting date already? if not, there's no issue HERE
        if(screening.getMovieId() != null || screening.getStartDate() != null){
            Set<Integer> bookedScreeningsIds = hall.getScreeningId();
            for(Integer screeningId : bookedScreeningsIds){
                Screening tempScreening = screeningRepository.findById(screeningId);
                Date tempStartDate = tempScreening.getStartDate();
                Date tempEndDate = tempScreening.getEndDate();
                Date startDate = screening.getStartDate();
                Date endDate = screening.getEndDate();
                if( (startDate.compareTo(tempStartDate) >= 0  && startDate.compareTo(tempEndDate) <= 0) || (endDate.compareTo(tempStartDate) >= 0  && endDate.compareTo(tempEndDate) <= 0)  ) {
                    //that means the screening I want to add clashes with already scheduled screening
                    success = false;
                }
            }
        }

        if(success) {
            hall.addScreeningId(screening);
            screening.setHallId(hall);
            hallRepository.save(hall);
            screeningRepository.save(screening);
            return "Successfully scheduled screening";
        } else {
            return "Failed due to schedule collision";
        }
    }

//assign movie
    public String assignMovie(Integer id, Integer movieId) {
        Screening screening = screeningRepository.findById(id);
        Movie movie = movieRepository.findById(movieId);
        boolean success = true;
        if(screening.getStartDate() != null && screening.getHallId() != null) {
            Hall hall = hallRepository.findById(screening.getHallId());
            Set<Integer> bookedScreeningsIds = hall.getScreeningId();
            for(Integer screeningId : bookedScreeningsIds) {
                Screening tempScreening = screeningRepository.findById(screeningId);
                Date tempStartDate = tempScreening.getStartDate();
                Date tempEndDate = tempScreening.getEndDate();
                Date startDate = screening.getStartDate();
                Date endDate = DateUtils.addMinutes(startDate, movie.getDuration());
                if( (startDate.compareTo(tempStartDate) >= 0  && startDate.compareTo(tempEndDate) <= 0) || (endDate.compareTo(tempStartDate) >= 0  && endDate.compareTo(tempEndDate) <= 0)  ) {
                    //that means the screening I want to add clashes with already scheduled screening
                    success = false;
                }
            }

            if(success) {
                hall.addScreeningId(screening);
                screening.setMovieId(movie);
                hallRepository.save(hall);
                screeningRepository.save(screening);
                return "Successfully scheduled screening";
            } else {
                return "Failed due to schedule collision";
            }
        } else {
            screening.setMovieId(movie);
            screeningRepository.save(screening);
            return "Successfully scheduled screening";
        }
    }

//assign screening date
    public boolean assignStartDate(Integer id, Date startDate){
        Screening screening = screeningRepository.findById(id);
        boolean success = true;

        if(screening.getMovieId() != null && screening.getHallId() != null){    //if the screening has no selected duration (movie) or place (hall) then there's not collision HERE
           //check if chosen date is suitable
            Hall hall = hallRepository.findById(screening.getHallId());
            Set<Integer> bookedScreeningsIds = hall.getScreeningId();
            for(Integer screeningId : bookedScreeningsIds){
                Screening tempScreening = screeningRepository.findById(screeningId);
                Date tempStartDate = tempScreening.getStartDate();
                Date tempEndDate = tempScreening.getEndDate();
                Date endDate =  DateUtils.addMinutes(startDate, screening.getDuration());
                if( (startDate.compareTo(tempStartDate) >= 0  && startDate.compareTo(tempEndDate) <= 0) || (endDate.compareTo(tempStartDate) >= 0  && endDate.compareTo(tempEndDate) <= 0)  ) {
                    //that means the screening I want to add clashes with already scheduled screening
                    success = false;
                }
            }

            if(success) {
                hall.addScreeningId(screening);
                screening.setStartDate(startDate);
                hallRepository.save(hall);
                screeningRepository.save(screening);
                //return "Successfully scheduled screening";
            } else {
                //return "Failed due to schedule collision";
            }
        } else {
            screening.setStartDate(startDate);
            screeningRepository.save(screening);
            //return "Successfully scheduled screening";
        }
        return success;
    }

    //find
    //get all movies
    public Iterable<Screening> getAll() {return screeningRepository.findAll(); }
    public Screening findById(Integer id) { return screeningRepository.findById(id); }
    public Iterable<Screening> findByTheaterId(Integer theaterId) { return screeningRepository.findByTheaterId(theaterId); }
    public Iterable<Screening> findByHallId(Integer hallId) { return screeningRepository.findByHallId(hallId); }
    public Iterable<Screening> findByMovieId(Integer movieId) { return screeningRepository.findByMovieId(movieId); }
    public Iterable<Screening> findByBookingId(Integer bookingId) { return screeningRepository.findByBookingId(bookingId); }
}
