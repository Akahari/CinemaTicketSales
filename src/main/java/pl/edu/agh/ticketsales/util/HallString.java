package pl.edu.agh.ticketsales.util;

import pl.edu.agh.ticketsales.domain.Hall;

import java.io.Serializable;

public class HallString implements Serializable {
    private String theaterId;
    private String name;
    private String rows;
    private String rowLength;

    public Hall parseToHall(){
        Hall hall = new Hall();

        System.out.print(this.theaterId);
        System.out.print(this.name);
        System.out.print(this.rows);
        System.out.print(this.rowLength);

        hall.setTheaterId(Integer.parseInt(this.theaterId));
        hall.setName(this.name);
        hall.setRowsNumber(Integer.parseInt(this.rows));
        hall.setRowLength(Integer.parseInt(this.rowLength));
        return hall;
    }
}
