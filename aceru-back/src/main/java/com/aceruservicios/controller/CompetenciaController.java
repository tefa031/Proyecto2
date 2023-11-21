package com.aceruservicios.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aceruservicios.entity.Competencia;
import com.aceruservicios.enums.TipoEstadoCompetencia;
import com.aceruservicios.service.ICompetencia;

import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/competencia")
@CrossOrigin(origins = "*")
public class CompetenciaController {

    @Autowired
    private ICompetencia competenciaService;
    
    @GetMapping("/porEstado/{estado}")
    public List<Competencia> listarCompetenciasPorEstado(@PathVariable TipoEstadoCompetencia estado) {
        return competenciaService.listadarCompetencia(estado);
    }

    @PostMapping("/crear")
    public Competencia crearCompetencia(@RequestBody Competencia competencia) {
        System.out.println("COMPETENCIA "+ competencia);
        if(competencia.getId() != null){
            return competenciaService.actualizarCompetencia(competencia);
        }else{
            return competenciaService.guardarCompetencia(competencia);
        }
        
    }

    @GetMapping("/porEstado2/{estado}")
    public Flux<ServerSentEvent<List<Competencia>>> sseCompetenciasPorEstado(@PathVariable TipoEstadoCompetencia estado) {
        return competenciaService.streamCompetenciasPorEstado(estado)
            .map(competencias -> ServerSentEvent.<List<Competencia>>builder()
                .event("competencia")
                .data(competencias)
                .build());
    }

    @GetMapping("/{id}")
    public Competencia buscarCompetenciaPorId(@PathVariable Long id) {
        return  competenciaService.buscarCompetenciaPorId(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCompetencia(@PathVariable Long id) {
        competenciaService.eliminarCompetenciaPorId(id);
        return ResponseEntity.noContent().build();
    }


}
