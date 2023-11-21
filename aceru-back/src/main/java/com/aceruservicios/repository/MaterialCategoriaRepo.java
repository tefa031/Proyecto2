package com.aceruservicios.repository;

import com.aceruservicios.entity.MaterialCategoria;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


public interface MaterialCategoriaRepo extends JpaRepository<MaterialCategoria, Long> {

    List<MaterialCategoria> findByEstado(String estado, Sort sort);

    @Transactional
    @Modifying
    @Query("UPDATE MaterialCategoria c SET c.estado = ?2 WHERE c.id = ?1")
    void cambiarEstado(Long categoriaId, String nuevoEstado);
}
