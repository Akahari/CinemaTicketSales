package pl.edu.agh.ticketsales.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.ticketsales.domain.Movie;

@Repository
public interface MovieRepository extends CrudRepository<Movie, Integer> {
    public Movie findById(Integer id);
    public Iterable<Movie> findByTitle(String title);
    public Iterable<Movie> findByCast(String cast);     //how to make this one
    public Iterable<Movie> findByDirectors(String director);       //and this one work
    public Iterable<Movie> findByTags(String tag);      //and this one too
}
