package com.fresh.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.fresh.backend.model.Servico;
import com.fresh.backend.service.ServicoService;

@RestController
@RequestMapping("/servicos")
@CrossOrigin
public class ServicoController {

    private final ServicoService service;

    public ServicoController(ServicoService service) {
        this.service = service;
    }

    @PostMapping
    public Servico salvar(@RequestBody Servico servico) {
        return service.salvar(servico);
    }

    @GetMapping
    public List<Servico> listar() {
        return service.listar();
    }
}