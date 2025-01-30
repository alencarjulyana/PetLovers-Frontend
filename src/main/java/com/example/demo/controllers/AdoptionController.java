package com.example.demo.controllers;

import com.example.demo.model.Adoption;
import com.example.demo.services.AdoptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/adocoes")
public class AdoptionController {

    @Autowired
    private AdoptionService adoptionService;

    @PostMapping
    public ResponseEntity<Adoption> registrarAdocao(@RequestBody Adoption adoption) {
        Optional<Adoption> novaAdocao = adoptionService.registrarAdocao(adoption);
        return novaAdocao.map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @GetMapping
    public ResponseEntity<List<Adoption>> listarAdocoes() {
        return ResponseEntity.ok(adoptionService.listarAdocoes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Adoption> buscarAdocao(@PathVariable int id) {
        return adoptionService.buscarAdocao(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelarAdocao(@PathVariable int id) {
        if (adoptionService.cancelarAdocao(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
