package com.aceruservicios.service.imple;

import com.aceruservicios.entity.Problema;
import com.aceruservicios.repository.ProblemaRepo;
import com.aceruservicios.service.IProblemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemaServiceImpl implements IProblemaService {

    @Autowired
    private ProblemaRepo problemaRepository;

    @Override
    public List<Problema> obtenerProblemasPorCategoriaYEstado(Long categoriaId, String estado) {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        return problemaRepository.findByCategoriaIdAndEstado(categoriaId, estado, sort);
    }


    @Override
    public Problema guardarProblema(Problema problema) {
        return problemaRepository.save(problema);
    }

    @Override
    public Problema actualizarProblema(Problema problema) {

        Problema problemaExistente = problemaRepository.findById(problema.getId()).orElse(null);

        if(problemaExistente != null) {

            problemaExistente.setId(problema.getId());
            problemaExistente.setNombre(problema.getNombre());
            problemaExistente.setDescripcion(problema.getDescripcion());
            problemaExistente.setEntradas(problema.getEntradas());
            problemaExistente.setSalidas(problema.getSalidas());
            problemaExistente.setEjemploEntradas(problema.getEjemploEntradas());
            problemaExistente.setEjemploSalidas(problema.getEjemploSalidas());
            problemaExistente.setDificultad(problema.getDificultad());
            problemaExistente.setEstado(problema.getEstado());

            problemaRepository.save(problemaExistente);
        }

        return null;

    }


    @Override
    public void cambiarEstadoProblema(Long problemaId, String estado) {
        Problema problema = problemaRepository.findById(problemaId).orElse(null);
        if(problema != null){
            problema.setEstado(estado);
            problemaRepository.save(problema);
        }
    }
}
