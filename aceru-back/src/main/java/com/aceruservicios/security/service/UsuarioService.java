package com.aceruservicios.security.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Comparator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aceruservicios.security.entity.Usuario;
import com.aceruservicios.security.repository.UsuarioRepository;


@Service
@Transactional
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;
    
    @Autowired
    PasswordEncoder passwordEncoder;

    public Usuario obtenerUsuarioporNombre(String nombreUsuario){
        return usuarioRepository.findByNombreUsuario(nombreUsuario).orElse(null);
    }

    public boolean existsByNombreUsuario(String nombreUsuario){
        return usuarioRepository.existsByNombreUsuario(nombreUsuario);
    }

    public boolean existsByEmail(String email){
        return usuarioRepository.existsByEmail(email);
    }

    public void save(Usuario usuario){
        usuarioRepository.save(usuario);
    }

    public void insertCompetencia(Long usuarioId, Long competenciaId) {
        usuarioRepository.insertUsuarioCompetencia(usuarioId, competenciaId);
    }
    
    public void insertProblema(Long usuarioId, Long problemaId) {
        usuarioRepository.insertUsuarioProblema(usuarioId, problemaId);
    }
    
    public boolean existsByUsuarioIdAndProblemaId(Long usuarioId, Long problemaId) {
    	boolean resultado = (usuarioRepository.existeUsuarioProblema(usuarioId, problemaId) == 1);
        return resultado ;
    }
    
    public List<Usuario> obtenerTodosUsuarios() {
        return usuarioRepository.findAll();
    }
    
    public List<Usuario> listarUsuariosParticipantes() {
        List<Usuario> listaUsuarioGeneral = usuarioRepository.findAll();

        List<Usuario> listaUsuarioFiltrada = listaUsuarioGeneral.stream()
                .filter(usuario -> verificarrolUser(usuario) != null)
                .collect(Collectors.toList());

        return listaUsuarioFiltrada.stream()
        		.sorted(Comparator.comparing(Usuario::getRango, (rango1, rango2) -> {
        		    
        		    List<String> ordenRangos = new ArrayList<>();
        		    ordenRangos.add("PLATINO");
        		    ordenRangos.add("DIAMANTE");
        		    ordenRangos.add("ORO");
        		    ordenRangos.add("PLATA");
        		    ordenRangos.add("BRONCE");

        		    int index1 = ordenRangos.indexOf(rango1);
        		    int index2 = ordenRangos.indexOf(rango2);

        		    return Integer.compare(index2, index1);
                }).reversed())
                .collect(Collectors.toList());
  
    }
    
    public Usuario verificarrolUser(Usuario usuario) {
    	
    	Long idUsuario = usuarioRepository.buscarUsuarioRolUser(usuario.getId());
    	if( idUsuario != null) {
    		return usuario;
    	}
    	return null;
    	
    }

    public Usuario actualizarRangoUsuario(Long usuarioId, String nuevoRango) {
    	
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(usuarioId);

        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            usuario.setRango(nuevoRango);
            return usuarioRepository.save(usuario);
        } else {
        	return null;
        }
    }
    
    public void actualizarRangoUsuario2(Long idUsuario, String nuevoRango) {
        usuarioRepository.actualizarRangoById(idUsuario, nuevoRango);
    }
    
    public void actualizarPerfil(Usuario usuario) {
    	
    	Usuario usuariobase = usuarioRepository.findById(usuario.getId()).orElse(null);
    	if(usuariobase != null) {
    		
    		usuariobase.setNombre(usuario.getNombre());
    		usuariobase.setNombreUsuario(usuario.getNombreUsuario());
    		usuariobase.setEmail(usuario.getEmail());
    		usuarioRepository.save(usuariobase);
    	}
    }
    
    // cambiar contraseña
    public void cambiarContrasena(String nombreUsuario, String contrasenaActual, String nuevaContrasena) {
    	
        Usuario usuario = usuarioRepository.findByNombreUsuario(nombreUsuario).orElse(null);
        if (usuario != null && passwordEncoder.matches(contrasenaActual, usuario.getPassword())) {
            usuario.setPassword(passwordEncoder.encode(nuevaContrasena));
            usuarioRepository.save(usuario);
        } else {
            throw new RuntimeException("La contraseña actual es incorrecta.");
        }
    }
}
