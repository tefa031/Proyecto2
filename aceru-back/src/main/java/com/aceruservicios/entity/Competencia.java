package com.aceruservicios.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.aceruservicios.enums.TipoEstadoCompetencia;

@Entity
@Table(name = "competencia")
public class Competencia implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "fecha_inicio")
    private LocalDateTime fechaInicio;

    @Column(name = "fecha_final")
    private LocalDateTime fechaFinal;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TipoEstadoCompetencia estado;

    public Competencia() {
        super();
    }

    public Competencia(Long id, String nombre, String descripcion, LocalDateTime fechaInicio, LocalDateTime fechaFinal, TipoEstadoCompetencia estado) {
        super();
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFinal = fechaFinal;
        this.estado = estado;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }


    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDateTime getFechaFinal() {
        return fechaFinal;
    }

    public void setFechaFinal(LocalDateTime fechaFinal) {
        this.fechaFinal = fechaFinal;
    }

    public TipoEstadoCompetencia getEstado() {
        return estado;
    }

    public void setEstado(TipoEstadoCompetencia estado) {
        this.estado = estado;
    }

    

    @Override
    public String toString() {
        return "Competencia [id=" + id + ", nombre=" + nombre + ", descripcion=" + descripcion + ", fechaInicio="
                + fechaInicio + ", fechaFinal=" + fechaFinal + ", estado=" + estado + "]";
    }



    private static final long serialVersionUID = 1L;

}
