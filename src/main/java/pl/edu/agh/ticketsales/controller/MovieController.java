package pl.edu.agh.ticketsales.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.ticketsales.domain.Movie;
import pl.edu.agh.ticketsales.service.MovieService;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/movie")
public class MovieController {
    @Autowired
    private MovieService movieService;

//add new movie
    @PostMapping(path="/add")
    public @ResponseBody String addMovie (@RequestBody Movie movie) {
        Set<String> blankArrayList = new HashSet<String>();
        if(movie.getCast() == null) movie.setCast(blankArrayList);
        if(movie.getDirectors() == null) movie.setDirectors(blankArrayList);
        if(movie.getTags() == null) movie.setTags(blankArrayList);
        movieService.addMovie(movie);
        return "Saved movie";
    }

//remove movie
    @PostMapping(path="/remove/{id}")
    public @ResponseBody String removeMovie (@PathVariable("id") Integer id) {
        movieService.removeMovie(id);
        return "Removed movie";
    }

//update movie
    @PostMapping(path="/update/{id}")
    public @ResponseBody String updateMovie(@PathVariable("id") Integer id, @RequestBody Movie movie) {
        movieService.updateMovie(id, movie);
        return "Updated movie";
    }

//find
    //find all movies
    @GetMapping(path="/all")
    public @ResponseBody Iterable<Movie> getAllHalls() {return movieService.getAll();}

    //find by Id
    @GetMapping(path="/find/{id}")
    public @ResponseBody Movie findById(@PathVariable("id") Integer id) {return movieService.findById(id);}

    //find by title
    @PostMapping(path="/find/title")
    public @ResponseBody Iterable<Movie> findByTitle(@RequestBody String title) {return movieService.findByTitle(title);}

    //find by directors
    @PostMapping(path="/find/director")
    public @ResponseBody Iterable<Movie> findByDirector(@RequestBody String director) {return movieService.findByDirector(director);}
    @PostMapping(path="/find/directorSet")
    public @ResponseBody Iterable<Movie> findByDirectors(@RequestBody Set<String> directors) {return movieService.findByDirectors(directors);}

    //find by cast
    @PostMapping(path="/find/cast")
    public @ResponseBody Iterable<Movie> findByCastContaining(@RequestBody String cast) {return movieService.findByCast(cast);}
    @PostMapping(path="/find/castSet")
    public @ResponseBody Set<Movie> findByCastSet(@RequestBody Set<String> cast) {return movieService.findByCastSet(cast);}

    //find by tags
    @PostMapping(path="/find/tag")
    public @ResponseBody Iterable<Movie> findByTag(@RequestBody String tag) {return movieService.findByTag(tag);}
    @PostMapping(path="/find/tagSet")
    public @ResponseBody Iterable<Movie> findByTags(@RequestBody Set<String> tags) {return movieService.findByTags(tags);}

//add
    //add directors
    @PostMapping(path="/director/add/{id}")
    public @ResponseBody String addDirector(@PathVariable("id") Integer id, @RequestBody String director){
        movieService.addDirector(id, director);
        return "Director added";
    }
    @PostMapping(path="/directors/add/{id}")
    public @ResponseBody String addDirectors(@PathVariable("id") Integer id, @RequestBody Set<String> directors){
        movieService.addDirectors(id, directors);
        return "Directors added";
    }
    //add cast
    @PostMapping(path="/cast/add/{id}")
    public @ResponseBody String addCast(@PathVariable("id") Integer id, @RequestBody String cast){
        movieService.addCast(id, cast);
        return "Cast added";
    }
    @PostMapping(path="/casts/add/{id}")
    public @ResponseBody String addCasts(@PathVariable("id") Integer id, @RequestBody Set<String> casts){
        movieService.addCasts(id, casts);
        return "Casts added";
    }
    //add tags
    @PostMapping(path="/tag/add/{id}")
    public @ResponseBody String addTag(@PathVariable("id") Integer id, @RequestBody String tag){
        movieService.addTag(id, tag);
        return "Tag added";
    }
    @PostMapping(path="/tags/add/{id}")
    public @ResponseBody String addTags(@PathVariable("id") Integer id, @RequestBody Set<String> tags){
        movieService.addTags(id, tags);
        return "Tags added";
    }

//remove
    //remove directors
    @PostMapping(path="/director/remove/{id}")
    public @ResponseBody String removeDirector(@PathVariable("id") Integer id, @RequestBody String director){
        movieService.removeDirector(id, director);
        return "Director removed";
    }
    @PostMapping(path="/directors/remove/{id}")
    public @ResponseBody String removeDirectors(@PathVariable("id") Integer id, @RequestBody Set<String> directors){
        movieService.removeDirectors(id, directors);
        return "Directors removed";
    }
    //remove cast
    @PostMapping(path="/cast/remove/{id}")
    public @ResponseBody String removeCast(@PathVariable("id") Integer id, @RequestBody String cast){
        movieService.removeCast(id, cast);
        return "Cast removed";
    }
    @PostMapping(path="/casts/remove/{id}")
    public @ResponseBody String removeCasts(@PathVariable("id") Integer id, @RequestBody Set<String> casts){
        movieService.removeCasts(id, casts);
        return "Casts removed";
    }
    //remove tags
    @PostMapping(path="/tag/remove/{id}")
    public @ResponseBody String removedTag(@PathVariable("id") Integer id, @RequestBody String tag){
        movieService.removeTag(id, tag);
        return "Tag removed";
    }
    @PostMapping(path="/tags/remove/{id}")
    public @ResponseBody String removeTags(@PathVariable("id") Integer id, @RequestBody Set<String> tags){
        movieService.removeTags(id, tags);
        return "Tag removed";
    }
}
