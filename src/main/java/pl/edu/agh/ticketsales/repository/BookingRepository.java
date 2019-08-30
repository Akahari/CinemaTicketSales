package pl.edu.agh.ticketsales.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.ticketsales.domain.Booking;

import java.util.Date;

@Repository
public interface BookingRepository extends CrudRepository<Booking, Integer>  {
    public Booking findById(Integer id);
    public Iterable<Booking> findByLastName(String lastName);
    public Iterable<Booking> findByFirstName(String firstName);
    public Iterable<Booking> findByScreeningId(Integer screeningId);
    public Iterable<Booking> findByMovieId(Integer movieId);
    public Iterable<Booking> findByHallId(Integer hallId);
    public Iterable<Booking> findByTheaterId(Integer theaterId);

}
