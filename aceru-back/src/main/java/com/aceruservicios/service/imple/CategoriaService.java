package com.aceruservicios.service.imple;

import com.aceruservicios.entity.Categoria;
import com.aceruservicios.repository.CategoriaRepo;
import com.aceruservicios.service.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
public class CategoriaService implements ICategoriaService {


    @Autowired
    private CategoriaRepo categoriarepo;

    @Override
    public List<Categoria> listarCategoria() {
        return categoriarepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @Override
    public void guardarCategoria(Categoria categoria) {
        categoriarepo.save(categoria);
    }

    @Override
    public Categoria buscarCategoriId(Long categoriaId) {
        return categoriarepo.findById(categoriaId).orElse(null);
    }

    @Override
    public void actualizar(Categoria categoria) {

    	System.out.println("CATEGORIA IMAGEN "+ categoria.getImagenurl());
        Categoria categoriabase = this.buscarCategoriId(categoria.getId());

        if( categoriabase != null){

            categoriabase.setId(categoria.getId());
            categoriabase.setNombre(categoria.getNombre());
            categoriabase.setDescripcion(categoria.getDescripcion());
            
            if(categoria.getImagenurl() != null) {
                categoriabase.setImagenurl(categoria.getImagenurl());
                categoriabase.setImagenid(categoria.getImagenid());
            }
            
            categoriabase.setEstado(categoria.getEstado());
            categoriarepo.save(categoriabase);
        }
    }

    @Override
    public List<Categoria> obtenerCategoriasPorEstado(String estado) {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        return categoriarepo.findByEstado(estado, sort);
    }

    @Override
    public void cambiarEstadoCategoria(Long categoriaId, String nuevoEstado) {
        categoriarepo.cambiarEstado(categoriaId, nuevoEstado);
    }
}
