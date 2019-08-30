package pl.edu.agh.ticketsales.util;

import java.io.Serializable;
import java.util.Date;

public class Quasi_screening implements Serializable {
    Integer hallId;
    Integer movieId;
    String startDateString;
    Date startDate;

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
}
