package pl.edu.agh.ticketsales.service;

import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import pl.edu.agh.ticketsales.domain.Movie;
import pl.edu.agh.ticketsales.repository.MovieRepository;

import java.util.*;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

//add movie
    public void addMovie(Movie movie){ movieRepository.save(movie);}

//remove movie
    public void removeMovie(Integer id){ movieRepository.delete(id);}

//update movie
    public void updateMovie(Integer id, Movie movie) {
        Movie n = movieRepository.findById(id);
        if(!n.getTitle().equals(movie.getTitle()) && movie.getTitle() != null) n.setTitle(movie.getTitle());
        if(n.getDuration() != movie.getDuration() && movie.getDuration() != 0) n.setDuration(movie.getDuration());
        if(!n.getDescription().equals(movie.getDescription()) && movie.getDescription() != null) n.setDescription(movie.getDescription());
        if(!n.getCast().equals(movie.getCast()) && movie.getCast() != null) n.setCast(movie.getCast());
        if(!n.getDirectors().equals(movie.getDirectors()) && movie.getDirectors() != null) n.setDirectors(movie.getDirectors());
        if(!n.getTags().equals(movie.getTags()) && movie.getTags() != null) n.setTags(movie.getTags());
        movieRepository.save(n);
    }


//find
    //get all movies
    public Iterable<Movie> getAll() {return movieRepository.findAll(); }
    //find by Id
    public Movie findById(Integer id) {return movieRepository.findById(id); }
    //find by title
    public Iterable<Movie> findByTitle(String title) { return movieRepository.findByTitle(title); }
    //find by directors
    public Iterable<Movie> findByDirector(String director) {return movieRepository.findByDirectors(director);}
    public Iterable<Movie> findByDirectors(Set<String> directors) {
        Set<Movie> foundMovies = new HashSet<>();
        Collection<Movie> tempMovieArrayList = new ArrayList<>();

        for(String s : directors) {  //use this loop to find all movies that has any of the actors on the list
            Iterable<Movie> tempMovies = movieRepository.findByDirectors(s);
            for(Movie m : tempMovies){ tempMovieArrayList.add(m);}  //simply casting all the movies from Iterable to ArrayList
        }

        for(Movie m : tempMovieArrayList){ if(m.getDirectors().containsAll(directors)) foundMovies.add(m); }
        return foundMovies;
    }
    //find by cast
    public Iterable<Movie> findByCast(String cast) {return movieRepository.findByCast(cast);}
    public Set<Movie> findByCastSet(Set<String> cast) {
        Set<Movie> foundMovies = new HashSet<>();
        Collection<Movie> tempMovieArrayList = new ArrayList<>();   //this list will temporarily hold every movie that has any of the actors

        for(String s : cast) {  //use this loop to find all movies that has any of the actors on the list
            Iterable<Movie> tempMovies = movieRepository.findByCast(s);
            for(Movie m : tempMovies){ tempMovieArrayList.add(m);}  //simply casting all the movies from Iterable to ArrayList
        }

        for(Movie m : tempMovieArrayList){ if(m.getCast().containsAll(cast)) foundMovies.add(m); }
        return  foundMovies;
    }
    //find by tags
    public Iterable<Movie> findByTag(String tag) {return movieRepository.findByTags(tag);}
    public Iterable<Movie> findByTags(Set<String> tags) {
        Set<Movie> foundMovies = new HashSet<>();
        Collection<Movie> tempMovieArrayList = new ArrayList<>();

        for(String s : tags) {  //use this loop to find all movies that has any of the actors on the list
            Iterable<Movie> tempMovies = movieRepository.findByTags(s);
            for(Movie m : tempMovies){ tempMovieArrayList.add(m);}  //simply casting all the movies from Iterable to ArrayList
        }

        for(Movie m : tempMovieArrayList){ if(m.getTags().containsAll(tags)) foundMovies.add(m); }
        return foundMovies;
    }

//add
    //add cast
    public void addCast(Integer id, String cast) {
        Movie n = movieRepository.findById(id);
        n.addCast(cast);
        movieRepository.save(n);
    }
    public void addCasts(Integer id, Set<String> cast) {
        Movie n = movieRepository.findById(id);
        n.addCasts(cast);
        movieRepository.save(n);
    }
    //add directors
    public void addDirector(Integer id, String directors) {
        Movie n = movieRepository.findById(id);
        n.addDirector(directors);
        movieRepository.save(n);
    }
    public void addDirectors(Integer id, Set<String> directors) {
        Movie n = movieRepository.findById(id);
        n.addDirectors(directors);
        movieRepository.save(n);
    }
    //add tags
    public void addTag(Integer id, String tag) {
        Movie n = movieRepository.findById(id);
        n.addTag(tag);
        movieRepository.save(n);
    }
    public void addTags(Integer id, Set<String> tags) {
        Movie n = movieRepository.findById(id);
        n.addTags(tags);
        movieRepository.save(n);
    }

//remove
    //remove cast
    public void removeCast(Integer id, String cast) {
        Movie n = movieRepository.findById(id);
        n.removeCast(cast);
        movieRepository.save(n);
    }
    public void removeCasts(Integer id, Set<String> cast) {
        Movie n = movieRepository.findById(id);
        n.removeCasts(cast);
        movieRepository.save(n);
    }
    //remove directors
    public void removeDirector(Integer id, String directors) {
        Movie n = movieRepository.findById(id);
        n.removeDirector(directors);
        movieRepository.save(n);
    }
    public void removeDirectors(Integer id, Set<String> directors) {
        Movie n = movieRepository.findById(id);
        n.removeDirectors(directors);
        movieRepository.save(n);
    }
    //remove tags
    public void removeTag(Integer id, String tag) {
        Movie n = movieRepository.findById(id);
        n.removeTag(tag);
        movieRepository.save(n);
    }
    public void removeTags(Integer id, Set<String> tags) {
        Movie n = movieRepository.findById(id);
        n.removeTags(tags);
        movieRepository.save(n);
    }
}
