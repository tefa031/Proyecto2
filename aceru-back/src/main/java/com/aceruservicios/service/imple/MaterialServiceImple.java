package com.aceruservicios.service.imple;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aceruservicios.entity.Material;
import com.aceruservicios.repository.MaterialRepo;
import com.aceruservicios.service.IMaterialService;

@Service
public class MaterialServiceImple implements IMaterialService {
	
	@Autowired
	private MaterialRepo materialrepo;

	@Override
	public List<Material> getAllMaterialsDesc() {
		return materialrepo.findAll();
	}

	@Override
	public Material getMaterialPorId(Long id) {
		return materialrepo.findById(id).orElse(null);
	}

	@Override
	public Material saveMaterial(Material material) {
		return materialrepo.save(material);
	}

	@Override
	public void deleteMaterial(Long id) {
		materialrepo.deleteById(id);
	}

	@Override
	public List<Material> getMaterialsByCategory(Long categoryId) {
		return materialrepo.findByMaterialCategoriaId(categoryId);
	}

	@Override
	public void actualizarMaterial(Material material) {
		
		Material matbase = this.getMaterialPorId(material.getId());
		System.out.println("ID EN SERVICIO : "+ matbase.getId());
		if(matbase != null) {
			matbase.setId(material.getId());
			matbase.setNombre(matbase.getNombre());
			matbase.setDescripcion(material.getDescripcion());
			matbase.setTipoMaterial(material.getTipoMaterial());
			matbase.setUrl(material.getUrl());
			/*if(material.getArchivo() != null) {
				matbase.setArchivo(material.getArchivo());
			}*/
			matbase.setMaterialCategoria(material.getMaterialCategoria());
		}
		
		materialrepo.save(matbase);
		
	}

	
}
