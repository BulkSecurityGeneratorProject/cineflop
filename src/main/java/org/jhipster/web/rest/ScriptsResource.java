package org.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.service.ScriptsService;
import org.jhipster.web.rest.errors.BadRequestAlertException;
import org.jhipster.web.rest.util.HeaderUtil;
import org.jhipster.web.rest.util.PaginationUtil;
import org.jhipster.service.dto.ScriptsDTO;
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
 * REST controller for managing Scripts.
 */
@RestController
@RequestMapping("/api")
public class ScriptsResource {

    private final Logger log = LoggerFactory.getLogger(ScriptsResource.class);

    private static final String ENTITY_NAME = "scripts";

    private final ScriptsService scriptsService;

    public ScriptsResource(ScriptsService scriptsService) {
        this.scriptsService = scriptsService;
    }

    /**
     * POST  /scripts : Create a new scripts.
     *
     * @param scriptsDTO the scriptsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new scriptsDTO, or with status 400 (Bad Request) if the scripts has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/scripts")
    @Timed
    public ResponseEntity<ScriptsDTO> createScripts(@RequestBody ScriptsDTO scriptsDTO) throws URISyntaxException {
        log.debug("REST request to save Scripts : {}", scriptsDTO);
        if (scriptsDTO.getId() != null) {
            throw new BadRequestAlertException("A new scripts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ScriptsDTO result = scriptsService.save(scriptsDTO);
        return ResponseEntity.created(new URI("/api/scripts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /scripts : Updates an existing scripts.
     *
     * @param scriptsDTO the scriptsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated scriptsDTO,
     * or with status 400 (Bad Request) if the scriptsDTO is not valid,
     * or with status 500 (Internal Server Error) if the scriptsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/scripts")
    @Timed
    public ResponseEntity<ScriptsDTO> updateScripts(@RequestBody ScriptsDTO scriptsDTO) throws URISyntaxException {
        log.debug("REST request to update Scripts : {}", scriptsDTO);
        if (scriptsDTO.getId() == null) {
            return createScripts(scriptsDTO);
        }
        ScriptsDTO result = scriptsService.save(scriptsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, scriptsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /scripts : get all the scripts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of scripts in body
     */
    @GetMapping("/scripts")
    @Timed
    public ResponseEntity<List<ScriptsDTO>> getAllScripts(Pageable pageable) {
        log.debug("REST request to get a page of Scripts");
        Page<ScriptsDTO> page = scriptsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/scripts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /scripts/:id : get the "id" scripts.
     *
     * @param id the id of the scriptsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the scriptsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/scripts/{id}")
    @Timed
    public ResponseEntity<ScriptsDTO> getScripts(@PathVariable Long id) {
        log.debug("REST request to get Scripts : {}", id);
        ScriptsDTO scriptsDTO = scriptsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(scriptsDTO));
    }

    /**
     * DELETE  /scripts/:id : delete the "id" scripts.
     *
     * @param id the id of the scriptsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/scripts/{id}")
    @Timed
    public ResponseEntity<Void> deleteScripts(@PathVariable Long id) {
        log.debug("REST request to delete Scripts : {}", id);
        scriptsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
