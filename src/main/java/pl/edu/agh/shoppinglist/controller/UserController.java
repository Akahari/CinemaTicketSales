package pl.edu.agh.shoppinglist.controller;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.shoppinglist.domain.User;
import pl.edu.agh.shoppinglist.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    //add new user
    @RequestMapping(path="/add", method = RequestMethod.POST)
    public String addNewUser(@RequestBody User user){
        if( !user.getEmail().contains("@") || !user.getEmail().contains(".") ) return "Invalid email";
        else if( userService.getUserByName(user.getName()) == null && userService.getUserByEmail(user.getEmail()) == null) {
            userService.addUser(user);
            return "Saved a user";
        }else if( userService.getUserByName(user.getName()) != null && userService.getUserByEmail(user.getEmail() ) != null ) return "Username and email already in use";
        else if( userService.getUserByName(user.getName()) != null ) return "Username already in use";
        else return "Email already in use";
    }

    //get all users
    @RequestMapping(path="/all", method = RequestMethod.GET)
    @ResponseBody
    public  Iterable<User> getAllUsers() {
        return userService.getAllUsers();
    }

    //get user by id
    @RequestMapping(path="/id/{id}", method = RequestMethod.GET)
    @ResponseBody
    public  User getUserById(@PathVariable("id") Integer id) {
        return userService.getUserById(id);
    }

    //get user by name
    @RequestMapping(path="/{name}", method = RequestMethod.GET)
    @ResponseBody
    public  User getUserByName(@PathVariable("name") String name) {
        return userService.getUserByName(name);
    }

    //update specific user
    @RequestMapping(path="/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public String updateUser(@PathVariable("id") Integer id, @RequestBody(required = false) User user) {
        if(user.getName() == null) user.setName("null");
        if(user.getEmail() == null) user.setEmail("null");
        if(user.getPassword() == null) user.setPassword("null");
        userService.updateUser(id, user);
        return "Updated";
    }

    //specific user abandon a list
    @RequestMapping(path="/{name}/abandon/{listId}", method = RequestMethod.PUT)
    @ResponseBody
    public String userAbandonList(@PathVariable("name") String name, @PathVariable("listId") Integer listId) {
        User user = userService.getUserByName(name);
        if(user.getListOfShoppingListsIds().contains(listId) ) {
            userService.userAbandonList(name, listId);
            return "Updated";
        } else return "User does not belong to the list";
    }

    //specific user invited to a list
    @RequestMapping(path="/{name}/invited/{listId}", method = RequestMethod.PUT)
    @ResponseBody
    public String userInvitedToList(@PathVariable("name") String name, @PathVariable("listId") Integer listId){
        User user = userService.getUserByName(name);
        if(user.getListOfShoppingListsIds().contains(listId)) return "User already belongs to the list";
        else {
            userService.userInvitedToList(name, listId);
            return "Invited";
        }
    }

    //get user lists' ids
    @RequestMapping(path="/lists", method = RequestMethod.GET)
    @ResponseBody
    public ArrayList<Integer> getListsFromUserId(@RequestParam Integer id) {
        return userService.getUserById(id).getListOfShoppingListsIds();
    }

}