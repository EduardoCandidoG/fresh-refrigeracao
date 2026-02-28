package com.fresh.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import com.fresh.backend.model.Agendamento;
import com.fresh.backend.service.AgendamentoService;

@RestController
@RequestMapping("/agendamentos")
@CrossOrigin
public class AgendamentoController {

    private final AgendamentoService service;

    public AgendamentoController(AgendamentoService service) {
        this.service = service;
    }

    @PostMapping
    public Agendamento salvar(@RequestBody Agendamento agendamento) {
        return service.salvar(agendamento);
    }

    @GetMapping("/data")
    public List<Agendamento> listarPorData(@RequestParam String data) {
        return service.listarPorData(LocalDate.parse(data));
    }
}