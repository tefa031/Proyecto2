package com.aceruservicios.entity;


import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "problema")

public class Problema implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "categoria_id")
	private Categoria categoria;

	@Column(nullable = false, length = 200)
	private String nombre;
	
	@Column(columnDefinition = "TEXT")
	private String descripcion;

	@Column(columnDefinition = "TEXT")
	private String entradas;
	
	@Column(columnDefinition = "TEXT")
	private String salidas;
	
	@Column(name = "ejemplo_entradas", columnDefinition = "TEXT")
	private String ejemploEntradas;
	
	@Column(name = "ejemplo_salidas", columnDefinition = "TEXT")
	private String ejemploSalidas;
	
	@Column(length = 20)
	private String dificultad;
	
	@Column(length = 50, columnDefinition = "VARCHAR(50) DEFAULT 'Activo'")
	private String estado;

	public Problema() {
		super();
	}

	public Problema(Long id, Categoria categoria, String nombre, String descripcion, String entradas, String salidas,
			String ejemploEntradas, String ejemploSalidas, String dificultad, String estado) {
		super();
		this.id = id;
		this.categoria = categoria;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.entradas = entradas;
		this.salidas = salidas;
		this.ejemploEntradas = ejemploEntradas;
		this.ejemploSalidas = ejemploSalidas;
		this.dificultad = dificultad;
		this.estado = estado;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
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

	public String getEntradas() {
		return entradas;
	}

	public void setEntradas(String entradas) {
		this.entradas = entradas;
	}

	public String getSalidas() {
		return salidas;
	}

	public void setSalidas(String salidas) {
		this.salidas = salidas;
	}

	public String getEjemploEntradas() {
		return ejemploEntradas;
	}

	public void setEjemploEntradas(String ejemploEntradas) {
		this.ejemploEntradas = ejemploEntradas;
	}

	public String getEjemploSalidas() {
		return ejemploSalidas;
	}

	public void setEjemploSalidas(String ejemploSalidas) {
		this.ejemploSalidas = ejemploSalidas;
	}

	public String getDificultad() {
		return dificultad;
	}

	public void setDificultad(String dificultad) {
		this.dificultad = dificultad;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Problema [id=");
		builder.append(id);
		builder.append(", categoria=");
		builder.append(categoria);
		builder.append(", nombre=");
		builder.append(nombre);
		builder.append(", descripcion=");
		builder.append(descripcion);
		builder.append(", entradas=");
		builder.append(entradas);
		builder.append(", salidas=");
		builder.append(salidas);
		builder.append(", ejemploEntradas=");
		builder.append(ejemploEntradas);
		builder.append(", ejemploSalidas=");
		builder.append(ejemploSalidas);
		builder.append(", dificultad=");
		builder.append(dificultad);
		builder.append(", estado=");
		builder.append(estado);
		builder.append("]");
		return builder.toString();
	}
}
