package pl.edu.agh.ticketsales.domain;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import reactor.util.function.Tuple2;

import javax.persistence.*;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.*;

@Entity
public class Hall implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private String name;
    private int rowsNumber;
    private int rowLength;

    private Integer theaterId;
    @ElementCollection(targetClass=Integer.class)
    private Set<Integer> screeningId = new HashSet<>();

// basic getters&setters
    public Integer getId() { return id;}
    public void setId(Integer id) { this.id = id;}

    public Integer getTheaterId() { return theaterId;}
    public void setTheaterId(Integer theaterId) { this.theaterId = theaterId;}

    public Set<Integer> getScreeningId() { return this.screeningId; }
    public void addScreeningId(Screening screening) { this.screeningId.add(screening.getId()); }

    public String getName() { return name;}
    public void setName(String name) { this.name = name;}

    public int getRows() {return rowsNumber;}
    public void setRows(int rows) {this.rowsNumber = rows;}

    public int getRowLength() { return rowLength;}
    public void setRowLength(int rowLength) {this.rowLength = rowLength;}


}