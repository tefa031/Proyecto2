package com.aceruservicios.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.aceruservicios.security.entity.Usuario;

import java.util.Optional;




public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    Optional<Usuario> findByNombreUsuario(String nombreUsuario);
    boolean existsByNombreUsuario(String nombreUsuario);
    boolean existsByEmail(String email);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO usuario_competencia (usuario_id, competencia_id) VALUES (?1, ?2)", nativeQuery = true)
    void insertUsuarioCompetencia(Long usuarioId, Long competenciaId);
    
    
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO usuario_problema (usuario_id, problema_id) VALUES (?1, ?2)", nativeQuery = true)
    void insertUsuarioProblema(Long usuarioId, Long problema_id);
    
    @Query(value="SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END FROM usuario_problema WHERE usuario_id = ?1 AND problema_id = ?2", nativeQuery = true)
    int existeUsuarioProblema(Long usuarioId, Long problemaId);

    
    @Query(value = "SELECT ur.rol_id FROM usuario_rol ur WHERE ur.usuario_id = :usuarioId and ur.rol_id = 2", nativeQuery = true)
    Long buscarUsuarioRolUser(@Param("usuarioId") Long usuarioId);
    
    @Modifying
    @Query("UPDATE Usuario u SET u.rango = :nuevoRango WHERE u.id = :id")
    void actualizarRangoById(@Param("id") Long id, @Param("nuevoRango") String nuevoRango);
    
}
