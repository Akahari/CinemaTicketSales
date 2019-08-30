package pl.edu.agh.ticketsales.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.ticketsales.domain.Hall;

@Repository
public interface HallRepository extends CrudRepository<Hall, Integer> {
    public Hall findById(Integer id);
    public Iterable<Hall> findByScreeningId(Integer screeningId);
    public Iterable<Hall> findByTheaterId(Integer theaterId);
}
