package pl.edu.agh.shoppinglist.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.shoppinglist.domain.ShoppingList;
import pl.edu.agh.shoppinglist.domain.Product;
import pl.edu.agh.shoppinglist.repository.ShoppingListRepository;

@Service
public class ListService {
    @Autowired
    private ShoppingListRepository shoppingListRepository;


    public ShoppingList getListById(Integer id){
        return shoppingListRepository.findListById(id);
    }

    public ShoppingList getListByName(String name){
        return shoppingListRepository.findListByName(name);
    }

    public Iterable<ShoppingList> getAllLists(){
        return shoppingListRepository.findAll();
    }

    public void addList(ShoppingList shoppingList){
        shoppingListRepository.save(shoppingList);
    }


    public void addProduct(String name, Product product){
        ShoppingList shoppingList = shoppingListRepository.findListByName(name);
        shoppingList.addProduct(product);
        shoppingListRepository.save(shoppingList);
    }

    public void removeProduct(String name, int index){
        ShoppingList shoppingList = shoppingListRepository.findListByName(name);
        shoppingList.removeProduct(index);
        shoppingListRepository.save(shoppingList);
    }

    public void moveProduct(String name, int index) {
        ShoppingList shoppingList = shoppingListRepository.findListByName(name);
        shoppingList.moveToBoughtList(index);
        shoppingListRepository.save(shoppingList);
    }

    public void updateProduct(String name, Product product, int index){
        ShoppingList shoppingList = shoppingListRepository.findListByName(name);
        shoppingList.updateProduct(index, product);
        shoppingListRepository.save(shoppingList);
    }
}
