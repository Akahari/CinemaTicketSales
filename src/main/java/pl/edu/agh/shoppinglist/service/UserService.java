package pl.edu.agh.shoppinglist.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.shoppinglist.domain.User;
import pl.edu.agh.shoppinglist.repository.UserRepository;

@Service
public class UserService{
    @Autowired
    private UserRepository userRepository;

    public void addUser(String name, String email, String password){
        User n = new User();
        n.setName(name);
        n.setEmail(email);
        n.setPassword(password);
        userRepository.save(n);
    }

    public void addUser(User user){
        userRepository.save(user);
    }

    public void updateUser(Integer id, String name, String email, String password){
        User user = userRepository.findUserById(id);
        if(!name.equals("null") ) user.setName(name);
        if(!email.equals("null") ) user.setEmail(email);
        if(!password.equals("null") ) user.setPassword(password);
        userRepository.save(user);
    }

    public void updateUser(Integer id, User user){
        User n = userRepository.findUserById(id);
        if(!user.getName().equals("null") )n.setName(user.getName());
        if(!user.getEmail().equals("null") ) n.setEmail(user.getEmail());
        if(!user.getPassword().equals("null") ) n.setPassword(user.getPassword());
        if(user.getListOfShoppingListsIds().size() > 0) n.addToListOfShoppingLists(user.getListOfShoppingListsIds());
        userRepository.save(n);
    }

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Integer id) { return userRepository.findUserById(id); }

    public User getUserByName(String name) { return userRepository.findUserByName(name); }

    public User getUserByEmail(String email) { return userRepository.findUserByEmail(email); }

    public void userAbandonList(String name, Integer abandonThisList ){
        User user = userRepository.findUserByName(name);
        user.removeFromListOfShoppingLists(abandonThisList);
        userRepository.save(user);
    }

    public void userInvitedToList(String name, Integer listId){
        User user = userRepository.findUserByName(name);
        user.addToListOfShoppingLists(listId);
        userRepository.save(user);
    }
}