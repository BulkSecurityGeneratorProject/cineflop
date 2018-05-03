package org.jhipster.service.impl;

import org.jhipster.service.RolesService;
import org.jhipster.domain.Roles;
import org.jhipster.repository.RolesRepository;
import org.jhipster.service.dto.RolesDTO;
import org.jhipster.service.mapper.RolesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Roles.
 */
@Service
@Transactional
public class RolesServiceImpl implements RolesService {

    private final Logger log = LoggerFactory.getLogger(RolesServiceImpl.class);

    private final RolesRepository rolesRepository;

    private final RolesMapper rolesMapper;

    public RolesServiceImpl(RolesRepository rolesRepository, RolesMapper rolesMapper) {
        this.rolesRepository = rolesRepository;
        this.rolesMapper = rolesMapper;
    }

    /**
     * Save a roles.
     *
     * @param rolesDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RolesDTO save(RolesDTO rolesDTO) {
        log.debug("Request to save Roles : {}", rolesDTO);
        Roles roles = rolesMapper.toEntity(rolesDTO);
        roles = rolesRepository.save(roles);
        return rolesMapper.toDto(roles);
    }

    /**
     * Get all the roles.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<RolesDTO> findAll() {
        log.debug("Request to get all Roles");
        return rolesRepository.findAll().stream()
            .map(rolesMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one roles by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public RolesDTO findOne(Long id) {
        log.debug("Request to get Roles : {}", id);
        Roles roles = rolesRepository.findOne(id);
        return rolesMapper.toDto(roles);
    }

    /**
     * Delete the roles by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Roles : {}", id);
        rolesRepository.delete(id);
    }
}
