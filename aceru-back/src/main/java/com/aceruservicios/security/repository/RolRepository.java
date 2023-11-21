package com.aceruservicios.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.aceruservicios.security.entity.Rol;
import com.aceruservicios.security.enums.RolNombre;

import java.util.Optional;


public interface RolRepository extends JpaRepository<Rol, Integer> {
    Optional<Rol> findByRolNombre(RolNombre rolNombre);
}
