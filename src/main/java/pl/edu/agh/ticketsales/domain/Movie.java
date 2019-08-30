package pl.edu.agh.ticketsales.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;
import java.util.Set;

@Entity
public class Movie implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private String title;
    private int duration; //mins
    @ElementCollection(targetClass=String.class)
    private Set<String> cast;
    @ElementCollection(targetClass=String.class)
    private Set<String> directors;
    @ElementCollection(targetClass=String.class)
    private Set<String> tags;
    private String description;
    private int revenue;    //optional
    private int viewers;    //optional

// basic getters&setters
    public Integer getId() {return id;}
    public void setId(Integer id) {this.id = id;}

    public String getTitle() {return title;}
    public void setTitle(String title) {this.title = title;}

    public int getDuration() {return duration;}
    public void setDuration(int duration) {this.duration = duration;}

    public int getRevenue() { return this.revenue; }
    public void increaseRevenue(int revenue) { this.revenue += revenue; }

    public int getViewership() { return this.viewers; }
    public void increaseViewership(int viewers) { this.viewers += viewers; }

    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

// Set operations
    public Set<String> getCast() {return cast;}
    public void setCast(Set<String> cast) {this.cast = cast;}
    public void addCast(String cast) { this.cast.add(cast); }
    public void addCasts(Set<String> cast) { this.cast.addAll(cast); }
    public void removeCast(String cast) { this.cast.remove(cast); }
    public void removeCasts(Set<String> cast) { this.cast.removeAll(cast); }

    public Set<String> getDirectors() {return directors;}
    public void setDirectors(Set<String> directors) {this.directors = directors;}
    public void addDirector(String director) { this.directors.add(director); }
    public void addDirectors(Set<String> directors) { this.directors.addAll(directors); }
    public void removeDirector(String director) { this.directors.remove(director); }
    public void removeDirectors(Set<String> directors) { this.cast.removeAll(directors); }

    public Set<String> getTags() { return this.tags; }
    public void setTags(Set<String> tags) { this.tags = tags; }
    public void addTag(String tag) { this.tags.add(tag); }
    public void addTags(Set<String> tags) { this.tags.addAll(tags); }
    public void removeTag(String tag) { this.tags.remove(tag); }
    public void removeTags(Set<String> tags) { this.tags.removeAll(tags); }
}
