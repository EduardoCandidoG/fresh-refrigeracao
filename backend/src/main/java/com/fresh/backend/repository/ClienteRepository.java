package com.fresh.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fresh.backend.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
