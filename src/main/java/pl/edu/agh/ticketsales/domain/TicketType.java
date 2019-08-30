package pl.edu.agh.ticketsales.domain;

public enum TicketType {
    normal(1),
    reduced(0.75),
    kids(0.5);

    private double price;

    //not entirely sure if that's how it works
    //need to figure out if I need to be able to change values assigned to ticket types or how to use them
    TicketType(double price) {
        this.price = price;
    }
}
