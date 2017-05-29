package pl.edu.agh.shoppinglist.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.shoppinglist.domain.ShoppingList;


@Repository
public interface ShoppingListRepository extends CrudRepository<ShoppingList, Long> {
    public ShoppingList findListByName(String name);
    public ShoppingList findListById(Integer id);
}