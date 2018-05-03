package org.jhipster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Scripts.
 */
@Entity
@Table(name = "scripts")
public class Scripts implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @OneToMany(mappedBy = "scripts")
    @JsonIgnore
    private Set<Ideas> ideas = new HashSet<>();

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

    public Scripts title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<Ideas> getIdeas() {
        return ideas;
    }

    public Scripts ideas(Set<Ideas> ideas) {
        this.ideas = ideas;
        return this;
    }

    public Scripts addIdeas(Ideas ideas) {
        this.ideas.add(ideas);
        ideas.setScripts(this);
        return this;
    }

    public Scripts removeIdeas(Ideas ideas) {
        this.ideas.remove(ideas);
        ideas.setScripts(null);
        return this;
    }

    public void setIdeas(Set<Ideas> ideas) {
        this.ideas = ideas;
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
        Scripts scripts = (Scripts) o;
        if (scripts.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), scripts.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Scripts{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
