package org.jhipster.service.mapper;

import org.jhipster.domain.*;
import org.jhipster.service.dto.CharactersDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Characters and its DTO CharactersDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CharactersMapper extends EntityMapper<CharactersDTO, Characters> {



    default Characters fromId(Long id) {
        if (id == null) {
            return null;
        }
        Characters characters = new Characters();
        characters.setId(id);
        return characters;
    }
}
