package com.aceruservicios.dto;

public class MaterialDTO {

	private Long id;
	private String nombre;
	private String descripcion;
	private String tipoMaterial;
	private String archivoBase64;
	private String url;

	public MaterialDTO() {
		super();
	}

	public MaterialDTO(Long id, String nombre, String descripcion, String tipoMaterial, String archivoBase64, String url) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.tipoMaterial = tipoMaterial;
		this.archivoBase64 = archivoBase64;
		this.url = url;
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

	public String getTipoMaterial() {
		return tipoMaterial;
	}

	public void setTipoMaterial(String tipoMaterial) {
		this.tipoMaterial = tipoMaterial;
	}

	public String getArchivoBase64() {
		return archivoBase64;
	}

	public void setArchivoBase64(String archivoBase64) {
		this.archivoBase64 = archivoBase64;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
	
	

}
