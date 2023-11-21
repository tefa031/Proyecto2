package com.aceruservicios.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.aceruservicios.dto.Mensaje;
import com.aceruservicios.entity.Categoria;
import com.aceruservicios.security.dto.JwtDto;
import com.aceruservicios.security.dto.LoginUsuario;
import com.aceruservicios.security.dto.NuevoUsuario;
import com.aceruservicios.security.entity.Rol;
import com.aceruservicios.security.entity.Usuario;
import com.aceruservicios.security.enums.RolNombre;
import com.aceruservicios.security.jwt.JwtProvider;
import com.aceruservicios.security.service.RolService;
import com.aceruservicios.security.service.UsuarioService;

import javax.validation.Valid;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    RolService rolService;

    @Autowired
    JwtProvider jwtProvider;

    //@PostMapping("/nuevo")
    @PostMapping(value="/nuevo", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE, "multipart/form-data;charset=UTF-8" })
    public ResponseEntity<?> nuevo(@RequestPart("nuevoUsuario") NuevoUsuario nuevoUsuario,
    							   @RequestPart(name = "foto") MultipartFile foto) throws IOException{
        
    	/*if(bindingResult.hasErrors())
            return new ResponseEntity<>(new Mensaje("campos mal puestos o email inválido"), HttpStatus.BAD_REQUEST);
        if(usuarioService.existsByNombreUsuario(nuevoUsuario.getNombreUsuario()))
            return new ResponseEntity<>(new Mensaje("Nick ya existe"), HttpStatus.BAD_REQUEST);
        if(usuarioService.existsByEmail(nuevoUsuario.getEmail()))
            return new ResponseEntity<>(new Mensaje("Email ya existe"), HttpStatus.BAD_REQUEST);*/
        
        Usuario usuario =
                new Usuario(nuevoUsuario.getNombre(), nuevoUsuario.getNombreUsuario(), nuevoUsuario.getEmail(),
                        passwordEncoder.encode(nuevoUsuario.getPassword()));
        
        System.out.println("ARCHIVO :" + foto);
        if (foto != null && !foto.isEmpty()) {
            System.out.println("ARCHIVO OK");
            byte[] fotoBytes = foto.getBytes();
            usuario.setFoto(fotoBytes);
        }else {
        	System.out.println("ARCHIVO MAL");
        }

        
        Set<Rol> roles = new HashSet<>();
        if(nuevoUsuario.getRoles().contains("admin"))
            roles.add(rolService.getByRolNombre(RolNombre.ROLE_ADMIN).orElse(null));
        else{
        	usuario.setRango("BRONCE");
            roles.add(rolService.getByRolNombre(RolNombre.ROLE_USER).orElse(null));
        }
        
        usuario.setRoles(roles);
        usuarioService.save(usuario);
        
        return new ResponseEntity<>(new Mensaje("usuario guardado"), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginUsuario loginUsuario, BindingResult bindingResult){
        if(bindingResult.hasErrors())
            return new ResponseEntity<>(new Mensaje("campos mal puestos"), HttpStatus.BAD_REQUEST);
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUsuario.getNombreUsuario(), loginUsuario.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(), userDetails.getAuthorities());
        return new ResponseEntity<>(jwtDto, HttpStatus.OK);
    }


    @GetMapping("/existEmail/{email}")
    public boolean validExistenceEmail(@PathVariable("email") String email){
        return usuarioService.existsByEmail(email);
    }
    
    
    @PutMapping("/actualizar")
    public ResponseEntity<?> actualizarPerfil(@RequestBody Usuario nuevoUsuario) {
    	
    	System.out.println("USUARIOO_"+ nuevoUsuario);
        usuarioService.actualizarPerfil(nuevoUsuario);
        return ResponseEntity.ok(true);
    }
}
