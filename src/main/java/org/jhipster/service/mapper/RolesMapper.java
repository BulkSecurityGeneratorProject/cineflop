package org.jhipster.service.mapper;

import org.jhipster.domain.*;
import org.jhipster.service.dto.RolesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Roles and its DTO RolesDTO.
 */
@Mapper(componentModel = "spring", uses = {IdeasMapper.class})
public interface RolesMapper extends EntityMapper<RolesDTO, Roles> {

    @Mapping(source = "ideas.id", target = "ideasId")
    RolesDTO toDto(Roles roles);

    @Mapping(source = "ideasId", target = "ideas")
    Roles toEntity(RolesDTO rolesDTO);

    default Roles fromId(Long id) {
        if (id == null) {
            return null;
        }
        Roles roles = new Roles();
        roles.setId(id);
        return roles;
    }
}
