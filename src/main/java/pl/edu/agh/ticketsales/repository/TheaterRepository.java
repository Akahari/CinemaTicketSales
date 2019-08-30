package pl.edu.agh.ticketsales.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.ticketsales.domain.Theater;

@Repository
public interface TheaterRepository extends CrudRepository<Theater, Integer> {
    public Iterable<Theater> findByName(String name);
    public Theater findById(Integer id);
    public Iterable<Theater> findByCity(String city);
}
