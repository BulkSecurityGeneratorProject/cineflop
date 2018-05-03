package org.jhipster.service;

import org.jhipster.service.dto.KeywordsDTO;
import java.util.List;

/**
 * Service Interface for managing Keywords.
 */
public interface KeywordsService {

    /**
     * Save a keywords.
     *
     * @param keywordsDTO the entity to save
     * @return the persisted entity
     */
    KeywordsDTO save(KeywordsDTO keywordsDTO);

    /**
     * Get all the keywords.
     *
     * @return the list of entities
     */
    List<KeywordsDTO> findAll();

    /**
     * Get the "id" keywords.
     *
     * @param id the id of the entity
     * @return the entity
     */
    KeywordsDTO findOne(Long id);

    /**
     * Delete the "id" keywords.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
