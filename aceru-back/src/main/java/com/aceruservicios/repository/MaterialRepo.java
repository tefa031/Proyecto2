package com.aceruservicios.repository;

import com.aceruservicios.entity.Material;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MaterialRepo extends JpaRepository<Material, Long> {
	
	@Query("SELECT m FROM Material m WHERE m.materialCategoria.id = :categoriaId ORDER BY m.id DESC")
	 List<Material> findByMaterialCategoriaId(@Param("categoriaId") Long categoriaId);

}
