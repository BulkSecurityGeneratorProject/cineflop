package org.jhipster.service;

import org.jhipster.service.dto.ScriptsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Scripts.
 */
public interface ScriptsService {

    /**
     * Save a scripts.
     *
     * @param scriptsDTO the entity to save
     * @return the persisted entity
     */
    ScriptsDTO save(ScriptsDTO scriptsDTO);

    /**
     * Get all the scripts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ScriptsDTO> findAll(Pageable pageable);

    /**
     * Get the "id" scripts.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ScriptsDTO findOne(Long id);

    /**
     * Delete the "id" scripts.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
