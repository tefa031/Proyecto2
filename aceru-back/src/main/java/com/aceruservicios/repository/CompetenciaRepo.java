package com.aceruservicios.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aceruservicios.entity.*;
import com.aceruservicios.enums.TipoEstadoCompetencia;

public interface CompetenciaRepo extends JpaRepository<Competencia, Long> {
    
    List<Competencia> findByEstadoOrderByFechaFinalDescIdDesc(TipoEstadoCompetencia estado);
}
