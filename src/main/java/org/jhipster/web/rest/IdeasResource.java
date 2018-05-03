package org.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.service.IdeasService;
import org.jhipster.web.rest.errors.BadRequestAlertException;
import org.jhipster.web.rest.util.HeaderUtil;
import org.jhipster.web.rest.util.PaginationUtil;
import org.jhipster.service.dto.IdeasDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Ideas.
 */
@RestController
@RequestMapping("/api")
public class IdeasResource {

    private final Logger log = LoggerFactory.getLogger(IdeasResource.class);

    private static final String ENTITY_NAME = "ideas";

    private final IdeasService ideasService;

    public IdeasResource(IdeasService ideasService) {
        this.ideasService = ideasService;
    }

    /**
     * POST  /ideas : Create a new ideas.
     *
     * @param ideasDTO the ideasDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ideasDTO, or with status 400 (Bad Request) if the ideas has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ideas")
    @Timed
    public ResponseEntity<IdeasDTO> createIdeas(@RequestBody IdeasDTO ideasDTO) throws URISyntaxException {
        log.debug("REST request to save Ideas : {}", ideasDTO);
        if (ideasDTO.getId() != null) {
            throw new BadRequestAlertException("A new ideas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IdeasDTO result = ideasService.save(ideasDTO);
        return ResponseEntity.created(new URI("/api/ideas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ideas : Updates an existing ideas.
     *
     * @param ideasDTO the ideasDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ideasDTO,
     * or with status 400 (Bad Request) if the ideasDTO is not valid,
     * or with status 500 (Internal Server Error) if the ideasDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ideas")
    @Timed
    public ResponseEntity<IdeasDTO> updateIdeas(@RequestBody IdeasDTO ideasDTO) throws URISyntaxException {
        log.debug("REST request to update Ideas : {}", ideasDTO);
        if (ideasDTO.getId() == null) {
            return createIdeas(ideasDTO);
        }
        IdeasDTO result = ideasService.save(ideasDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ideasDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ideas : get all the ideas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ideas in body
     */
    @GetMapping("/ideas")
    @Timed
    public ResponseEntity<List<IdeasDTO>> getAllIdeas(Pageable pageable) {
        log.debug("REST request to get a page of Ideas");
        Page<IdeasDTO> page = ideasService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/ideas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /ideas/:id : get the "id" ideas.
     *
     * @param id the id of the ideasDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ideasDTO, or with status 404 (Not Found)
     */
    @GetMapping("/ideas/{id}")
    @Timed
    public ResponseEntity<IdeasDTO> getIdeas(@PathVariable Long id) {
        log.debug("REST request to get Ideas : {}", id);
        IdeasDTO ideasDTO = ideasService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ideasDTO));
    }

    /**
     * DELETE  /ideas/:id : delete the "id" ideas.
     *
     * @param id the id of the ideasDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ideas/{id}")
    @Timed
    public ResponseEntity<Void> deleteIdeas(@PathVariable Long id) {
        log.debug("REST request to delete Ideas : {}", id);
        ideasService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
