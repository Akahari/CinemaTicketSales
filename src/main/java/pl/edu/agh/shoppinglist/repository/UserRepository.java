package pl.edu.agh.shoppinglist.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.shoppinglist.domain.User;


@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    public User findUserByEmail(String email);
    public User findUserByName(String name);
    public User findUserById(Integer id);
}
