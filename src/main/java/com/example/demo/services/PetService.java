
package com.example.demo.services;

import com.example.demo.model.Pet;
import com.example.demo.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    @Autowired
    private PetRepository animalRepository;

    public Pet salvarPet(Pet animal) {
        return animalRepository.save(animal);
    }

    public List<Pet> listarAnimais() {
        return animalRepository.findAll();
    }

    public Optional<Pet> buscarAnimal(int id) {
        return animalRepository.findById(id);
    }

    public Optional<Pet> atualizarAnimal(int id, Pet animalAtualizado) {
        return animalRepository.findById(id).map(animal -> {
            animal.setName(animalAtualizado.getName());
            animal.setAge(animalAtualizado.getAge());
            animal.setGender(animalAtualizado.getGender());
            animal.setBreed(animalAtualizado.getBreed());
            animal.setNeutered(animalAtualizado.getNeutered());
            animal.setSize(animalAtualizado.getSize());
            animal.setPhoto(animalAtualizado.getPhoto());
            return animalRepository.save(animal);
        });
    }

    public boolean deletarAnimal(int id) {
        return animalRepository.findById(id).map(animal -> {
            animalRepository.delete(animal);
            return true;
        }).orElse(false);
    }

    public Optional<Pet> alterarStatus(int id, boolean status) {
        return animalRepository.findById(id).map(animal -> {
            animal.setStatus(status);
            return animalRepository.save(animal);
        });
    }
}
