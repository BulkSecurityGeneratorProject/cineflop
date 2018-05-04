package org.jhipster.web.rest;

import org.jhipster.BlogApp;

import org.jhipster.domain.Ideas;
import org.jhipster.repository.IdeasRepository;
import org.jhipster.service.IdeasService;
import org.jhipster.service.dto.IdeasDTO;
import org.jhipster.service.mapper.IdeasMapper;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static org.jhipster.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.jhipster.domain.enumeration.Genders;
/**
 * Test class for the IdeasResource REST controller.
 *
 * @see IdeasResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlogApp.class)
public class IdeasResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_SYNOPSIS = "AAAAAAAAAA";
    private static final String UPDATED_SYNOPSIS = "BBBBBBBBBB";

    private static final String DEFAULT_CONTEXT = "AAAAAAAAAA";
    private static final String UPDATED_CONTEXT = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGEPATH = "AAAAAAAAAA";
    private static final String UPDATED_IMAGEPATH = "BBBBBBBBBB";

    private static final Genders DEFAULT_GENDER = Genders.COMEDY;
    private static final Genders UPDATED_GENDER = Genders.LOVE;

    @Autowired
    private IdeasRepository ideasRepository;

    @Autowired
    private IdeasMapper ideasMapper;

    @Autowired
    private IdeasService ideasService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIdeasMockMvc;

    private Ideas ideas;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IdeasResource ideasResource = new IdeasResource(ideasService);
        this.restIdeasMockMvc = MockMvcBuilders.standaloneSetup(ideasResource)
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
    public static Ideas createEntity(EntityManager em) {
        Ideas ideas = new Ideas()
            .title(DEFAULT_TITLE)
            .synopsis(DEFAULT_SYNOPSIS)
            .context(DEFAULT_CONTEXT)
            .imagepath(DEFAULT_IMAGEPATH)
            .gender(DEFAULT_GENDER);
        return ideas;
    }

    @Before
    public void initTest() {
        ideas = createEntity(em);
    }

    @Test
    @Transactional
    public void createIdeas() throws Exception {
        int databaseSizeBeforeCreate = ideasRepository.findAll().size();

        // Create the Ideas
        IdeasDTO ideasDTO = ideasMapper.toDto(ideas);
        restIdeasMockMvc.perform(post("/api/ideas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ideasDTO)))
            .andExpect(status().isCreated());

        // Validate the Ideas in the database
        List<Ideas> ideasList = ideasRepository.findAll();
        assertThat(ideasList).hasSize(databaseSizeBeforeCreate + 1);
        Ideas testIdeas = ideasList.get(ideasList.size() - 1);
        assertThat(testIdeas.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testIdeas.getSynopsis()).isEqualTo(DEFAULT_SYNOPSIS);
        assertThat(testIdeas.getContext()).isEqualTo(DEFAULT_CONTEXT);
        assertThat(testIdeas.getImagepath()).isEqualTo(DEFAULT_IMAGEPATH);
        assertThat(testIdeas.getGender()).isEqualTo(DEFAULT_GENDER);
    }

    @Test
    @Transactional
    public void createIdeasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ideasRepository.findAll().size();

        // Create the Ideas with an existing ID
        ideas.setId(1L);
        IdeasDTO ideasDTO = ideasMapper.toDto(ideas);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIdeasMockMvc.perform(post("/api/ideas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ideasDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Ideas in the database
        List<Ideas> ideasList = ideasRepository.findAll();
        assertThat(ideasList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIdeas() throws Exception {
        // Initialize the database
        ideasRepository.saveAndFlush(ideas);

        // Get all the ideasList
        restIdeasMockMvc.perform(get("/api/ideas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ideas.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].synopsis").value(hasItem(DEFAULT_SYNOPSIS.toString())))
            .andExpect(jsonPath("$.[*].context").value(hasItem(DEFAULT_CONTEXT.toString())))
            .andExpect(jsonPath("$.[*].imagepath").value(hasItem(DEFAULT_IMAGEPATH.toString())))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())));
    }

    @Test
    @Transactional
    public void getIdeas() throws Exception {
        // Initialize the database
        ideasRepository.saveAndFlush(ideas);

        // Get the ideas
        restIdeasMockMvc.perform(get("/api/ideas/{id}", ideas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ideas.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.synopsis").value(DEFAULT_SYNOPSIS.toString()))
            .andExpect(jsonPath("$.context").value(DEFAULT_CONTEXT.toString()))
            .andExpect(jsonPath("$.imagepath").value(DEFAULT_IMAGEPATH.toString()))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIdeas() throws Exception {
        // Get the ideas
        restIdeasMockMvc.perform(get("/api/ideas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIdeas() throws Exception {
        // Initialize the database
        ideasRepository.saveAndFlush(ideas);
        int databaseSizeBeforeUpdate = ideasRepository.findAll().size();

        // Update the ideas
        Ideas updatedIdeas = ideasRepository.findOne(ideas.getId());
        // Disconnect from session so that the updates on updatedIdeas are not directly saved in db
        em.detach(updatedIdeas);
        updatedIdeas
            .title(UPDATED_TITLE)
            .synopsis(UPDATED_SYNOPSIS)
            .context(UPDATED_CONTEXT)
            .imagepath(UPDATED_IMAGEPATH)
            .gender(UPDATED_GENDER);
        IdeasDTO ideasDTO = ideasMapper.toDto(updatedIdeas);

        restIdeasMockMvc.perform(put("/api/ideas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ideasDTO)))
            .andExpect(status().isOk());

        // Validate the Ideas in the database
        List<Ideas> ideasList = ideasRepository.findAll();
        assertThat(ideasList).hasSize(databaseSizeBeforeUpdate);
        Ideas testIdeas = ideasList.get(ideasList.size() - 1);
        assertThat(testIdeas.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testIdeas.getSynopsis()).isEqualTo(UPDATED_SYNOPSIS);
        assertThat(testIdeas.getContext()).isEqualTo(UPDATED_CONTEXT);
        assertThat(testIdeas.getImagepath()).isEqualTo(UPDATED_IMAGEPATH);
        assertThat(testIdeas.getGender()).isEqualTo(UPDATED_GENDER);
    }

    @Test
    @Transactional
    public void updateNonExistingIdeas() throws Exception {
        int databaseSizeBeforeUpdate = ideasRepository.findAll().size();

        // Create the Ideas
        IdeasDTO ideasDTO = ideasMapper.toDto(ideas);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIdeasMockMvc.perform(put("/api/ideas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ideasDTO)))
            .andExpect(status().isCreated());

        // Validate the Ideas in the database
        List<Ideas> ideasList = ideasRepository.findAll();
        assertThat(ideasList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIdeas() throws Exception {
        // Initialize the database
        ideasRepository.saveAndFlush(ideas);
        int databaseSizeBeforeDelete = ideasRepository.findAll().size();

        // Get the ideas
        restIdeasMockMvc.perform(delete("/api/ideas/{id}", ideas.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ideas> ideasList = ideasRepository.findAll();
        assertThat(ideasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ideas.class);
        Ideas ideas1 = new Ideas();
        ideas1.setId(1L);
        Ideas ideas2 = new Ideas();
        ideas2.setId(ideas1.getId());
        assertThat(ideas1).isEqualTo(ideas2);
        ideas2.setId(2L);
        assertThat(ideas1).isNotEqualTo(ideas2);
        ideas1.setId(null);
        assertThat(ideas1).isNotEqualTo(ideas2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(IdeasDTO.class);
        IdeasDTO ideasDTO1 = new IdeasDTO();
        ideasDTO1.setId(1L);
        IdeasDTO ideasDTO2 = new IdeasDTO();
        assertThat(ideasDTO1).isNotEqualTo(ideasDTO2);
        ideasDTO2.setId(ideasDTO1.getId());
        assertThat(ideasDTO1).isEqualTo(ideasDTO2);
        ideasDTO2.setId(2L);
        assertThat(ideasDTO1).isNotEqualTo(ideasDTO2);
        ideasDTO1.setId(null);
        assertThat(ideasDTO1).isNotEqualTo(ideasDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(ideasMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(ideasMapper.fromId(null)).isNull();
    }
}
