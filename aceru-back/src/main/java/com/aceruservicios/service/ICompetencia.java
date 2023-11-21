package com.aceruservicios.service;

import java.util.List;

import com.aceruservicios.entity.Competencia;
import com.aceruservicios.enums.TipoEstadoCompetencia;

import reactor.core.publisher.Flux;

public interface ICompetencia {
    
    List<Competencia> listadarCompetencia(TipoEstadoCompetencia estado);
    Competencia guardarCompetencia(Competencia competencia);
    void actualizarEstadoCompetenciasVencidas();
    Flux<List<Competencia>> streamCompetenciasPorEstado(TipoEstadoCompetencia estado);
    Competencia buscarCompetenciaPorId(Long id);
    Competencia actualizarCompetencia(Competencia competencia);
    void eliminarCompetenciaPorId(Long id);


}
