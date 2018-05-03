package org.jhipster.service;

import org.jhipster.service.dto.RolesDTO;
import java.util.List;

/**
 * Service Interface for managing Roles.
 */
public interface RolesService {

    /**
     * Save a roles.
     *
     * @param rolesDTO the entity to save
     * @return the persisted entity
     */
    RolesDTO save(RolesDTO rolesDTO);

    /**
     * Get all the roles.
     *
     * @return the list of entities
     */
    List<RolesDTO> findAll();

    /**
     * Get the "id" roles.
     *
     * @param id the id of the entity
     * @return the entity
     */
    RolesDTO findOne(Long id);

    /**
     * Delete the "id" roles.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
