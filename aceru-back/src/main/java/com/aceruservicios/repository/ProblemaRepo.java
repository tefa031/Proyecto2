package com.aceruservicios.repository;


import com.aceruservicios.entity.Problema;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ProblemaRepo extends JpaRepository<Problema, Long> {

    List<Problema> findByCategoriaIdAndEstado(Long categoriaId, String estado, Sort sort);
}
