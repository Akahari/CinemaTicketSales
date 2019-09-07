package pl.edu.agh.ticketsales.util;

import pl.edu.agh.ticketsales.domain.Movie;

import java.io.Serializable;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class MovieString implements Serializable {
    private String title;
    private String duration;
    private String description;
    private String tags;
    private String cast;
    private String directors;


    public Movie parseToMovie() {
        Movie movie = new Movie();
        movie.setTitle(this.title);
        movie.setDuration(Integer.parseInt(this.duration,10));
        movie.setDescription(this.description);
        Set<String> tags = new HashSet<>(Arrays.asList(this.tags.split(";")));
        Set<String> cast = new HashSet<>(Arrays.asList(this.cast.split(";")));
        Set<String> directors = new HashSet<>(Arrays.asList(this.directors.split(";")));
        movie.setTags(tags);
        movie.setCast(cast);
        movie.setDirectors(directors);
        //
        //
        return movie;
    }
}
