package com.fresh.backend.controller;

import com.fresh.backend.model.Agendamento;
import com.fresh.backend.service.AgendamentoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
@CrossOrigin
public class AgendamentoController {

    private final AgendamentoService service;

    public AgendamentoController(AgendamentoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Agendamento> listar() {
        return service.listar();
    }

    @PostMapping
    public Agendamento salvar(@RequestBody Agendamento agendamento) {
        return service.salvar(agendamento);
    }

    @PutMapping("/{id}/orcamento")
    public Agendamento gerarOrcamento(
            @PathVariable Long id,
            @RequestParam Double valor) {
        return service.gerarOrcamento(id, valor);
    }

    @PutMapping("/{id}/aprovar")
    public Agendamento aprovar(@PathVariable Long id) {
        return service.aprovarOrcamento(id);
    }

    @PutMapping("/{id}/concluir")
    public Agendamento concluir(@PathVariable Long id) {
        return service.concluirServico(id);
    }

    @PutMapping("/{id}/cancelar")
    public Agendamento cancelar(@PathVariable Long id) {
        return service.cancelar(id);
    }
}