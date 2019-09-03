package pl.edu.agh.ticketsales.domain;

import javafx.util.Pair;

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

    private Integer hallId;             //set by screeningId
    private Integer theaterId;          //set by screeningId
    private Integer movieId;            //set by screeningId
    private Integer screeningId;

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

    public Pair<String,String> getNames() {
        Pair<String,String> names = new Pair<String,String>(this.lastName,this.firstName);
        return names;
    }

//    public void setNames(String firstName, String lastName){
//        this.firstName = firstName;
//        this.lastName = lastName;
//    }

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
