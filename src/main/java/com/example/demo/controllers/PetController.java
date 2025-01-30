
package com.example.demo.controllers;

import com.example.demo.model.Pet;
import com.example.demo.services.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/pets")
public class PetController {

    @Autowired
    private PetService animalService;

    @PostMapping
    public ResponseEntity<Pet> cadastrarAnimal(@RequestBody Pet animal) {
        Pet novoAnimal = animalService.salvarPet(animal);
        return ResponseEntity.ok(novoAnimal);
    }

    @GetMapping
    public ResponseEntity<List<Pet>> listarAnimais() {
        return ResponseEntity.ok(animalService.listarAnimais());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> buscarAnimal(@PathVariable int id) {
        return animalService.buscarAnimal(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pet> atualizarAnimal(@PathVariable int id, @RequestBody Pet animalAtualizado) {
        return animalService.atualizarAnimal(id, animalAtualizado)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAnimal(@PathVariable int id) {
        if (animalService.deletarAnimal(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Pet> alterarStatus(@PathVariable int id, @RequestParam boolean status) {
        return animalService.alterarStatus(id, status)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
