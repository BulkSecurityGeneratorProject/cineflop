package org.jhipster.service.mapper;

import org.jhipster.domain.*;
import org.jhipster.service.dto.KeywordsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Keywords and its DTO KeywordsDTO.
 */
@Mapper(componentModel = "spring", uses = {IdeasMapper.class})
public interface KeywordsMapper extends EntityMapper<KeywordsDTO, Keywords> {

    @Mapping(source = "ideas.id", target = "ideasId")
    KeywordsDTO toDto(Keywords keywords);

    @Mapping(source = "ideasId", target = "ideas")
    Keywords toEntity(KeywordsDTO keywordsDTO);

    default Keywords fromId(Long id) {
        if (id == null) {
            return null;
        }
        Keywords keywords = new Keywords();
        keywords.setId(id);
        return keywords;
    }
}
