package org.jhipster.service.mapper;

import org.jhipster.domain.*;
import org.jhipster.service.dto.ScriptsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Scripts and its DTO ScriptsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ScriptsMapper extends EntityMapper<ScriptsDTO, Scripts> {


    @Mapping(target = "ideas", ignore = true)
    Scripts toEntity(ScriptsDTO scriptsDTO);

    default Scripts fromId(Long id) {
        if (id == null) {
            return null;
        }
        Scripts scripts = new Scripts();
        scripts.setId(id);
        return scripts;
    }
}
