package com.aceruservicios.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.aceruservicios.enums.TipoMaterial;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;

@Entity
@Table(name = "material")
public class Material implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nombre;

	@Column(columnDefinition = "TEXT")
	private String descripcion;
	
	@Column(columnDefinition = "TEXT")
	private String url;

    @OneToOne(fetch = FetchType.EAGER) 
    @JoinColumn(name = "materialcategoria_id")
    @JsonIgnore
    private MaterialCategoria materialCategoria;

	@NotNull
	@Enumerated(EnumType.STRING)
	private TipoMaterial tipoMaterial;


    @Lob
    @Column(columnDefinition = "LONGBLOB")
	private byte[] archivo;

	public Material() {
		super();
	}

	public Material(Long id, String nombre, String descripcion, MaterialCategoria materialCategoria,
			@NotNull TipoMaterial tipoMaterial, byte[] archivo, String url) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.materialCategoria = materialCategoria;
		this.tipoMaterial = tipoMaterial;
		this.archivo = archivo;
		this.url = url;
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

	public MaterialCategoria getMaterial() {
		return materialCategoria;
	}

	public void setMaterial(MaterialCategoria materialCategoria) {
		this.materialCategoria = materialCategoria;
	}

	public TipoMaterial getTipoMaterial() {
		return tipoMaterial;
	}

	public void setTipoMaterial(TipoMaterial tipoMaterial) {
		this.tipoMaterial = tipoMaterial;
	}

	public byte[] getArchivo() {
		return archivo;
	}

	public void setArchivo(byte[] archivo) {
		this.archivo = archivo;
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

	public MaterialCategoria getMaterialCategoria() {
		return materialCategoria;
	}

	public void setMaterialCategoria(MaterialCategoria materialCategoria) {
		this.materialCategoria = materialCategoria;
	}
	
	

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Material [id=");
		builder.append(id);
		builder.append(", materialCategoria=");
		builder.append(materialCategoria);
		builder.append(", tipoMaterial=");
		builder.append(tipoMaterial);
		builder.append(", archivo=");
		builder.append(archivo);
		builder.append("]");
		return builder.toString();
	}
}

