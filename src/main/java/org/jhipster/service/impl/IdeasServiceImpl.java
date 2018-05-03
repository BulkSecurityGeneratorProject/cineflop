package org.jhipster.service.impl;

import org.jhipster.service.IdeasService;
import org.jhipster.domain.Ideas;
import org.jhipster.repository.IdeasRepository;
import org.jhipster.service.dto.IdeasDTO;
import org.jhipster.service.mapper.IdeasMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Ideas.
 */
@Service
@Transactional
public class IdeasServiceImpl implements IdeasService {

    private final Logger log = LoggerFactory.getLogger(IdeasServiceImpl.class);

    private final IdeasRepository ideasRepository;

    private final IdeasMapper ideasMapper;

    public IdeasServiceImpl(IdeasRepository ideasRepository, IdeasMapper ideasMapper) {
        this.ideasRepository = ideasRepository;
        this.ideasMapper = ideasMapper;
    }

    /**
     * Save a ideas.
     *
     * @param ideasDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public IdeasDTO save(IdeasDTO ideasDTO) {
        log.debug("Request to save Ideas : {}", ideasDTO);
        Ideas ideas = ideasMapper.toEntity(ideasDTO);
        ideas = ideasRepository.save(ideas);
        return ideasMapper.toDto(ideas);
    }

    /**
     * Get all the ideas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<IdeasDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Ideas");
        return ideasRepository.findAll(pageable)
            .map(ideasMapper::toDto);
    }

    /**
     * Get one ideas by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public IdeasDTO findOne(Long id) {
        log.debug("Request to get Ideas : {}", id);
        Ideas ideas = ideasRepository.findOne(id);
        return ideasMapper.toDto(ideas);
    }

    /**
     * Delete the ideas by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Ideas : {}", id);
        ideasRepository.delete(id);
    }
}
