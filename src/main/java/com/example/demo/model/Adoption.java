package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Adoption {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int adoptionId;
    int userId;
    int animalId;

    public Adoption() {}

    public Adoption(int adoptionId, int userId, int animalId) {
        this.adoptionId = adoptionId;
        this.userId = userId;
        this.animalId = animalId;
    }

    public int getAdoptionId() {
        return adoptionId;
    }

    public void setAdoptionId(int adoptionId) {
        this.adoptionId = adoptionId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getAnimalId() {
        return animalId;
    }

    public void setAnimalId(int animalId) {
        this.animalId = animalId;
    }
}


