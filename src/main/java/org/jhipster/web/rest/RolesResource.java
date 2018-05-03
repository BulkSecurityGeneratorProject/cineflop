package org.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.service.RolesService;
import org.jhipster.web.rest.errors.BadRequestAlertException;
import org.jhipster.web.rest.util.HeaderUtil;
import org.jhipster.service.dto.RolesDTO;
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
 * REST controller for managing Roles.
 */
@RestController
@RequestMapping("/api")
public class RolesResource {

    private final Logger log = LoggerFactory.getLogger(RolesResource.class);

    private static final String ENTITY_NAME = "roles";

    private final RolesService rolesService;

    public RolesResource(RolesService rolesService) {
        this.rolesService = rolesService;
    }

    /**
     * POST  /roles : Create a new roles.
     *
     * @param rolesDTO the rolesDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rolesDTO, or with status 400 (Bad Request) if the roles has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/roles")
    @Timed
    public ResponseEntity<RolesDTO> createRoles(@RequestBody RolesDTO rolesDTO) throws URISyntaxException {
        log.debug("REST request to save Roles : {}", rolesDTO);
        if (rolesDTO.getId() != null) {
            throw new BadRequestAlertException("A new roles cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RolesDTO result = rolesService.save(rolesDTO);
        return ResponseEntity.created(new URI("/api/roles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /roles : Updates an existing roles.
     *
     * @param rolesDTO the rolesDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rolesDTO,
     * or with status 400 (Bad Request) if the rolesDTO is not valid,
     * or with status 500 (Internal Server Error) if the rolesDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/roles")
    @Timed
    public ResponseEntity<RolesDTO> updateRoles(@RequestBody RolesDTO rolesDTO) throws URISyntaxException {
        log.debug("REST request to update Roles : {}", rolesDTO);
        if (rolesDTO.getId() == null) {
            return createRoles(rolesDTO);
        }
        RolesDTO result = rolesService.save(rolesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rolesDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /roles : get all the roles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of roles in body
     */
    @GetMapping("/roles")
    @Timed
    public List<RolesDTO> getAllRoles() {
        log.debug("REST request to get all Roles");
        return rolesService.findAll();
        }

    /**
     * GET  /roles/:id : get the "id" roles.
     *
     * @param id the id of the rolesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rolesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/roles/{id}")
    @Timed
    public ResponseEntity<RolesDTO> getRoles(@PathVariable Long id) {
        log.debug("REST request to get Roles : {}", id);
        RolesDTO rolesDTO = rolesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rolesDTO));
    }

    /**
     * DELETE  /roles/:id : delete the "id" roles.
     *
     * @param id the id of the rolesDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/roles/{id}")
    @Timed
    public ResponseEntity<Void> deleteRoles(@PathVariable Long id) {
        log.debug("REST request to delete Roles : {}", id);
        rolesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
