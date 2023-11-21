package com.aceruservicios.service;

import java.util.List;

import com.aceruservicios.entity.MaterialCategoria;

public interface IMaterialCategoriaService {

	
    List<MaterialCategoria> listarMaterialCategoria();

    void guardarMaterialcat(MaterialCategoria materialcat);

    MaterialCategoria buscarMaterialCat(Long materialcatId);

    void actualizar(MaterialCategoria materialcat);

    List<MaterialCategoria> obtenerMaterialCatPorEstado(String estado);

    void cambiarEstadoMaterialCat(Long materialcatId, String nuevoEstado);

}
