package com.verita.verita.dto;

import java.util.List;

public class ProductDTO {
    private String name;
    private String image;
    private String nutriscore;
    private int novaGroup;
    private String sugarLevel;
    private List<String> additives;
    private List<String> humanizedAlerts;

    // --- GETTERS E SETTERS MANUAIS ---

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getNutriscore() {
        return nutriscore;
    }

    public void setNutriscore(String nutriscore) {
        this.nutriscore = nutriscore;
    }

    public int getNovaGroup() {
        return novaGroup;
    }

    public void setNovaGroup(int novaGroup) {
        this.novaGroup = novaGroup;
    }

    public String getSugarLevel() {
        return sugarLevel;
    }

    public void setSugarLevel(String sugarLevel) {
        this.sugarLevel = sugarLevel;
    }

    public List<String> getAdditives() {
        return additives;
    }

    public void setAdditives(List<String> additives) {
        this.additives = additives;
    }

    public List<String> getHumanizedAlerts() {
        return humanizedAlerts;
    }

    public void setHumanizedAlerts(List<String> humanizedAlerts) {
        this.humanizedAlerts = humanizedAlerts;
    }
}