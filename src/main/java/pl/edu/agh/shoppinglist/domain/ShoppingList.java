package pl.edu.agh.shoppinglist.domain;

import com.fasterxml.jackson.databind.jsonschema.JsonSerializableSchema;
import com.sun.xml.internal.ws.developer.Serialization;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.ArrayList;

@Entity
public class ShoppingList implements Serializable{
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private String name;


    private ArrayList<Product> productsList;
    private ArrayList<Product> boughtProducts;

    public ShoppingList(){
        this.productsList = new ArrayList<>(200);
        this.boughtProducts = new ArrayList<>(20);
    }

    public void setId(Integer id){
        this.id = id;
    }
    public Integer getId(){
        return this.id;
    }


    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return this.name;
    }


    public void addProduct(Product product){
        /*System.out.println(product == null);
        System.out.println(productsList == null);*/
        productsList.add(product);
    }
    public void removeProduct(int index){
        productsList.remove(index);
    }
    public void moveToBoughtList(int index) {
        boughtProducts.add(0, productsList.get(index));
        if( boughtProducts.size() > 20) boughtProducts.remove(20);
        productsList.remove(index);
    }
    public ArrayList<Product> getProducts(){
        return this.productsList;
    }

    public void updateProduct(int index, Product product){
        productsList.set(index, product);
    }

    public ArrayList<Product> getBoughtProducts(){ return this.boughtProducts; }
}
