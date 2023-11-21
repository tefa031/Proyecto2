package com.aceruservicios.controller;


import com.aceruservicios.dto.Mensaje;
import com.aceruservicios.entity.Categoria;
import com.aceruservicios.service.ICategoriaService;
import com.aceruservicios.service.imple.CloudinaryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/categoria")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    ICategoriaService categoriService;

    @Autowired
    CloudinaryServiceImpl cloudService;

    @GetMapping("/lista/{estado}")
    public ResponseEntity<List<Categoria>> list(@PathVariable("estado") String estado){
        List<Categoria> lista = categoriService.obtenerCategoriasPorEstado(estado);
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @PostMapping(value="/nuevo", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE, "multipart/form-data;charset=UTF-8" })
    public ResponseEntity<?> nuevaCategoria(@RequestPart("categoria") Categoria categoria,
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

            categoria.setImagenid((String) result.get("public_id"));
            categoria.setImagenurl((String) result.get("url"));
        }


        if(categoria.getId() != null){
            categoriService.actualizar(categoria);
        }else{
            //categoria.setEstado("Activo");
            categoriService.guardarCategoria(categoria);
        }
        return new ResponseEntity<>(new Mensaje("imagen subida"), HttpStatus.OK);
    }

    @GetMapping("/cambiarEstado/{categoriaId}/{estado}")
    public void cambiarEstadoCategoria(
            @PathVariable Long categoriaId,
            @PathVariable String estado
    ) {
        categoriService.cambiarEstadoCategoria(categoriaId, estado);
    }


}
