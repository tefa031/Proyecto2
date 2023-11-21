package com.aceruservicios.repository;

import com.aceruservicios.entity.Ranking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RankingRepo extends JpaRepository<Ranking, Integer> {

}
