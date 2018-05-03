package org.jhipster.repository;

import org.jhipster.domain.Ideas;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Ideas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IdeasRepository extends JpaRepository<Ideas, Long> {

}
