package com.aceruservicios.entity;


import com.aceruservicios.security.entity.Usuario;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "ranking")

public class Ranking implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estudiante_id")
    private Usuario estudiante;
    @Column(length = 20)
    private String rango;
    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_actualizacion")
    private Date fechaActualizacion;

    public Ranking() {
        super();
    }

    public Ranking(Long id, Usuario estudiante, String rango, Date fechaActualizacion) {
        super();
        this.id = id;
        this.estudiante = estudiante;
        this.rango = rango;
        this.fechaActualizacion = fechaActualizacion;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getEstudiante() {
        return estudiante;
    }

    public void setEstudiante(Usuario estudiante) {
        this.estudiante = estudiante;
    }

    public String getRango() {
        return rango;
    }

    public void setRango(String rango) {
        this.rango = rango;
    }

    public Date getFechaActualizacion() {
        return fechaActualizacion;
    }

    public void setFechaActualizacion(Date fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("Ranking [id=");
        builder.append(id);
        builder.append(", estudiante=");
        builder.append(estudiante);
        builder.append(", rango=");
        builder.append(rango);
        builder.append(", fechaActualizacion=");
        builder.append(fechaActualizacion);
        builder.append("]");
        return builder.toString();
    }

}

