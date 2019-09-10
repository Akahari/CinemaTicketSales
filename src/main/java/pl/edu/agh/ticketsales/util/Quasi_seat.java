package pl.edu.agh.ticketsales.util;

import pl.edu.agh.ticketsales.domain.Seat;
import pl.edu.agh.ticketsales.domain.TicketType;

import java.io.Serializable;
import java.util.Set;

public class Quasi_seat implements Serializable{
    private int row;
    private int seat;
    //private double price;
    private String ticketType;

    public int getRow() {
        return row;
    }

    public int getSeat() {
        return seat;
    }

    public String getTicketType() {
        return ticketType;
    }
}
