package com.example.demo.services;

import com.example.demo.model.Adoption;
import com.example.demo.model.Pet;
import com.example.demo.repository.AdoptionRepository;
import com.example.demo.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdoptionService {

    @Autowired
    private AdoptionRepository adoptionRepository;

    @Autowired
    private PetRepository animalRepository;

    public Optional<Adoption> registrarAdocao(Adoption adoption) {
        Optional<Pet> animal = animalRepository.findById(adoption.getAnimalId());

        if (animal.isPresent() && !animal.get().getStatus()) {
            // Atualiza status do animal para adotado
            Pet pet = animal.get();
            pet.setStatus(true);
            animalRepository.save(pet);

            return Optional.of(adoptionRepository.save(adoption));
        }
        return Optional.empty();
    }

    public List<Adoption> listarAdocoes() {
        return adoptionRepository.findAll();
    }

    public Optional<Adoption> buscarAdocao(int id) {
        return adoptionRepository.findById(id);
    }

    public boolean cancelarAdocao(int id) {
        return adoptionRepository.findById(id).map(adoption -> {
            Optional<Pet> animal = animalRepository.findById(adoption.getAnimalId());
            animal.ifPresent(pet -> {
                pet.setStatus(false);
                animalRepository.save(pet);
            });

            adoptionRepository.delete(adoption);
            return true;
        }).orElse(false);
    }
}
