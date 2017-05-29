package pl.edu.agh.shoppinglist.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.shoppinglist.domain.Product;
import pl.edu.agh.shoppinglist.domain.ShoppingList;
import pl.edu.agh.shoppinglist.service.ListService;

import java.util.ArrayList;



@RestController
@RequestMapping("/api/list")
public class ListController {

    @Autowired
    ListService listService;

    //get all shopping lists
    @RequestMapping(path = "/all", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<ShoppingList> getAllLists() {
        return listService.getAllLists();
    }


    //add new shoppingList
    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public String addNewList(@RequestBody ShoppingList shoppingList) {
        if (listService.getListByName(shoppingList.getName()) == null) {
            listService.addList(shoppingList);
            return "ShoppingList created";
        } else return "ShoppingList name already in use";
    }

    //get shopping list by id
    @RequestMapping(path = "/id/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ShoppingList getListById(@PathVariable("id") Integer id) {
        return listService.getListById(id);
    }

    //get shopping list by name
    @RequestMapping(path = "/{name}", method = RequestMethod.GET)
    @ResponseBody
    public ShoppingList getListByName(@PathVariable("name") String name) {
        return listService.getListByName(name);
    }

    //add product to a list
    @RequestMapping(path = "/addto/{name}", method = RequestMethod.POST)
    public String addProductToList(@PathVariable("name") String name, @RequestBody Product product) {
        //System.out.println("name = [" + name + "], product = [" + product + "]");
        listService.addProduct(name, product);
        return "Product added";
    }

    //remove product from list
    @RequestMapping(path = "/removefrom/{name}/{index}", method = RequestMethod.PUT)
    public String removeProductFromList(@PathVariable("name") String name, @PathVariable("index") int index) {
        listService.removeProduct(name, index);
        return "Product removed";
    }

    //move product from pending to bought
    @RequestMapping(path = "/move/{name}/{index}", method = RequestMethod.PUT)
    public String moveProduct(@PathVariable("name") String name, @PathVariable("index") int index) {
        if(listService.getListByName(name).getProducts() == null) return "No products to move";
        else listService.moveProduct(name, index);
        return "Product moved";
    }

    //update specific product in a list
    @RequestMapping(path = "/update/{name}/{index}", method = RequestMethod.PUT)
    public String updateProduct(@PathVariable("name") String name, @PathVariable("index") int index, @RequestBody Product product) {
        listService.updateProduct(name, product, index);
        return "Updated product info";
    }

    //display product
    @RequestMapping(path = "/view/{name}", method = RequestMethod.GET)
    @ResponseBody
    public ArrayList<Product> getAllUserProducts(@PathVariable("name") String name) {
        ShoppingList shoppingList = listService.getListByName(name);
        return shoppingList.getProducts();
    }
}
