package org.jhipster.service;

import org.jhipster.service.dto.CharactersDTO;
import java.util.List;

/**
 * Service Interface for managing Characters.
 */
public interface CharactersService {

    /**
     * Save a characters.
     *
     * @param charactersDTO the entity to save
     * @return the persisted entity
     */
    CharactersDTO save(CharactersDTO charactersDTO);

    /**
     * Get all the characters.
     *
     * @return the list of entities
     */
    List<CharactersDTO> findAll();

    /**
     * Get the "id" characters.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CharactersDTO findOne(Long id);

    /**
     * Delete the "id" characters.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
