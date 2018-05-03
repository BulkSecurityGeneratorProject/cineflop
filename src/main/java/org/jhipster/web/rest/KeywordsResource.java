package org.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.service.KeywordsService;
import org.jhipster.web.rest.errors.BadRequestAlertException;
import org.jhipster.web.rest.util.HeaderUtil;
import org.jhipster.service.dto.KeywordsDTO;
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
 * REST controller for managing Keywords.
 */
@RestController
@RequestMapping("/api")
public class KeywordsResource {

    private final Logger log = LoggerFactory.getLogger(KeywordsResource.class);

    private static final String ENTITY_NAME = "keywords";

    private final KeywordsService keywordsService;

    public KeywordsResource(KeywordsService keywordsService) {
        this.keywordsService = keywordsService;
    }

    /**
     * POST  /keywords : Create a new keywords.
     *
     * @param keywordsDTO the keywordsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new keywordsDTO, or with status 400 (Bad Request) if the keywords has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/keywords")
    @Timed
    public ResponseEntity<KeywordsDTO> createKeywords(@RequestBody KeywordsDTO keywordsDTO) throws URISyntaxException {
        log.debug("REST request to save Keywords : {}", keywordsDTO);
        if (keywordsDTO.getId() != null) {
            throw new BadRequestAlertException("A new keywords cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KeywordsDTO result = keywordsService.save(keywordsDTO);
        return ResponseEntity.created(new URI("/api/keywords/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /keywords : Updates an existing keywords.
     *
     * @param keywordsDTO the keywordsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated keywordsDTO,
     * or with status 400 (Bad Request) if the keywordsDTO is not valid,
     * or with status 500 (Internal Server Error) if the keywordsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/keywords")
    @Timed
    public ResponseEntity<KeywordsDTO> updateKeywords(@RequestBody KeywordsDTO keywordsDTO) throws URISyntaxException {
        log.debug("REST request to update Keywords : {}", keywordsDTO);
        if (keywordsDTO.getId() == null) {
            return createKeywords(keywordsDTO);
        }
        KeywordsDTO result = keywordsService.save(keywordsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, keywordsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /keywords : get all the keywords.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of keywords in body
     */
    @GetMapping("/keywords")
    @Timed
    public List<KeywordsDTO> getAllKeywords() {
        log.debug("REST request to get all Keywords");
        return keywordsService.findAll();
        }

    /**
     * GET  /keywords/:id : get the "id" keywords.
     *
     * @param id the id of the keywordsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the keywordsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/keywords/{id}")
    @Timed
    public ResponseEntity<KeywordsDTO> getKeywords(@PathVariable Long id) {
        log.debug("REST request to get Keywords : {}", id);
        KeywordsDTO keywordsDTO = keywordsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(keywordsDTO));
    }

    /**
     * DELETE  /keywords/:id : delete the "id" keywords.
     *
     * @param id the id of the keywordsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/keywords/{id}")
    @Timed
    public ResponseEntity<Void> deleteKeywords(@PathVariable Long id) {
        log.debug("REST request to delete Keywords : {}", id);
        keywordsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
