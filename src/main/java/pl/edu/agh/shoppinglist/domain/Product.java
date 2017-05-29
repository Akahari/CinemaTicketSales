package pl.edu.agh.shoppinglist.domain;

import java.io.Serializable;

public class Product implements Serializable{
    private String name;
    private String unit;
    private long amount;

    public String getName(){
        return this.name;
    }
    public void setName(String name) {this.name = name;}

    public String getUnit(){
        return this.unit;
    }
    public void setUnit(String unit) { this.unit = unit; }

    public long getAmount(){
        return this.amount;
    }
    public void setAmount(long amount) { this.amount = amount; }

}
