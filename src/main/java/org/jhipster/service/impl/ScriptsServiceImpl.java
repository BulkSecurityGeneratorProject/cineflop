package org.jhipster.service.impl;

import org.jhipster.service.ScriptsService;
import org.jhipster.domain.Scripts;
import org.jhipster.repository.ScriptsRepository;
import org.jhipster.service.dto.ScriptsDTO;
import org.jhipster.service.mapper.ScriptsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Scripts.
 */
@Service
@Transactional
public class ScriptsServiceImpl implements ScriptsService {

    private final Logger log = LoggerFactory.getLogger(ScriptsServiceImpl.class);

    private final ScriptsRepository scriptsRepository;

    private final ScriptsMapper scriptsMapper;

    public ScriptsServiceImpl(ScriptsRepository scriptsRepository, ScriptsMapper scriptsMapper) {
        this.scriptsRepository = scriptsRepository;
        this.scriptsMapper = scriptsMapper;
    }

    /**
     * Save a scripts.
     *
     * @param scriptsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ScriptsDTO save(ScriptsDTO scriptsDTO) {
        log.debug("Request to save Scripts : {}", scriptsDTO);
        Scripts scripts = scriptsMapper.toEntity(scriptsDTO);
        scripts = scriptsRepository.save(scripts);
        return scriptsMapper.toDto(scripts);
    }

    /**
     * Get all the scripts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ScriptsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Scripts");
        return scriptsRepository.findAll(pageable)
            .map(scriptsMapper::toDto);
    }

    /**
     * Get one scripts by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ScriptsDTO findOne(Long id) {
        log.debug("Request to get Scripts : {}", id);
        Scripts scripts = scriptsRepository.findOne(id);
        return scriptsMapper.toDto(scripts);
    }

    /**
     * Delete the scripts by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Scripts : {}", id);
        scriptsRepository.delete(id);
    }
}
