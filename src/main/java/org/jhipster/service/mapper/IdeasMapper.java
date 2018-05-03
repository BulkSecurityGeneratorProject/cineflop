package org.jhipster.service.mapper;

import org.jhipster.domain.*;
import org.jhipster.service.dto.IdeasDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Ideas and its DTO IdeasDTO.
 */
@Mapper(componentModel = "spring", uses = {ScriptsMapper.class})
public interface IdeasMapper extends EntityMapper<IdeasDTO, Ideas> {

    @Mapping(source = "scripts.id", target = "scriptsId")
    IdeasDTO toDto(Ideas ideas);

    @Mapping(target = "keywords", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(source = "scriptsId", target = "scripts")
    Ideas toEntity(IdeasDTO ideasDTO);

    default Ideas fromId(Long id) {
        if (id == null) {
            return null;
        }
        Ideas ideas = new Ideas();
        ideas.setId(id);
        return ideas;
    }
}
