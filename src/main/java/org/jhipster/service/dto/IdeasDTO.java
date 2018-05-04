package org.jhipster.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import org.jhipster.domain.enumeration.Genders;

/**
 * A DTO for the Ideas entity.
 */
public class IdeasDTO implements Serializable {

    private Long id;

    private String title;

    private String synopsis;

    private String context;
    private String imagepath;

    private Genders gender;

    private Long scriptsId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public String getImagepath() {
        return imagepath;
    }

    public void setImagepath(String imagepath) {
        this.imagepath = imagepath;
    }

    public Genders getGender() {
        return gender;
    }

    public void setGender(Genders gender) {
        this.gender = gender;
    }

    public Long getScriptsId() {
        return scriptsId;
    }

    public void setScriptsId(Long scriptsId) {
        this.scriptsId = scriptsId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        IdeasDTO ideasDTO = (IdeasDTO) o;
        if(ideasDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ideasDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IdeasDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", synopsis='" + getSynopsis() + "'" +
            ", context='" + getContext() + "'" +
            ", imagepath='" + getImagepath() + "'" +
            ", gender='" + getGender() + "'" +
            "}";
    }
}
