package org.jhipster.web.rest;

import org.jhipster.BlogApp;

import org.jhipster.domain.Characters;
import org.jhipster.repository.CharactersRepository;
import org.jhipster.service.CharactersService;
import org.jhipster.service.dto.CharactersDTO;
import org.jhipster.service.mapper.CharactersMapper;
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
 * Test class for the CharactersResource REST controller.
 *
 * @see CharactersResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlogApp.class)
public class CharactersResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private CharactersRepository charactersRepository;

    @Autowired
    private CharactersMapper charactersMapper;

    @Autowired
    private CharactersService charactersService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCharactersMockMvc;

    private Characters characters;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CharactersResource charactersResource = new CharactersResource(charactersService);
        this.restCharactersMockMvc = MockMvcBuilders.standaloneSetup(charactersResource)
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
    public static Characters createEntity(EntityManager em) {
        Characters characters = new Characters()
            .name(DEFAULT_NAME);
        return characters;
    }

    @Before
    public void initTest() {
        characters = createEntity(em);
    }

    @Test
    @Transactional
    public void createCharacters() throws Exception {
        int databaseSizeBeforeCreate = charactersRepository.findAll().size();

        // Create the Characters
        CharactersDTO charactersDTO = charactersMapper.toDto(characters);
        restCharactersMockMvc.perform(post("/api/characters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(charactersDTO)))
            .andExpect(status().isCreated());

        // Validate the Characters in the database
        List<Characters> charactersList = charactersRepository.findAll();
        assertThat(charactersList).hasSize(databaseSizeBeforeCreate + 1);
        Characters testCharacters = charactersList.get(charactersList.size() - 1);
        assertThat(testCharacters.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createCharactersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = charactersRepository.findAll().size();

        // Create the Characters with an existing ID
        characters.setId(1L);
        CharactersDTO charactersDTO = charactersMapper.toDto(characters);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCharactersMockMvc.perform(post("/api/characters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(charactersDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Characters in the database
        List<Characters> charactersList = charactersRepository.findAll();
        assertThat(charactersList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCharacters() throws Exception {
        // Initialize the database
        charactersRepository.saveAndFlush(characters);

        // Get all the charactersList
        restCharactersMockMvc.perform(get("/api/characters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(characters.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getCharacters() throws Exception {
        // Initialize the database
        charactersRepository.saveAndFlush(characters);

        // Get the characters
        restCharactersMockMvc.perform(get("/api/characters/{id}", characters.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(characters.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCharacters() throws Exception {
        // Get the characters
        restCharactersMockMvc.perform(get("/api/characters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCharacters() throws Exception {
        // Initialize the database
        charactersRepository.saveAndFlush(characters);
        int databaseSizeBeforeUpdate = charactersRepository.findAll().size();

        // Update the characters
        Characters updatedCharacters = charactersRepository.findOne(characters.getId());
        // Disconnect from session so that the updates on updatedCharacters are not directly saved in db
        em.detach(updatedCharacters);
        updatedCharacters
            .name(UPDATED_NAME);
        CharactersDTO charactersDTO = charactersMapper.toDto(updatedCharacters);

        restCharactersMockMvc.perform(put("/api/characters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(charactersDTO)))
            .andExpect(status().isOk());

        // Validate the Characters in the database
        List<Characters> charactersList = charactersRepository.findAll();
        assertThat(charactersList).hasSize(databaseSizeBeforeUpdate);
        Characters testCharacters = charactersList.get(charactersList.size() - 1);
        assertThat(testCharacters.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCharacters() throws Exception {
        int databaseSizeBeforeUpdate = charactersRepository.findAll().size();

        // Create the Characters
        CharactersDTO charactersDTO = charactersMapper.toDto(characters);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCharactersMockMvc.perform(put("/api/characters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(charactersDTO)))
            .andExpect(status().isCreated());

        // Validate the Characters in the database
        List<Characters> charactersList = charactersRepository.findAll();
        assertThat(charactersList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCharacters() throws Exception {
        // Initialize the database
        charactersRepository.saveAndFlush(characters);
        int databaseSizeBeforeDelete = charactersRepository.findAll().size();

        // Get the characters
        restCharactersMockMvc.perform(delete("/api/characters/{id}", characters.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Characters> charactersList = charactersRepository.findAll();
        assertThat(charactersList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Characters.class);
        Characters characters1 = new Characters();
        characters1.setId(1L);
        Characters characters2 = new Characters();
        characters2.setId(characters1.getId());
        assertThat(characters1).isEqualTo(characters2);
        characters2.setId(2L);
        assertThat(characters1).isNotEqualTo(characters2);
        characters1.setId(null);
        assertThat(characters1).isNotEqualTo(characters2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CharactersDTO.class);
        CharactersDTO charactersDTO1 = new CharactersDTO();
        charactersDTO1.setId(1L);
        CharactersDTO charactersDTO2 = new CharactersDTO();
        assertThat(charactersDTO1).isNotEqualTo(charactersDTO2);
        charactersDTO2.setId(charactersDTO1.getId());
        assertThat(charactersDTO1).isEqualTo(charactersDTO2);
        charactersDTO2.setId(2L);
        assertThat(charactersDTO1).isNotEqualTo(charactersDTO2);
        charactersDTO1.setId(null);
        assertThat(charactersDTO1).isNotEqualTo(charactersDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(charactersMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(charactersMapper.fromId(null)).isNull();
    }
}
