package com.aceruservicios.service;
import java.util.List;

import com.aceruservicios.entity.Material;

public interface IMaterialService {
	
    List<Material> getAllMaterialsDesc();
    Material getMaterialPorId(Long id);
    List<Material> getMaterialsByCategory(Long categoryId);
    Material saveMaterial(Material material);
    void deleteMaterial(Long id);
    void actualizarMaterial(Material material);
  
  
}
