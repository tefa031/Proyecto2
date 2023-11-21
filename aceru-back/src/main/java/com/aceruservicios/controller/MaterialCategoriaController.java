package com.aceruservicios.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.aceruservicios.dto.Mensaje;
import com.aceruservicios.entity.MaterialCategoria;
import com.aceruservicios.service.IMaterialCategoriaService;
import com.aceruservicios.service.imple.CloudinaryServiceImpl;

import java.awt.image.BufferedImage;

@RestController
@RequestMapping("/materialcategoria")
@CrossOrigin(origins = "*")
public class MaterialCategoriaController {
    
    @Autowired
    IMaterialCategoriaService materialcatService;

    @Autowired
    CloudinaryServiceImpl cloudService;

    @GetMapping("/lista/{estado}")
    public ResponseEntity<List<MaterialCategoria>> list(@PathVariable("estado") String estado){
        List<MaterialCategoria> lista = materialcatService.obtenerMaterialCatPorEstado(estado);
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @PostMapping(value="/nuevo", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE, "multipart/form-data;charset=UTF-8" })
    public ResponseEntity<?> nuevaMaterialCategoria(@RequestPart("materialcategoria") MaterialCategoria materialCategoria,
    		@RequestPart(name = "imagen", required = false) MultipartFile multipartFile)
            throws IOException {

        if (multipartFile == null || multipartFile.isEmpty()) {
            System.out.println("ARCHIVO NULO O VACÍO");
        }else {
            	
            BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
            if(bi == null){
                return new ResponseEntity<>(new Mensaje("imagen no válida"), HttpStatus.BAD_REQUEST);
            }

            Map result = cloudService.upload(multipartFile);

            materialCategoria.setImagenid((String) result.get("public_id"));
            materialCategoria.setImagenurl((String) result.get("url"));
        }
    	
        if(materialCategoria.getId() != null){
            materialcatService.actualizar(materialCategoria);
        }else{
            materialcatService.guardarMaterialcat(materialCategoria);
        }
        return new ResponseEntity<>(new Mensaje("imagen subida"), HttpStatus.OK);
    }


    @GetMapping("/cambiarEstado/{categoriaId}/{estado}")
    public void cambiarEstadoMaterialCategoria(
            @PathVariable Long categoriaId,
            @PathVariable String estado
    ) {
        materialcatService.cambiarEstadoMaterialCat(categoriaId, estado);
    }

}
