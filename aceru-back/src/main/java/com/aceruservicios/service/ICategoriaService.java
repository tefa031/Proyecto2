package com.aceruservicios.service;

import com.aceruservicios.entity.Categoria;

import java.util.List;

public interface ICategoriaService {

    List<Categoria> listarCategoria();

    void guardarCategoria(Categoria categoria);

    Categoria buscarCategoriId(Long categoriaId);

    void actualizar(Categoria categoria);

    List<Categoria> obtenerCategoriasPorEstado(String estado);

    void cambiarEstadoCategoria(Long categoriaId, String nuevoEstado);

}
