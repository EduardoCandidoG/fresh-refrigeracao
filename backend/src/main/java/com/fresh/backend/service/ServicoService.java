package com.fresh.backend.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.fresh.backend.model.Servico;
import com.fresh.backend.repository.ServicoRepository;

@Service
public class ServicoService {

    private final ServicoRepository repository;

    public ServicoService(ServicoRepository repository) {
        this.repository = repository;
    }

    public Servico salvar(Servico servico) {
        return repository.save(servico);
    }

    public List<Servico> listar() {
        return repository.findAll();
    }
}