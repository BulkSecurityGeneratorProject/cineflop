package org.jhipster.service.impl;

import org.jhipster.service.KeywordsService;
import org.jhipster.domain.Keywords;
import org.jhipster.repository.KeywordsRepository;
import org.jhipster.service.dto.KeywordsDTO;
import org.jhipster.service.mapper.KeywordsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Keywords.
 */
@Service
@Transactional
public class KeywordsServiceImpl implements KeywordsService {

    private final Logger log = LoggerFactory.getLogger(KeywordsServiceImpl.class);

    private final KeywordsRepository keywordsRepository;

    private final KeywordsMapper keywordsMapper;

    public KeywordsServiceImpl(KeywordsRepository keywordsRepository, KeywordsMapper keywordsMapper) {
        this.keywordsRepository = keywordsRepository;
        this.keywordsMapper = keywordsMapper;
    }

    /**
     * Save a keywords.
     *
     * @param keywordsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public KeywordsDTO save(KeywordsDTO keywordsDTO) {
        log.debug("Request to save Keywords : {}", keywordsDTO);
        Keywords keywords = keywordsMapper.toEntity(keywordsDTO);
        keywords = keywordsRepository.save(keywords);
        return keywordsMapper.toDto(keywords);
    }

    /**
     * Get all the keywords.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<KeywordsDTO> findAll() {
        log.debug("Request to get all Keywords");
        return keywordsRepository.findAll().stream()
            .map(keywordsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one keywords by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public KeywordsDTO findOne(Long id) {
        log.debug("Request to get Keywords : {}", id);
        Keywords keywords = keywordsRepository.findOne(id);
        return keywordsMapper.toDto(keywords);
    }

    /**
     * Delete the keywords by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Keywords : {}", id);
        keywordsRepository.delete(id);
    }
}
