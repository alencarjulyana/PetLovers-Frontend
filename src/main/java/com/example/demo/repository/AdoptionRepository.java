package com.example.demo.repository;

import com.example.demo.model.Adoption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdoptionRepository extends JpaRepository<Adoption, Integer> {
}