package org.jhipster.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Keywords entity.
 */
public class KeywordsDTO implements Serializable {

    private Long id;

    private String keyword;

    private Long ideasId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public Long getIdeasId() {
        return ideasId;
    }

    public void setIdeasId(Long ideasId) {
        this.ideasId = ideasId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        KeywordsDTO keywordsDTO = (KeywordsDTO) o;
        if(keywordsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), keywordsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "KeywordsDTO{" +
            "id=" + getId() +
            ", keyword='" + getKeyword() + "'" +
            "}";
    }
}
