package com.aceruservicios.service.imple;

import java.time.LocalDateTime;
import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aceruservicios.entity.Competencia;
import com.aceruservicios.enums.TipoEstadoCompetencia;
import com.aceruservicios.repository.CompetenciaRepo;
import com.aceruservicios.service.ICompetencia;

import reactor.core.publisher.Flux;

@Service
public class CompetenciaServiceImpl implements ICompetencia{

    @Autowired
    private CompetenciaRepo competenciaRepo;

    @Override
    public List<Competencia> listadarCompetencia(TipoEstadoCompetencia estado) {
        return competenciaRepo.findByEstadoOrderByFechaFinalDescIdDesc(estado);
    }
    
    @Override
    public Competencia guardarCompetencia(Competencia competencia) {
        return competenciaRepo.save(competencia);
    }

    @Transactional
    @Override
    public void actualizarEstadoCompetenciasVencidas() {
        System.out.println("Se esta ejecutando");

        List<Competencia> competenciasVigentes = this.listadarCompetencia(TipoEstadoCompetencia.VIGENTE);

        LocalDateTime now = LocalDateTime.now();
    
        for (Competencia competencia : competenciasVigentes) {
            LocalDateTime fechaFinal = competencia.getFechaFinal();
    
            if (now.isAfter(fechaFinal)) {
                competencia.setEstado(TipoEstadoCompetencia.TERMINADO);
                competenciaRepo.save(competencia);
            }
        }
    }

    public Flux<List<Competencia>> streamCompetenciasPorEstado(TipoEstadoCompetencia estado) {
        Flux<List<Competencia>> source = Flux.create(sink -> {
            while (!sink.isCancelled()) {
                List<Competencia> competencias = this.listadarCompetencia(TipoEstadoCompetencia.VIGENTE);; // Implementa esta función para obtener competencias por estado
                sink.next(competencias);
                try {
                    Thread.sleep(5000); // Espera 5 segundos antes de enviar la próxima actualización (puedes ajustar este valor)
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        return source.share();
    }

    @Override
    public Competencia buscarCompetenciaPorId(Long id) {
        return competenciaRepo.findById(id).get();
    }

    @Override
    public Competencia actualizarCompetencia(Competencia competencia) {
        Competencia compeBase = this.buscarCompetenciaPorId(competencia.getId());      
        System.out.println("COMPETENCIA3 "+ competencia);

        if(compeBase != null){
            compeBase.setId(competencia.getId());
            compeBase.setDescripcion(competencia.getDescripcion());
            compeBase.setEstado(competencia.getEstado());
            compeBase.setFechaFinal(competencia.getFechaFinal());            
            compeBase.setFechaInicio(competencia.getFechaInicio());
            compeBase.setNombre(competencia.getNombre());
            return competenciaRepo.save(compeBase);
        }
        else{
            return null;
        }
    }

    @Override
    public void eliminarCompetenciaPorId(Long id) {
        competenciaRepo.deleteById(id);
    }
    
}
