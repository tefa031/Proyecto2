package com.aceruservicios.service;

import com.aceruservicios.entity.Problema;

import java.util.List;

public interface IProblemaService {
    List<Problema> obtenerProblemasPorCategoriaYEstado(Long categoriaId, String estado);
    Problema guardarProblema(Problema problema);
    Problema actualizarProblema(Problema problema);
    void cambiarEstadoProblema(Long problemaId, String estado);
}