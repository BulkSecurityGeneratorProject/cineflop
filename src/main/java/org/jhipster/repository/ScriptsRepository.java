package org.jhipster.repository;

import org.jhipster.domain.Scripts;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Scripts entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ScriptsRepository extends JpaRepository<Scripts, Long> {

}
