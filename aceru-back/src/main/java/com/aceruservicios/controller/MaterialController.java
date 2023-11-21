package com.aceruservicios.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.aceruservicios.dto.MaterialDTO;
import com.aceruservicios.entity.Material;
import com.aceruservicios.service.IMaterialService;


@RestController
@RequestMapping("/material")
@CrossOrigin(origins = "*")
public class MaterialController {
	
	
	@Autowired
	private IMaterialService materialService;
	
    @GetMapping("/list")
    public ResponseEntity<List<Material>> getAllMaterials() {
        List<Material> materials = materialService.getAllMaterialsDesc();
        return new ResponseEntity<>(materials, HttpStatus.OK);
    }

   
    @PostMapping // consumes = { MediaType.MULTIPART_FORM_DATA_VALUE, "multipart/form-data;charset=UTF-8" }
    public ResponseEntity<Material> createMaterial(
    		@RequestBody Material material) {
    	
   
        /*if (archivo == null || archivo.isEmpty()) {
            System.out.println("ARCHIVO NULO O VACÍO");

        } else {
            System.out.println("ARCHIVO OK");
            byte[] archivoBytes = archivo.getBytes();
            material.setArchivo(archivoBytes);
        }*/
        
        if(material.getId() != null) {
        	System.out.println("ACTUALIZARRRR");
        	materialService.actualizarMaterial(material);
        }
        else {
        	System.out.println("NUEVOOO");
            /*byte[] archivoBytes = archivo.getBytes();
            material.setArchivo(archivoBytes);*/
        	materialService.saveMaterial(material);
        }

   
        return new ResponseEntity<>(material, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaterialDTO> metodobusqueda(@PathVariable Long id) {
        Material material = materialService.getMaterialPorId(id);

        if (material != null) {
            MaterialDTO materialDTO = new MaterialDTO();
            materialDTO.setId(material.getId());
            materialDTO.setNombre(material.getNombre());
            materialDTO.setDescripcion(material.getDescripcion());
            materialDTO.setTipoMaterial(material.getTipoMaterial().toString());
            materialDTO.setUrl(material.getUrl());

            /*if (material.getArchivo() != null) {
                byte[] archivoBytes = material.getArchivo();
                String base64Archivo = Base64Utils.encodeToString(archivoBytes);
                materialDTO.setArchivoBase64(base64Archivo);
            }*/

            return new ResponseEntity<>(materialDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/porcategory/{categoryId}")
    public ResponseEntity<List<Material>> getMaterialsByCategory(@PathVariable Long categoryId) {
        List<Material> material = materialService.getMaterialsByCategory(categoryId);
        return new ResponseEntity<>(material, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarMaterial(@PathVariable Long id) {
        materialService.deleteMaterial(id);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
    
    
}
