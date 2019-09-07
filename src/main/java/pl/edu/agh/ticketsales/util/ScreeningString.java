package pl.edu.agh.ticketsales.util;

import pl.edu.agh.ticketsales.domain.Screening;

import java.io.Serializable;
import java.util.Date;

public class ScreeningString implements Serializable {
    private String startDate;
    private String hallId;
    private String movieId;

    public Quasi_screening parseToQuasi_screening(){
        Quasi_screening quasi_screening = new Quasi_screening();
        quasi_screening.setStartDateString(this.startDate);
        quasi_screening.setHallId(Integer.getInteger(this.hallId));
        quasi_screening.setMovieId(Integer.getInteger(this.movieId));
        return quasi_screening;
    }

}
