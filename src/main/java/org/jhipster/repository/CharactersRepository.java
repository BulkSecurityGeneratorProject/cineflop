package org.jhipster.repository;

import org.jhipster.domain.Characters;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Characters entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CharactersRepository extends JpaRepository<Characters, Long> {

}
