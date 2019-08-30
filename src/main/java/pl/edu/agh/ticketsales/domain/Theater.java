package pl.edu.agh.ticketsales.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Theater implements Serializable{
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String name;
    private String city;
    private String address;
//    private int revenue;
//    private int viewers;

    @ElementCollection(targetClass=Integer.class)
    private Set<Integer> hallIds = new HashSet<>();

// basic getters&setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; } //should never actually be used

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

// Set operations
    public Set<Integer> getHallIds() { return hallIds; }
    public void setHallIds(Set<Integer> hallIds) { this.hallIds = hallIds; }
    public void addHallId(Integer hallId) { this.hallIds.add(hallId); }
    public void addHallIds(Set<Integer> hallIds) { this.hallIds.addAll(hallIds); }
    public void removeHallId(Integer hallId) { this.hallIds.remove(hallId); }
}
