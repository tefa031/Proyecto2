package com.aceruservicios.entity;

import javax.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "materialcategoria")
public class MaterialCategoria implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length = 200)
	private String nombre;
	
	private String imagenurl;

	@Column(columnDefinition = "TEXT")
	private String descripcion;


	private String imagenid;
	
	@Column(length = 50, columnDefinition = "VARCHAR(50) DEFAULT 'Activo'")
	private String estado;
	

	public MaterialCategoria() {
		super();
	}

	public MaterialCategoria(String nombre, String descripcion, String imagenurl, String imagenid, String estado) {
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.imagenurl = imagenurl;
		this.imagenid = imagenid;
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

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getImagenurl() {
		return imagenurl;
	}

	public void setImagenurl(String imagenurl) {
		this.imagenurl = imagenurl;
	}

	public String getImagenid() {
		return imagenid;
	}

	public void setImagenid(String imagenid) {
		this.imagenid = imagenid;
	}

	private static final long serialVersionUID = 1L;

}
