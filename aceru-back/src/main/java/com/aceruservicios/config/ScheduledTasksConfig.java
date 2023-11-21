package com.aceruservicios.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import com.aceruservicios.service.ICompetencia;

@Configuration
@EnableScheduling
public class ScheduledTasksConfig {
    @Autowired
    private ICompetencia competenciaService;

    @Scheduled(fixedRate = 60000)
    public void actualizarEstadoCompetenciasVencidas() {
        competenciaService.actualizarEstadoCompetenciasVencidas();
    }
}