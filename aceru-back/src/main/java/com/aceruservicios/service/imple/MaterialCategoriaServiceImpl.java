package com.aceruservicios.service.imple;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.aceruservicios.entity.MaterialCategoria;
import com.aceruservicios.repository.MaterialCategoriaRepo;
import com.aceruservicios.service.IMaterialCategoriaService;

@Service
public class MaterialCategoriaServiceImpl implements IMaterialCategoriaService {

	@Autowired
	private MaterialCategoriaRepo materialcaterepo;

	@Override
	public List<MaterialCategoria> listarMaterialCategoria() {
		return materialcaterepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
	}

	@Override
	public void guardarMaterialcat(MaterialCategoria materialcat) {
		materialcaterepo.save(materialcat);
	}

	@Override
	public MaterialCategoria buscarMaterialCat(Long materialcatId) {
		return materialcaterepo.findById(materialcatId).orElse(null);
	}

	@Override
	public void actualizar(MaterialCategoria materialcat) {
		MaterialCategoria materialcatbase = this.buscarMaterialCat(materialcat.getId());

		if (materialcatbase != null) {

			materialcatbase.setId(materialcat.getId());
			materialcatbase.setNombre(materialcat.getNombre());
			materialcatbase.setDescripcion(materialcat.getDescripcion());
			materialcatbase.setEstado(materialcat.getEstado());
			
			if(materialcat.getImagenurl() != null) {
				materialcatbase.setImagenid(materialcat.getImagenid());
				materialcatbase.setImagenurl(materialcat.getImagenurl());
			}
			
			materialcaterepo.save(materialcatbase);
		}

	}

	@Override
	public List<MaterialCategoria> obtenerMaterialCatPorEstado(String estado) {
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		return materialcaterepo.findByEstado(estado, sort);
	}

	@Override
	public void cambiarEstadoMaterialCat(Long materialcatId, String nuevoEstado) {
		materialcaterepo.cambiarEstado(materialcatId, nuevoEstado);
	}

}
