package org.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.service.CharactersService;
import org.jhipster.web.rest.errors.BadRequestAlertException;
import org.jhipster.web.rest.util.HeaderUtil;
import org.jhipster.service.dto.CharactersDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Characters.
 */
@RestController
@RequestMapping("/api")
public class CharactersResource {

    private final Logger log = LoggerFactory.getLogger(CharactersResource.class);

    private static final String ENTITY_NAME = "characters";

    private final CharactersService charactersService;

    public CharactersResource(CharactersService charactersService) {
        this.charactersService = charactersService;
    }

    /**
     * POST  /characters : Create a new characters.
     *
     * @param charactersDTO the charactersDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new charactersDTO, or with status 400 (Bad Request) if the characters has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/characters")
    @Timed
    public ResponseEntity<CharactersDTO> createCharacters(@RequestBody CharactersDTO charactersDTO) throws URISyntaxException {
        log.debug("REST request to save Characters : {}", charactersDTO);
        if (charactersDTO.getId() != null) {
            throw new BadRequestAlertException("A new characters cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CharactersDTO result = charactersService.save(charactersDTO);
        return ResponseEntity.created(new URI("/api/characters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /characters : Updates an existing characters.
     *
     * @param charactersDTO the charactersDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated charactersDTO,
     * or with status 400 (Bad Request) if the charactersDTO is not valid,
     * or with status 500 (Internal Server Error) if the charactersDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/characters")
    @Timed
    public ResponseEntity<CharactersDTO> updateCharacters(@RequestBody CharactersDTO charactersDTO) throws URISyntaxException {
        log.debug("REST request to update Characters : {}", charactersDTO);
        if (charactersDTO.getId() == null) {
            return createCharacters(charactersDTO);
        }
        CharactersDTO result = charactersService.save(charactersDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, charactersDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /characters : get all the characters.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of characters in body
     */
    @GetMapping("/characters")
    @Timed
    public List<CharactersDTO> getAllCharacters() {
        log.debug("REST request to get all Characters");
        return charactersService.findAll();
        }

    /**
     * GET  /characters/:id : get the "id" characters.
     *
     * @param id the id of the charactersDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the charactersDTO, or with status 404 (Not Found)
     */
    @GetMapping("/characters/{id}")
    @Timed
    public ResponseEntity<CharactersDTO> getCharacters(@PathVariable Long id) {
        log.debug("REST request to get Characters : {}", id);
        CharactersDTO charactersDTO = charactersService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(charactersDTO));
    }

    /**
     * DELETE  /characters/:id : delete the "id" characters.
     *
     * @param id the id of the charactersDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/characters/{id}")
    @Timed
    public ResponseEntity<Void> deleteCharacters(@PathVariable Long id) {
        log.debug("REST request to delete Characters : {}", id);
        charactersService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
