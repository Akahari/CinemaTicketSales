package pl.edu.agh.ticketsales.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.ticketsales.domain.Theater;
import pl.edu.agh.ticketsales.repository.TheaterRepository;

import java.util.ArrayList;
import java.util.Set;

@Service
public class TheaterService {
    @Autowired
    private TheaterRepository theaterRepository;

    //add theater
    public void addTheater(Theater theater) { theaterRepository.save(theater); }

    //remove movie
    public void removeTheater(Integer id){ theaterRepository.delete(id);}

    //update theater
    public void updateTheater(Integer id, Theater theater){
        Theater n = this.findById(id);
        if(!n.getAddress().equals(theater.getAddress()))  n.setAddress(theater.getAddress());
        if(!n.getName().equals(theater.getName()))  n.setName(theater.getName());
        if(!n.getCity().equals(theater.getCity()))  n.setCity(theater.getCity());
        theaterRepository.save(n);
    }

    //find
    public Iterable<Theater> getAll() { return theaterRepository.findAll(); }
    public Theater findById(Integer id) { return theaterRepository.findById(id); }
    public Iterable<Theater> findByName(String name) { return theaterRepository.findByName(name); }
    public Iterable<Theater> findByCity(String city) { return theaterRepository.findByCity(city); }

    //add Ids
    public void addHallId(Integer id, Integer hallId) {
        Theater n = this.findById(id);
        n.addHallId(hallId);
        theaterRepository.save(n);
    }
    public void addHallIds(Integer id, Set<Integer> hallIds) {
        Theater n = this.findById(id);
        n.addHallIds(hallIds);
        theaterRepository.save(n);
    }

    //remove Ids
    public void removeHallId(Integer id, Integer hallId) {
        Theater n = this.findById(id);
        n.removeHallId(hallId);
        theaterRepository.save(n);
    }
}
