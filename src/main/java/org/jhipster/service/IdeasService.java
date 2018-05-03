package org.jhipster.service;

import org.jhipster.service.dto.IdeasDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Ideas.
 */
public interface IdeasService {

    /**
     * Save a ideas.
     *
     * @param ideasDTO the entity to save
     * @return the persisted entity
     */
    IdeasDTO save(IdeasDTO ideasDTO);

    /**
     * Get all the ideas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<IdeasDTO> findAll(Pageable pageable);

    /**
     * Get the "id" ideas.
     *
     * @param id the id of the entity
     * @return the entity
     */
    IdeasDTO findOne(Long id);

    /**
     * Delete the "id" ideas.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
