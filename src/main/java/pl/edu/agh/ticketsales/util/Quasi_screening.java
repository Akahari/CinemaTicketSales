package pl.edu.agh.ticketsales.util;

import java.io.Serializable;
import java.util.Date;

public class Quasi_screening implements Serializable {
    private Integer hallId;
    private Integer movieId;
    private String startDateString;
    private Date startDate;

    public Integer getHallId() {
        return hallId;
    }

    public Integer getMovieId() {
        return movieId;
    }

    public String getStartDateString() {
        return startDateString;
    }

    public Date getStartDate() {
        return startDate;
    }

    //
    public void setHallId(Integer hallId) {
        this.hallId = hallId;
    }

    public void setMovieId(Integer movieId) {
        this.movieId = movieId;
    }

    public void setStartDateString(String startDateString) {
        this.startDateString = startDateString;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }
}
