package com.aceruservicios.repository;

import com.aceruservicios.entity.Categoria;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CategoriaRepo extends JpaRepository<Categoria, Long> {
    
    List<Categoria> findByEstado(String estado, Sort sort);

    @Transactional
    @Modifying
    @Query("UPDATE Categoria c SET c.estado = ?2 WHERE c.id = ?1")
    void cambiarEstado(Long categoriaId, String nuevoEstado);
}
