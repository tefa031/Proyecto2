package com.aceruservicios.controller;


import com.aceruservicios.entity.Problema;
import com.aceruservicios.service.IProblemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/problema")
@CrossOrigin(origins = "*")
public class ProblemaController {

    @Autowired
    private IProblemaService problemaService;

    @GetMapping("/listar/{categoriaId}/{estado}")
    public ResponseEntity<List<Problema>> filtrarProblemasPorCategoriaYEstado(
            @PathVariable("categoriaId") Long categoriaId,
            @PathVariable("estado") String estado
    ) {
        List<Problema> problemasFiltrados = problemaService.obtenerProblemasPorCategoriaYEstado(categoriaId, estado);
        return new ResponseEntity<>(problemasFiltrados, HttpStatus.OK);
    }

    @PostMapping("/guardar")
    public ResponseEntity<Problema> guardarProblema(@RequestBody Problema problema) {

        Problema problemaretorno;

        if(problema.getId() != null){
            problemaretorno = problemaService.actualizarProblema(problema);
        }else{
            problemaretorno = problemaService.guardarProblema(problema);
        }

        return new ResponseEntity<>(problemaretorno, HttpStatus.CREATED);
    }

    @PutMapping("/actualizar")
    public ResponseEntity<?> actualizarProblema(@RequestBody Problema problema) {
        Problema problemaActualizado = problemaService.actualizarProblema(problema);
        return new ResponseEntity<>(problemaActualizado, HttpStatus.OK);
    }

    @PutMapping("/cambiarEstado/{problemaId}/{estado}")
    public ResponseEntity<?> cambiarEstadoProblema(
            @PathVariable Long problemaId,
            @PathVariable String estado
    ) {

        problemaService.cambiarEstadoProblema(problemaId, estado);
        return new ResponseEntity<>("{\"message\": \"Estado del problema actualizado\"}", HttpStatus.OK);
    }
}
