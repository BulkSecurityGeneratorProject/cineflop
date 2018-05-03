package org.jhipster.service.impl;

import org.jhipster.service.CharactersService;
import org.jhipster.domain.Characters;
import org.jhipster.repository.CharactersRepository;
import org.jhipster.service.dto.CharactersDTO;
import org.jhipster.service.mapper.CharactersMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Characters.
 */
@Service
@Transactional
public class CharactersServiceImpl implements CharactersService {

    private final Logger log = LoggerFactory.getLogger(CharactersServiceImpl.class);

    private final CharactersRepository charactersRepository;

    private final CharactersMapper charactersMapper;

    public CharactersServiceImpl(CharactersRepository charactersRepository, CharactersMapper charactersMapper) {
        this.charactersRepository = charactersRepository;
        this.charactersMapper = charactersMapper;
    }

    /**
     * Save a characters.
     *
     * @param charactersDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CharactersDTO save(CharactersDTO charactersDTO) {
        log.debug("Request to save Characters : {}", charactersDTO);
        Characters characters = charactersMapper.toEntity(charactersDTO);
        characters = charactersRepository.save(characters);
        return charactersMapper.toDto(characters);
    }

    /**
     * Get all the characters.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CharactersDTO> findAll() {
        log.debug("Request to get all Characters");
        return charactersRepository.findAll().stream()
            .map(charactersMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one characters by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CharactersDTO findOne(Long id) {
        log.debug("Request to get Characters : {}", id);
        Characters characters = charactersRepository.findOne(id);
        return charactersMapper.toDto(characters);
    }

    /**
     * Delete the characters by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Characters : {}", id);
        charactersRepository.delete(id);
    }
}
