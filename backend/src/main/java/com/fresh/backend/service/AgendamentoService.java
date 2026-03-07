package com.fresh.backend.service;

import com.fresh.backend.model.Agendamento;
import com.fresh.backend.repository.AgendamentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendamentoService {

    private final AgendamentoRepository repository;

    public AgendamentoService(AgendamentoRepository repository) {
        this.repository = repository;
    }

    public List<Agendamento> listar() {
        return repository.findAll();
    }

    public Agendamento salvar(Agendamento agendamento) {
        return repository.save(agendamento);
    }

    public Agendamento gerarOrcamento(Long id, Double valor) {
        Agendamento a = repository.findById(id).orElseThrow();
        a.setValorTotal(valor);
        a.setStatus("ORCAMENTO_GERADO");
        return repository.save(a);
    }

    public Agendamento aprovarOrcamento(Long id) {
        Agendamento a = repository.findById(id).orElseThrow();
        a.setStatus("APROVADO");
        return repository.save(a);
    }

    public Agendamento concluirServico(Long id) {
        Agendamento a = repository.findById(id).orElseThrow();
        a.setStatus("CONCLUIDO");
        return repository.save(a);
    }

    public Agendamento cancelar(Long id) {
        Agendamento a = repository.findById(id).orElseThrow();
        a.setStatus("CANCELADO");
        return repository.save(a);
    }
}