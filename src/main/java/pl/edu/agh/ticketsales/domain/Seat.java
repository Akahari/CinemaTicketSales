package pl.edu.agh.ticketsales.domain;

import java.io.Serializable;

public class Seat implements Serializable {
    private int row;
    private int seat;
    //private double price;
    private TicketType ticketType;

// <basic getters&setters>
    public int getRow() {
        return row;
    }
    public void setRow(int row) {
        this.row = row;
    }

    public int getSeat() {
        return seat;
    }
    public void setSeat(int seat) {
        this.seat = seat;
    }

    public TicketType getTicketType() {
        return ticketType;
    }
    public void setTicketType(TicketType ticketType) {
        this.ticketType = ticketType;
    }
}
