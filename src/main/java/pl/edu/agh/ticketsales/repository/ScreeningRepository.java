package pl.edu.agh.ticketsales.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.ticketsales.domain.Screening;

import java.util.Date;

@Repository
public interface ScreeningRepository extends CrudRepository<Screening, Integer>  {
    public Screening findById(Integer id);
    public Iterable<Screening> findByTheaterId(Integer theaterId);
    public Iterable<Screening> findByHallId(Integer hallId);
    public Iterable<Screening> findByMovieId(Integer movieId);
    public Iterable<Screening> findByBookingId(Integer bookingId);
    //public Iterable<Screening> findByStartDate(Date startDate);

}
