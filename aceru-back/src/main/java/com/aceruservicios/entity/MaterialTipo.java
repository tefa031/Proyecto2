package com.aceruservicios.entity;


import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "material_tipo")

public class MaterialTipo implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length = 100)
	private String nombre;

	public MaterialTipo() {
		super();
	}

	public MaterialTipo(Long id, String nombre) {
		super();
		this.id = id;
		this.nombre = nombre;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
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
}
