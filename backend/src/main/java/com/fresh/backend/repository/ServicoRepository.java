package com.fresh.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fresh.backend.model.Servico;

public interface ServicoRepository extends JpaRepository<Servico, Long> {
}