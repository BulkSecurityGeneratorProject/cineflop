package org.jhipster.web.rest;

import org.jhipster.BlogApp;

import org.jhipster.domain.Scripts;
import org.jhipster.repository.ScriptsRepository;
import org.jhipster.service.ScriptsService;
import org.jhipster.service.dto.ScriptsDTO;
import org.jhipster.service.mapper.ScriptsMapper;
import org.jhipster.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.jhipster.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ScriptsResource REST controller.
 *
 * @see ScriptsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlogApp.class)
public class ScriptsResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    @Autowired
    private ScriptsRepository scriptsRepository;

    @Autowired
    private ScriptsMapper scriptsMapper;

    @Autowired
    private ScriptsService scriptsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restScriptsMockMvc;

    private Scripts scripts;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ScriptsResource scriptsResource = new ScriptsResource(scriptsService);
        this.restScriptsMockMvc = MockMvcBuilders.standaloneSetup(scriptsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Scripts createEntity(EntityManager em) {
        Scripts scripts = new Scripts()
            .title(DEFAULT_TITLE);
        return scripts;
    }

    @Before
    public void initTest() {
        scripts = createEntity(em);
    }

    @Test
    @Transactional
    public void createScripts() throws Exception {
        int databaseSizeBeforeCreate = scriptsRepository.findAll().size();

        // Create the Scripts
        ScriptsDTO scriptsDTO = scriptsMapper.toDto(scripts);
        restScriptsMockMvc.perform(post("/api/scripts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scriptsDTO)))
            .andExpect(status().isCreated());

        // Validate the Scripts in the database
        List<Scripts> scriptsList = scriptsRepository.findAll();
        assertThat(scriptsList).hasSize(databaseSizeBeforeCreate + 1);
        Scripts testScripts = scriptsList.get(scriptsList.size() - 1);
        assertThat(testScripts.getTitle()).isEqualTo(DEFAULT_TITLE);
    }

    @Test
    @Transactional
    public void createScriptsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = scriptsRepository.findAll().size();

        // Create the Scripts with an existing ID
        scripts.setId(1L);
        ScriptsDTO scriptsDTO = scriptsMapper.toDto(scripts);

        // An entity with an existing ID cannot be created, so this API call must fail
        restScriptsMockMvc.perform(post("/api/scripts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scriptsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Scripts in the database
        List<Scripts> scriptsList = scriptsRepository.findAll();
        assertThat(scriptsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllScripts() throws Exception {
        // Initialize the database
        scriptsRepository.saveAndFlush(scripts);

        // Get all the scriptsList
        restScriptsMockMvc.perform(get("/api/scripts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(scripts.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())));
    }

    @Test
    @Transactional
    public void getScripts() throws Exception {
        // Initialize the database
        scriptsRepository.saveAndFlush(scripts);

        // Get the scripts
        restScriptsMockMvc.perform(get("/api/scripts/{id}", scripts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(scripts.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingScripts() throws Exception {
        // Get the scripts
        restScriptsMockMvc.perform(get("/api/scripts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateScripts() throws Exception {
        // Initialize the database
        scriptsRepository.saveAndFlush(scripts);
        int databaseSizeBeforeUpdate = scriptsRepository.findAll().size();

        // Update the scripts
        Scripts updatedScripts = scriptsRepository.findOne(scripts.getId());
        // Disconnect from session so that the updates on updatedScripts are not directly saved in db
        em.detach(updatedScripts);
        updatedScripts
            .title(UPDATED_TITLE);
        ScriptsDTO scriptsDTO = scriptsMapper.toDto(updatedScripts);

        restScriptsMockMvc.perform(put("/api/scripts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scriptsDTO)))
            .andExpect(status().isOk());

        // Validate the Scripts in the database
        List<Scripts> scriptsList = scriptsRepository.findAll();
        assertThat(scriptsList).hasSize(databaseSizeBeforeUpdate);
        Scripts testScripts = scriptsList.get(scriptsList.size() - 1);
        assertThat(testScripts.getTitle()).isEqualTo(UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void updateNonExistingScripts() throws Exception {
        int databaseSizeBeforeUpdate = scriptsRepository.findAll().size();

        // Create the Scripts
        ScriptsDTO scriptsDTO = scriptsMapper.toDto(scripts);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restScriptsMockMvc.perform(put("/api/scripts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scriptsDTO)))
            .andExpect(status().isCreated());

        // Validate the Scripts in the database
        List<Scripts> scriptsList = scriptsRepository.findAll();
        assertThat(scriptsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteScripts() throws Exception {
        // Initialize the database
        scriptsRepository.saveAndFlush(scripts);
        int databaseSizeBeforeDelete = scriptsRepository.findAll().size();

        // Get the scripts
        restScriptsMockMvc.perform(delete("/api/scripts/{id}", scripts.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Scripts> scriptsList = scriptsRepository.findAll();
        assertThat(scriptsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Scripts.class);
        Scripts scripts1 = new Scripts();
        scripts1.setId(1L);
        Scripts scripts2 = new Scripts();
        scripts2.setId(scripts1.getId());
        assertThat(scripts1).isEqualTo(scripts2);
        scripts2.setId(2L);
        assertThat(scripts1).isNotEqualTo(scripts2);
        scripts1.setId(null);
        assertThat(scripts1).isNotEqualTo(scripts2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ScriptsDTO.class);
        ScriptsDTO scriptsDTO1 = new ScriptsDTO();
        scriptsDTO1.setId(1L);
        ScriptsDTO scriptsDTO2 = new ScriptsDTO();
        assertThat(scriptsDTO1).isNotEqualTo(scriptsDTO2);
        scriptsDTO2.setId(scriptsDTO1.getId());
        assertThat(scriptsDTO1).isEqualTo(scriptsDTO2);
        scriptsDTO2.setId(2L);
        assertThat(scriptsDTO1).isNotEqualTo(scriptsDTO2);
        scriptsDTO1.setId(null);
        assertThat(scriptsDTO1).isNotEqualTo(scriptsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(scriptsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(scriptsMapper.fromId(null)).isNull();
    }
}
