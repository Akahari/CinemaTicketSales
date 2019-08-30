package pl.edu.agh.ticketsales.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Booking implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private Integer hallId = 0;        //not needed directly
    private Integer theaterId = 0;        //not needed directly
    private Integer movieId = 0;        //not needed directly
    private Integer screeningId = 0;

    private String firstName;
    private String lastName;

    @ElementCollection(targetClass=Seat.class)
    private Set<Seat> seats = new HashSet<>();

// <basic getters&setters>
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id;}

    public String getFirstName() {return firstName;}
    public void setFirstName(String firstName) {this.firstName = firstName;}

    public String getLastName() {return lastName;}
    public void setLastName(String lastName) {this.lastName = lastName;}

    public ArrayList<String> getNames() {
        ArrayList<String> names = new ArrayList<String>();
        names.add(this.firstName);
        names.add(this.lastName);
        return names;
    }
    public void setNames(String firstName, String lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Set<Seat> getSeats() {return seats;}
    public void setSeats(Set<Seat> seats) {this.seats = seats;}

    public Integer getScreeningId() { return this.screeningId; }
    public void setScreeningId(Screening screening) {
        this.screeningId = screening.getId();
        this.movieId = screening.getMovieId();
        this.hallId = screening.getHallId();
        this.theaterId = screening.getTheaterId();
    }

    public Integer getHallId() {return hallId; }
    public Integer getTheaterId() {return theaterId;}
    public Integer getMovieId() {return movieId;}
}
