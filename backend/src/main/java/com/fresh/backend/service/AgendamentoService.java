package com.fresh.backend.service;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import com.fresh.backend.model.Agendamento;
import com.fresh.backend.repository.AgendamentoRepository;

@Service
public class AgendamentoService {

    private final AgendamentoRepository repository;

    public AgendamentoService(AgendamentoRepository repository) {
        this.repository = repository;
    }

    public Agendamento salvar(Agendamento agendamento) {
        agendamento.setStatus("AGENDADO");
        return repository.save(agendamento);
    }

    public List<Agendamento> listarPorData(LocalDate data) {
        return repository.findByData(data);
    }
}