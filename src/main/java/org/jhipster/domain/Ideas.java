package org.jhipster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import org.jhipster.domain.enumeration.Genders;

/**
 * A Ideas.
 */
@Entity
@Table(name = "ideas")
public class Ideas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "synopsis")
    private String synopsis;

    @Column(name = "context")
    private String context;

    @Column(name = "imagepath")
    private String imagepath;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Genders gender;

    @OneToMany(mappedBy = "ideas")
    @JsonIgnore
    private Set<Keywords> keywords = new HashSet<>();

    @OneToMany(mappedBy = "ideas")
    @JsonIgnore
    private Set<Roles> roles = new HashSet<>();

    @ManyToOne
    private Scripts scripts;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Ideas title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public Ideas synopsis(String synopsis) {
        this.synopsis = synopsis;
        return this;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public String getContext() {
        return context;
    }

    public Ideas context(String context) {
        this.context = context;
        return this;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public String getImagepath() {
        return imagepath;
    }

    public Ideas imagepath(String imagepath) {
        this.imagepath = imagepath;
        return this;
    }

    public void setImagepath(String imagepath) {
        this.imagepath = imagepath;
    }

    public Genders getGender() {
        return gender;
    }

    public Ideas gender(Genders gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Genders gender) {
        this.gender = gender;
    }

    public Set<Keywords> getKeywords() {
        return keywords;
    }

    public Ideas keywords(Set<Keywords> keywords) {
        this.keywords = keywords;
        return this;
    }

    public Ideas addKeywords(Keywords keywords) {
        this.keywords.add(keywords);
        keywords.setIdeas(this);
        return this;
    }

    public Ideas removeKeywords(Keywords keywords) {
        this.keywords.remove(keywords);
        keywords.setIdeas(null);
        return this;
    }

    public void setKeywords(Set<Keywords> keywords) {
        this.keywords = keywords;
    }

    public Set<Roles> getRoles() {
        return roles;
    }

    public Ideas roles(Set<Roles> roles) {
        this.roles = roles;
        return this;
    }

    public Ideas addRoles(Roles roles) {
        this.roles.add(roles);
        roles.setIdeas(this);
        return this;
    }

    public Ideas removeRoles(Roles roles) {
        this.roles.remove(roles);
        roles.setIdeas(null);
        return this;
    }

    public void setRoles(Set<Roles> roles) {
        this.roles = roles;
    }

    public Scripts getScripts() {
        return scripts;
    }

    public Ideas scripts(Scripts scripts) {
        this.scripts = scripts;
        return this;
    }

    public void setScripts(Scripts scripts) {
        this.scripts = scripts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Ideas ideas = (Ideas) o;
        if (ideas.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ideas.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ideas{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", synopsis='" + getSynopsis() + "'" +
            ", context='" + getContext() + "'" +
            ", imagepath='" + getImagepath() + "'" +
            ", gender='" + getGender() + "'" +
            "}";
    }
}
