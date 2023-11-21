package com.aceruservicios.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aceruservicios.security.entity.Usuario;
import com.aceruservicios.security.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;
    
    @GetMapping("/insertCompetencia/{nombreusuario}/{competenciaId}")
    public void insertCompetencia(@PathVariable String nombreusuario,
    		@PathVariable Long competenciaId) {
    	Usuario usuarioencontrado = usuarioService.obtenerUsuarioporNombre(nombreusuario);
        usuarioService.insertCompetencia(usuarioencontrado.getId(), competenciaId);
    }
    
    @GetMapping("/insertProblema/{nombreusuario}/{problemaId}")
    public void insertProblema(@PathVariable String nombreusuario,
    		@PathVariable Long problemaId) {
    	Usuario usuarioencontrado = usuarioService.obtenerUsuarioporNombre(nombreusuario);
        usuarioService.insertProblema(usuarioencontrado.getId(), problemaId);
    }
    
    @GetMapping("/buscar/{nombreusuario}")
    public Usuario buscarUsuario(@PathVariable String nombreusuario) {
    	Usuario usuarioencontrado = usuarioService.obtenerUsuarioporNombre(nombreusuario);
        return usuarioencontrado;
    }
    
    @GetMapping("/list")
    public ResponseEntity<List<Usuario>> getAllMaterials() {
        List<Usuario> usuarios = usuarioService.listarUsuariosParticipantes();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }
    
    
    @GetMapping("/exists/{nombreusuario}/{problemaId}")
    public ResponseEntity<Boolean> existsByUsuarioIdAndProblemaId(
    		@PathVariable String nombreusuario,
    		@PathVariable Long problemaId) {
    	Usuario usuarioencontrado = usuarioService.obtenerUsuarioporNombre(nombreusuario);
        boolean exists = usuarioService.existsByUsuarioIdAndProblemaId(usuarioencontrado.getId(), problemaId);
        return ResponseEntity.ok(exists);
    }
    
    @GetMapping("/cambiarRango/{id}/{nuevoRango}")
    public ResponseEntity<Boolean> actualizarRangoUsuario(@PathVariable Long id, @PathVariable String nuevoRango) {
        usuarioService.actualizarRangoUsuario2(id, nuevoRango);
        return ResponseEntity.ok(true);
    }
    
    @PutMapping("/cambiar-contrasena")
    public ResponseEntity<?> cambiarContrasena(@RequestParam String nombreUsuario,
                                                    @RequestParam String contrasenaActual,
                                                    @RequestParam String nuevaContrasena) {
        usuarioService.cambiarContrasena(nombreUsuario, contrasenaActual, nuevaContrasena);
        return ResponseEntity.ok(true);
    }
}
