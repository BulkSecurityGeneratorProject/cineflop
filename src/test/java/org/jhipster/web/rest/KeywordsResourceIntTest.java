package org.jhipster.web.rest;

import org.jhipster.BlogApp;

import org.jhipster.domain.Keywords;
import org.jhipster.repository.KeywordsRepository;
import org.jhipster.service.KeywordsService;
import org.jhipster.service.dto.KeywordsDTO;
import org.jhipster.service.mapper.KeywordsMapper;
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
 * Test class for the KeywordsResource REST controller.
 *
 * @see KeywordsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlogApp.class)
public class KeywordsResourceIntTest {

    private static final String DEFAULT_KEYWORD = "AAAAAAAAAA";
    private static final String UPDATED_KEYWORD = "BBBBBBBBBB";

    @Autowired
    private KeywordsRepository keywordsRepository;

    @Autowired
    private KeywordsMapper keywordsMapper;

    @Autowired
    private KeywordsService keywordsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restKeywordsMockMvc;

    private Keywords keywords;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KeywordsResource keywordsResource = new KeywordsResource(keywordsService);
        this.restKeywordsMockMvc = MockMvcBuilders.standaloneSetup(keywordsResource)
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
    public static Keywords createEntity(EntityManager em) {
        Keywords keywords = new Keywords()
            .keyword(DEFAULT_KEYWORD);
        return keywords;
    }

    @Before
    public void initTest() {
        keywords = createEntity(em);
    }

    @Test
    @Transactional
    public void createKeywords() throws Exception {
        int databaseSizeBeforeCreate = keywordsRepository.findAll().size();

        // Create the Keywords
        KeywordsDTO keywordsDTO = keywordsMapper.toDto(keywords);
        restKeywordsMockMvc.perform(post("/api/keywords")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keywordsDTO)))
            .andExpect(status().isCreated());

        // Validate the Keywords in the database
        List<Keywords> keywordsList = keywordsRepository.findAll();
        assertThat(keywordsList).hasSize(databaseSizeBeforeCreate + 1);
        Keywords testKeywords = keywordsList.get(keywordsList.size() - 1);
        assertThat(testKeywords.getKeyword()).isEqualTo(DEFAULT_KEYWORD);
    }

    @Test
    @Transactional
    public void createKeywordsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = keywordsRepository.findAll().size();

        // Create the Keywords with an existing ID
        keywords.setId(1L);
        KeywordsDTO keywordsDTO = keywordsMapper.toDto(keywords);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKeywordsMockMvc.perform(post("/api/keywords")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keywordsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Keywords in the database
        List<Keywords> keywordsList = keywordsRepository.findAll();
        assertThat(keywordsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllKeywords() throws Exception {
        // Initialize the database
        keywordsRepository.saveAndFlush(keywords);

        // Get all the keywordsList
        restKeywordsMockMvc.perform(get("/api/keywords?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(keywords.getId().intValue())))
            .andExpect(jsonPath("$.[*].keyword").value(hasItem(DEFAULT_KEYWORD.toString())));
    }

    @Test
    @Transactional
    public void getKeywords() throws Exception {
        // Initialize the database
        keywordsRepository.saveAndFlush(keywords);

        // Get the keywords
        restKeywordsMockMvc.perform(get("/api/keywords/{id}", keywords.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(keywords.getId().intValue()))
            .andExpect(jsonPath("$.keyword").value(DEFAULT_KEYWORD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingKeywords() throws Exception {
        // Get the keywords
        restKeywordsMockMvc.perform(get("/api/keywords/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKeywords() throws Exception {
        // Initialize the database
        keywordsRepository.saveAndFlush(keywords);
        int databaseSizeBeforeUpdate = keywordsRepository.findAll().size();

        // Update the keywords
        Keywords updatedKeywords = keywordsRepository.findOne(keywords.getId());
        // Disconnect from session so that the updates on updatedKeywords are not directly saved in db
        em.detach(updatedKeywords);
        updatedKeywords
            .keyword(UPDATED_KEYWORD);
        KeywordsDTO keywordsDTO = keywordsMapper.toDto(updatedKeywords);

        restKeywordsMockMvc.perform(put("/api/keywords")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keywordsDTO)))
            .andExpect(status().isOk());

        // Validate the Keywords in the database
        List<Keywords> keywordsList = keywordsRepository.findAll();
        assertThat(keywordsList).hasSize(databaseSizeBeforeUpdate);
        Keywords testKeywords = keywordsList.get(keywordsList.size() - 1);
        assertThat(testKeywords.getKeyword()).isEqualTo(UPDATED_KEYWORD);
    }

    @Test
    @Transactional
    public void updateNonExistingKeywords() throws Exception {
        int databaseSizeBeforeUpdate = keywordsRepository.findAll().size();

        // Create the Keywords
        KeywordsDTO keywordsDTO = keywordsMapper.toDto(keywords);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restKeywordsMockMvc.perform(put("/api/keywords")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keywordsDTO)))
            .andExpect(status().isCreated());

        // Validate the Keywords in the database
        List<Keywords> keywordsList = keywordsRepository.findAll();
        assertThat(keywordsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteKeywords() throws Exception {
        // Initialize the database
        keywordsRepository.saveAndFlush(keywords);
        int databaseSizeBeforeDelete = keywordsRepository.findAll().size();

        // Get the keywords
        restKeywordsMockMvc.perform(delete("/api/keywords/{id}", keywords.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Keywords> keywordsList = keywordsRepository.findAll();
        assertThat(keywordsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Keywords.class);
        Keywords keywords1 = new Keywords();
        keywords1.setId(1L);
        Keywords keywords2 = new Keywords();
        keywords2.setId(keywords1.getId());
        assertThat(keywords1).isEqualTo(keywords2);
        keywords2.setId(2L);
        assertThat(keywords1).isNotEqualTo(keywords2);
        keywords1.setId(null);
        assertThat(keywords1).isNotEqualTo(keywords2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(KeywordsDTO.class);
        KeywordsDTO keywordsDTO1 = new KeywordsDTO();
        keywordsDTO1.setId(1L);
        KeywordsDTO keywordsDTO2 = new KeywordsDTO();
        assertThat(keywordsDTO1).isNotEqualTo(keywordsDTO2);
        keywordsDTO2.setId(keywordsDTO1.getId());
        assertThat(keywordsDTO1).isEqualTo(keywordsDTO2);
        keywordsDTO2.setId(2L);
        assertThat(keywordsDTO1).isNotEqualTo(keywordsDTO2);
        keywordsDTO1.setId(null);
        assertThat(keywordsDTO1).isNotEqualTo(keywordsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(keywordsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(keywordsMapper.fromId(null)).isNull();
    }
}
